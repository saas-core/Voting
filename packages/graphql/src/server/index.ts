import * as express from 'express'
import { get } from 'lodash'
import { applyMiddleware } from 'graphql-middleware'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { instrumentationMiddleware, sentryMiddleware } from '../instrumentation'

export interface IGraphQLServerCreator {
  app: express.Application
  graphQLPath?: string
  subscriptionsPath?: string
  port: number
  typeDefs: string
  onConnect?: (connectionParams: any) => Promise<true | { user: {} }>
  logger: any
  context: ({ req, connection }: { req: any; connection: any }) => any
  resolvers: any
  permissions?: any
  middlewares?: any
  sentry?: any
}

export function createGraphQLServer({
  app,
  typeDefs,
  permissions,
  graphQLPath = `/graphql`,
  subscriptionsPath,
  port,
  logger,
  resolvers,
  context,
  middlewares,
  sentry,
}: IGraphQLServerCreator) {
  const subscriptions = subscriptionsPath
    ? {
        keepAlive: 1000 * 30,
        path: subscriptionsPath,
        onConnect: (connectionParams, webSocket) => {
          const upgradeHeaders = get(webSocket, `upgradeReq.headers`)

          return {
            gatsbyuserid:
              get(upgradeHeaders, `x-cloud-user-id`) ||
              get(connectionParams, `x-cloud-user-id`),
          }
        },
      }
    : {}

  let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  schema = applyMiddleware(schema, instrumentationMiddleware)

  if (permissions) {
    schema = applyMiddleware(schema, permissions)
  }

  if (middlewares) {
    schema = applyMiddleware(schema, ...middlewares)
  }

  if (sentry) {
    schema = applyMiddleware(schema, sentryMiddleware(sentry))
  }

  const apolloServer = new ApolloServer({
    schema,
    context,
    subscriptions,
    // Set introspection to true.
    // This server does not expose a public ingress
    introspection: true,
    formatError: error => {
      throw new Error(error.message)
    },
  })

  apolloServer.applyMiddleware({ app, path: graphQLPath })

  const httpServer = app.listen(port, () => {
    logger.INFO(`🚀 Server ready on *:${port}`)
  })

  if (subscriptionsPath) {
    logger.INFO(`Installing subscription handlers`)
    // run SubscriptionServer.create using context function provided in ApolloServer constructor
    apolloServer.installSubscriptionHandlers(httpServer)
  }

  return httpServer
}
