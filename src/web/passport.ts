import MagicLoginStrategy from 'passport-magic-login'
import { mandatoryEnv } from '#helpers/utils'
import { User } from '#entity/user'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { AppDataSource } from '#config/data-source'
import passport from 'passport'
import { Duration } from 'luxon'
import { DoubleCsrfUtilities } from 'csrf-csrf'
import { Express } from 'express'
import { GoogleOneTapStrategy } from 'passport-google-one-tap'
import _ from 'lodash'
import { mailTransport } from './mailer.js'

const db = AppDataSource

let _magicLoginStrategy: MagicLoginStrategy.default

export function magicLoginStrategy() {
  if (!_magicLoginStrategy) {
    const linkExpiry = Duration.fromObject({ minute: 10 })
    _magicLoginStrategy = new MagicLoginStrategy.default({
      jwtOptions: {
        expiresIn: linkExpiry.toMillis(),
      },
      secret: mandatoryEnv('PASSPORT_MAGIC_LINK_SECRET'),
      callbackUrl: '/auth/magic-link/callback',
      sendMagicLink: async (destination, href, _code, _req) => {
        const mailOptions = {
          to: destination,
          from: mandatoryEnv('SMTP_SENDER_FROM'),
          subject: 'Your Magic Link',
          text: `Click on the following link to log in: ${mandatoryEnv('SITE_BASE_URL')}${href}. This link will expire in ${linkExpiry.rescale().toHuman()}.`,
        }
        await mailTransport.sendMail(mailOptions)
      },
      verify: async (payload, done) => {
        try {
          let user = await db.getRepository(User).findOne({ where: { email: payload.destination } })
          if (!user) {
            user = new User()
            user.email = payload.destination
            await db.getRepository(User).save(user)
          }
          done(null, user)
        } catch (err) {
          done(err)
        }
      },
    })
  }
  return _magicLoginStrategy
}

export function googleOneTapStrategy() {
  return new GoogleOneTapStrategy(
    {
      clientID: mandatoryEnv('GOOGLE_CLIENT_ID'), // your google client ID
      clientSecret: mandatoryEnv('GOOGLE_CLIENT_SECRET'), // your google client secret
      verifyCsrfToken: false,
    },
    async function (profile, done) {
      const email = profile.emails?.find((email) => email.value)?.value

      if (!email) {
        return done(`Could not find an email for profile ${profile}`)
      }

      const displayName =
        profile.displayName || _.compact([profile.name?.givenName, profile.name?.middleName, profile.name?.familyName]).join(' ')
      const profilePhotoUrl = profile.photos?.find((photo) => photo.value)?.value
      const user = await findOrCreateUser(email, displayName, profilePhotoUrl)

      done(null, user)
    }
  )
}

async function findOrCreateUser(email: string, displayName: string, profilePhotoUrl: undefined | string) {
  let user = await db.getRepository(User).findOne({ where: { email } })
  if (!user) {
    user = new User()
    user.displayName = displayName
    user.email = email

    if (profilePhotoUrl) {
      user.profilePhotoUrl = profilePhotoUrl
    }

    await db.getRepository(User).save(user)
  }
  return user
}

export function googleStrategy() {
  return new GoogleStrategy(
    {
      clientID: mandatoryEnv('GOOGLE_CLIENT_ID'),
      clientSecret: mandatoryEnv('GOOGLE_CLIENT_SECRET'),
      callbackURL: '/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.find((email) => email.verified)?.value

        if (!email) {
          return done(`Could not find an email for profile ${profile}`)
        }
        const displayName = profile.displayName
        const profilePhotoUrl = profile.photos && profile.photos[0].value

        const user = await findOrCreateUser(email, displayName, profilePhotoUrl)
        done(null, user)
      } catch (err) {
        done(err)
      }
    }
  )
}

export function configurePassportPaths(app: Express, doubleCsrfUtilities: DoubleCsrfUtilities) {
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (_req, res) => {
    res.redirect('/')
  })

  app.post('/auth/magic-link', doubleCsrfUtilities.doubleCsrfProtection, magicLoginStrategy().send)
  app.get('/auth/magic-link/callback', passport.authenticate('magiclogin', { failureRedirect: '/' }), (_req, res) => {
    res.redirect('/')
  })

  app.post('/auth/one-tap/callback', doubleCsrfUtilities.doubleCsrfProtection, (req, res, next) => {
    const authenticate = passport.authenticate('google-one-tap', (err: unknown, user: User, info: unknown, _status: unknown) => {
      if (err) {
        return res.status(500).json({ message: 'Authentication failed!', error: err })
      }
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed!', error: info })
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Login failed', error: err })
        }
        return res.status(200).json({
          message: 'Authentication successful!',
          user: user,
        })
      })
    })

    authenticate(req, res, next)
  })

  app.get('/auth/logout', (req, res, next) => {
    req.logout((err: unknown) => {
      if (err) {
        return next(err)
      }

      Object.keys(req.cookies).forEach((cookie) => {
        res.clearCookie(cookie)
      })

      res.redirect('/')
    })
  })
}
