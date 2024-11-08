// do this first
import 'newrelic'
// then dotenv
import 'dotenv-flow/config'
//
import Node from '#entity/node'
import path from 'path'
import { fileURLToPath } from 'url'
import express, { NextFunction, Request, Response } from 'express'
import expressStaticGzip from 'express-static-gzip'
import responseTime from 'response-time'
import 'express-async-errors'
import { AppDataSource } from '#config/data-source'
import { errLog } from '#helpers/logger'
import passport from 'passport'
import { User } from '#entity/user'
import { configurePassportPaths, googleOneTapStrategy, googleStrategy, magicLoginStrategy } from '#web/passport'
import { nodeRouter } from '#web/routes/nodes'
import { getCommitHash, HttpError, isDevelopment, isProduction, sessionManagementMiddleware, setupCSRFMiddleware } from '#web/helpers'
import flash from 'connect-flash'
import { usersRouter } from '#web/routes/users'
import { identityDocumentsRouter } from '#web/routes/identity-documents'
import { certificationDocumentsRouter } from '#web/routes/certification-documents'
import { insuranceDocumentsRouter } from '#web/routes/insurance-documents'
import { deviceConfigRouter } from '#web/routes/device-config'
import { statsRouter } from '#web/routes/stats'
import { positionsRouter } from '#web/routes/positions'

const db = AppDataSource

export const app = express()
app.use(responseTime())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(flash())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (isDevelopment) {
  app.use((await import('morgan')).default('dev'))
  app.use((await import('compression')).default())
}

if (isProduction) {
  app.set('trust proxy', 1) // trust first proxy
}

app.use((_req, res, next) => {
  if (!res.headersSent) {
    res.setHeader('X-App-Version', getCommitHash())
  }
  next()
})
app.use(sessionManagementMiddleware(db))

export const doubleCsrfUtilities = setupCSRFMiddleware(app)

app.get('/api/csrf-token', (req, res) => {
  res.clearCookie('x-csrf-token')
  return res.json({
    token: doubleCsrfUtilities.generateToken(req, res),
  })
})

app.use(['/api/*'], (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method.toUpperCase())) {
    return doubleCsrfUtilities.doubleCsrfProtection(req, res, next)
  }
  next()
})

passport.use(googleStrategy())
passport.use(googleOneTapStrategy())
passport.use(magicLoginStrategy())

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id)
})

passport.deserializeUser<number>(async (id, done) => {
  try {
    const user = await db.getRepository(User).findOne({
      where: { id },
    })
    done(null, user)
  } catch (err) {
    done(err)
  }
})

app.use(passport.initialize())
app.use(passport.session())
configurePassportPaths(app, doubleCsrfUtilities)

app.use('/api', nodeRouter)

app.get('/api/hardware-models', async function (_req, res) {
  const hardwareModels = await Node.hardwareModels(db)

  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }
  res.json(hardwareModels)
})

app.route('/api/health-check').all(async (_req, res) => {
  try {
    await db.query('SELECT 1+1')
    res.status(200).json({ status: 'ok' })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
})

app.use('/api/stats', statsRouter)
app.use('/api', usersRouter)
app.use('/api', identityDocumentsRouter)
app.use('/api', insuranceDocumentsRouter)
app.use('/api', certificationDocumentsRouter)
app.use('/api', deviceConfigRouter)
app.use('/api', positionsRouter)

if (isProduction) {
  app.use(
    expressStaticGzip(`${__dirname}/../public`, {
      serveStatic: {
        etag: true,
        setHeaders: (res, path) => {
          if (path.includes(`/assets/`)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000')
          } else if (path.endsWith(`/index.html`)) {
            res.setHeader('Cache-Control', 'public, max-age=60')
          }
        },
      },
    })
  )
  app.get('*', async (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
  })
}

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  errLog('HTTP error', {
    err,
    url: req.url,
    method: req.method,
    body: req.body,
    headers: req.headers,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
  })
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: err.message,
    })
  }

  if (err === doubleCsrfUtilities.invalidCsrfTokenError) {
    return res.status(403).json({
      error: 'CSRF validation error!',
    })
  }

  return res.status(500).send('Internal server error')
})
