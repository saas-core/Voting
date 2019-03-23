export const REDIS_URL = process.env.REDIS_URL || `redis://localhost`

export const AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET || `todo`
export const AUTH_JWT_PUBLIC_KEY = process.env.AUTH_JWT_PUBLIC_KEY || `todo`

export const LOCAL = process.env.LOCAL || false

export const MOCK = process.env.MOCK

export const CALLBACK_REDIRECT_BASE_URL = 'http://localhost:4001'

export const redirectUri = `${CALLBACK_REDIRECT_BASE_URL}/oauth/slack_callback`

export const SLACK_OAUTH_CLIENT_ID = `565423452099.570550895143`
export const SLACK_OAUTH_SECRET = `77a7ce797862b050033c2b09da139478`

export const SLACK_AUTH_URL_BASE = `https://slack.com/oauth/authorize`

export const SLACK_BASE_API_URL = `https://slack.com/api`

export const SLACK_ACCESS_TOKEN_URL = `${SLACK_BASE_API_URL}/oauth.access`

export const SLACK_USER_API_URL = `${SLACK_BASE_API_URL}/users.info`

export const JARGON_APP_BASE_URL = `http://localhost:8000`

export const JARGON_APP_REDIRECT_URL = `${JARGON_APP_BASE_URL}/app/auth/redirect`

export const REDIRECT_LOGIN_URL = `${JARGON_APP_BASE_URL}/app/login`
