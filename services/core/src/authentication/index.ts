import * as qs from 'querystring'
import { pick } from 'lodash'
import * as fetch from 'isomorphic-fetch'
import logger from '../logger'
import { UserDAO, SlackDAO } from '../persistence'

import {
  redirectUri,
  SLACK_OAUTH_CLIENT_ID,
  SLACK_OAUTH_SECRET,
  SLACK_AUTH_URL_BASE,
  SLACK_ACCESS_TOKEN_URL,
  SLACK_USER_API_URL,
  JARGON_APP_REDIRECT_URL,
  REDIRECT_LOGIN_URL,
} from '../constants'

import { generateJargonToken } from './jwt'

function createAuthUrl(opts: Record<string, any>): string {
  return `${SLACK_AUTH_URL_BASE}?${qs.stringify(opts)}`
}

export function oauthSlack({ redis }) {
  return async (req, res) => {
    const { csrfToken, loginRedirectUrl } = req.query

    if (!csrfToken) {
      throw new Error(`No CSRF token or invitation token provided`)
    }

    // the csrf token will be used to verify request origin (passed originally by the dashboard)
    // the csrf token must match when redirected back from Slack, and is only necessary for logins
    await redis.saveCsrfToken(csrfToken)

    let queryParam = {}

    if (loginRedirectUrl) {
      queryParam = {
        ...queryParam,
        loginRedirectUrl,
      }
    }

    const redirectUriWithQueryParams = `${redirectUri}?${qs.stringify(
      queryParam
    )}`

    const authUrl = createAuthUrl({
      client_id: SLACK_OAUTH_CLIENT_ID,
      redirect_uri: redirectUriWithQueryParams,
      state: csrfToken,
      scope: `users:read users.profile:read users:read.email`,
    })

    return res.redirect(authUrl)
  }
}

interface Daos {
  user: UserDAO
  slack: SlackDAO
}

export function oauthSlackCallback({
  redis,
  daos,
}: {
  redis: any
  daos: Daos
}) {
  return async (req, res) => {
    const { code, state, loginRedirectUrl } = req.query

    if (!code) {
      logger.ERROR(`no code parameter`)
      return res.redirect(REDIRECT_LOGIN_URL + `?error=oauth-error`)
    }

    let queryParam = {}

    if (loginRedirectUrl) {
      queryParam = {
        ...queryParam,
        loginRedirectUrl,
      }
    }

    const redirectUriWithQueryParams = `${redirectUri}?${qs.stringify(
      queryParam
    )}`

    const { access_token, user_id } = await daos.slack.getSlackAccessToken({
      client_id: SLACK_OAUTH_CLIENT_ID,
      client_secret: SLACK_OAUTH_SECRET,
      state,
      code,
      redirect_uri: redirectUriWithQueryParams,
    })

    if (!access_token) {
      logger.ERROR(`couldn't fetch token`)
      return res.redirect(REDIRECT_LOGIN_URL + `?error=oauth-error`)
    }

    let slackUser

    try {
      slackUser = await daos.slack.getSlackUser({
        token: access_token,
        slackId: user_id,
      })
    } catch (e) {
      logger.ERROR(
        `An error occured while attempting to fetch a User from Slack`
      )
      return res.redirect(REDIRECT_LOGIN_URL + `?error=oauth-error`)
    }

    if (!slackUser) {
      logger.ERROR(`couldn't fetch Slack user with token`)
      return res.redirect(REDIRECT_LOGIN_URL + `?error=oauth-error`)
    }

    let canCreate

    try {
      canCreate = await redis.checkCsrfToken(state)
    } catch (e) {
      logger.ERROR(`There was an error checking the CSRF token`)
      logger.ERROR(e.message)
    }

    if (!canCreate) {
      return res.redirect(REDIRECT_LOGIN_URL + `?error=oauth-error`)
    }

    const user = await daos.user.findOrCreateUserBySlackId({
      token: access_token,
      slackUserId: user_id,
      slackUser: {
        ...pick(slackUser, 'tz', 'tz_label'),
        ...slackUser.profile,
      },
      onError: () => res.redirect(REDIRECT_LOGIN_URL + `?error=oauth-error`),
    })

    const jargonToken = generateJargonToken(user)

    const redirectParams = {
      token: jargonToken,
      id: user.id,
      loginRedirectUrl,
    }

    return res.redirect(
      JARGON_APP_REDIRECT_URL + `?${qs.stringify(redirectParams)}`
    )
  }
}
