import * as express from 'express'
import {
  createGraphQLServer,
  coreTypeDefs,
} from '@jargon-pkg/graphql'
import { json, urlencoded } from 'body-parser'
import { prisma } from './generated/prisma-client'
import createContext from './resolvers/context'
//import { jargonSlackAll, jargonByFilter } from './webhooks'
import { verifyJWTMiddleware } from './middleware'
import { oauthSlack, oauthSlackCallback } from './authentication'
import createResolvers from './resolvers'
import { DataLayer } from './datalayer'
import { REDIS_URL } from './constants'
import { UserDAO, SlackDAO } from './persistence'
import logger from './logger'

const app = express()

const PORT = 4001

app.use(json())

//app.post('/hooks/slack/all-jargon-objects', urlencoded(), jargonSlackAll)

//app.post('/hooks/slack/filter', urlencoded(), jargonByFilter)

const datalayer = new DataLayer()

datalayer
  .initialize({
    redisConnectorOpts: {
      REDIS_URL,
    },
  })
  .then(({ redis }) => {
    const daos = {
      user: new UserDAO(prisma),
      slack: new SlackDAO(),
    }

    /**
     * SLACK WEBHOOKS
     */
    //app.post('/hooks/slack/all-jargon-objects', urlencoded(), jargonSlackAll)

    // Entry point to the Slack OAuth flow
    // Given a csrfToken, redirect to the
    // Slack OAuth process
    app.get(`/oauth/slack`, oauthSlack({ redis }))

    // Entry point to the Slack OAuth Callback flow
    app.get(`/oauth/slack_callback`, oauthSlackCallback({ redis, daos }))

    app.use(verifyJWTMiddleware)

    const resolvers = createResolvers()

    const context = createContext({ db: prisma, daos })

    createGraphQLServer({
      app,
      port: PORT,
      resolvers,
      context,
      typeDefs: [coreTypeDefs].join(''),
      logger: logger,
    })
  })
