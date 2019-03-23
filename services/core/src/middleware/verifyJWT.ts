import * as jwt from 'jsonwebtoken'
import { AUTH_JWT_SECRET, MOCK } from '../constants'
import logger from '../logger'

export function verifyJWTMiddleware(req, _res, next) {
  if (
    MOCK ||
    !(
      req.headers.authorization &&
      req.headers.authorization.startsWith(`Bearer `)
    )
  ) {
    return next()
  }

  try {
    const token = req.headers.authorization.split(`Bearer `)[1]

    if (!token) {
      logger.WARN(
        `An empty authorization header was found. Skipping verification`
      )
      return next()
    }

    req.auth = jwt.verify(token, AUTH_JWT_SECRET)
  } catch (e) {
    logger.ERROR(e.message)
  }

  return next()
}
