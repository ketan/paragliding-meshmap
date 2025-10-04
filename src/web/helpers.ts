import { Express, Request } from 'express'
import { DateTime, Duration } from 'luxon'
import session from 'express-session'
import { mandatoryEnv } from '#helpers/utils'
import { TypeormStore } from 'connect-typeorm'
import { Session } from '#entity/session'
import { doubleCsrf } from 'csrf-csrf'
import cookieParser from 'cookie-parser'
import { DataSource } from 'typeorm'
import { execSync } from 'node:child_process'
import formidable from 'formidable'

export const environment = process.env.NODE_ENV || 'development'
export const isDevelopment = environment === 'development'
export const isTest = environment === 'test'
export const isProduction = environment === 'production'

export function parseSinceParam(req: Request, defaultValue: string = `P30D`) {
  const since = typeof req.query.since === 'string' ? req.query.since : defaultValue
  return DateTime.now().minus(Duration.fromISO(since)).toJSDate()
}

export function parseDurationParam(req: Request, defaultValue: string = `PT0S`) {
  const duration = typeof req.query.duration === 'string' ? req.query.duration : defaultValue
  return Duration.fromISO(duration)
}

export class HttpError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export function parseNodeIdParam(req: Request) {
  const nodeIdParam = req.params.nodeId

  const nodeId = Number(nodeIdParam)
  if (!isNaN(nodeId)) {
    return nodeId
  }

  throw new HttpError(400, `Invalid node ID ${nodeIdParam}`)
}

export const sessionCookieName = 'connect.sid'

export function sessionManagementMiddleware(db: DataSource) {
  return session({
    secret: mandatoryEnv('SESSION_SECRET'),
    name: sessionCookieName,
    saveUninitialized: true,
    resave: false,
    store: new TypeormStore({
      cleanupLimit: 2,
      limitSubquery: false,
      ttl: Duration.fromObject({ day: 1 }).as('seconds'),
    }).connect(db.getRepository(Session)),
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: true,
      maxAge: Duration.fromObject({ days: 7 }).toMillis(),
    },
  })
}

export function setupCSRFMiddleware(app: Express) {
  const doubleCsrfUtilities = doubleCsrf({
    getSecret: () => mandatoryEnv('CSRF_SECRET'),
    getSessionIdentifier: (req) => req.session.id,
    cookieName: 'x-csrf-token',
    cookieOptions: {
      sameSite: true,
      secure: isProduction,
    },
    errorConfig: {
      statusCode: 403,
    },
    size: 64,
  })
  app.use(cookieParser(mandatoryEnv('COOKIE_SECRET'))) // after express-session
  return doubleCsrfUtilities
}

let cachedCommitHash: string | null = null

function getSHA() {
  if (!getSHA.cache || Date.now() - getSHA.cacheTime > 5000) {
    getSHA.cache = execSync('git rev-parse --short HEAD').toString().trim()
    getSHA.cacheTime = Date.now()
  }
  return getSHA.cache
}
getSHA.cache = null as string | null
getSHA.cacheTime = 0

export function getCommitHash() {
  if (isProduction && cachedCommitHash) {
    return cachedCommitHash
  }

  const commitHash = process.env.GIT_SHA || getSHA()

  if (isProduction) {
    cachedCommitHash = commitHash
  }

  return commitHash
}

export function copyFormDataInto<T>(formData: formidable.Fields, filteredAttributes: (keyof T)[], doc: T) {
  Object.keys(formData).forEach((key) => {
    if (filteredAttributes.includes(key as keyof T)) {
      return
    }
    const fieldValues = formData[key]
    if (fieldValues && fieldValues.length !== 0) {
      // @ts-expect-error intentionally left this way
      doc[key] = fieldValues[0]
    }
  })
}
