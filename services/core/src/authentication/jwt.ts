import * as jwt from 'jsonwebtoken'
import { LOCAL, AUTH_JWT_SECRET } from '../constants'

export function generateJargonToken(user: {
  id: string
  email: string
}): string {
  const payload = {
    userId: user.id,
    email: user.email,
  }

  const signingOptions = {
    issuer: AUTH_JWT_SECRET,
    subject: user.email,
    algorithm: LOCAL ? `HS256` : `RS256`,
  }

  return jwt.sign(payload, AUTH_JWT_SECRET, signingOptions)
}
