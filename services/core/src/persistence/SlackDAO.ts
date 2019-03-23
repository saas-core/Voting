import * as qs from 'querystring'
import * as fetch from 'isomorphic-fetch'
import {
  SLACK_ACCESS_TOKEN_URL,
  SLACK_USER_API_URL,
  SLACK_BASE_API_URL,
} from '../constants'

export class SlackDAO {
  async getSlackAccessToken(query) {
    const tokenUrl = `${SLACK_ACCESS_TOKEN_URL}?${qs.stringify(query)}`

    const resp = await fetch(tokenUrl, {
      method: `POST`,
      headers: {
        accept: `application/json`,
      },
    })

    if (resp.status < 200 || resp.status > 299) {
      return null
    }

    const body = await resp.json()

    return body
  }

  async getSlackUser({ token, slackId }) {
    const tokenUrl = `${SLACK_USER_API_URL}?${qs.stringify({
      token,
      user: slackId,
    })}`

    const resp = await fetch(tokenUrl, {
      method: `POST`,
      headers: {
        accept: `application/json`,
      },
    })

    if (resp.status < 200 || resp.status > 299) {
      return null
    }

    const body = await resp.json()

    return body.user
  }

  async getUsers({ token }) {
    const tokenUrl = `${SLACK_BASE_API_URL}/users.list?${qs.stringify({
      token,
      limit: 100,
    })}`

    const resp = await fetch(tokenUrl, {
      method: `POST`,
      headers: {
        accept: `application/json`,
      },
    })

    if (resp.status < 200 || resp.status > 299) {
      return null
    }

    const body = await resp.json()

    return body.members
  }
}
