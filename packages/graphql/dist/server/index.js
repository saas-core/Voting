"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const graphql_middleware_1 = require("graphql-middleware");
const apollo_server_express_1 = require("apollo-server-express");
const instrumentation_1 = require("../instrumentation");
function createGraphQLServer({ app, typeDefs, permissions, graphQLPath = `/graphql`, subscriptionsPath, port, logger, resolvers, context, middlewares, sentry, }) {
    const subscriptions = subscriptionsPath
        ? {
            keepAlive: 1000 * 30,
            path: subscriptionsPath,
            onConnect: (connectionParams, webSocket) => {
                const upgradeHeaders = lodash_1.get(webSocket, `upgradeReq.headers`);
                return {
                    gatsbyuserid: lodash_1.get(upgradeHeaders, `x-cloud-user-id`) ||
                        lodash_1.get(connectionParams, `x-cloud-user-id`),
                };
            },
        }
        : {};
    let schema = apollo_server_express_1.makeExecutableSchema({
        typeDefs,
        resolvers,
    });
    schema = graphql_middleware_1.applyMiddleware(schema, instrumentation_1.instrumentationMiddleware);
    if (permissions) {
        schema = graphql_middleware_1.applyMiddleware(schema, permissions);
    }
    if (middlewares) {
        schema = graphql_middleware_1.applyMiddleware(schema, ...middlewares);
    }
    if (sentry) {
        schema = graphql_middleware_1.applyMiddleware(schema, instrumentation_1.sentryMiddleware(sentry));
    }
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context,
        subscriptions,
        // Set introspection to true.
        // This server does not expose a public ingress
        introspection: true,
        formatError: error => {
            throw new Error(error.message);
        },
    });
    apolloServer.applyMiddleware({ app, path: graphQLPath });
    const httpServer = app.listen(port, () => {
        logger.INFO(`🚀 Server ready on *:${port}`);
    });
    if (subscriptionsPath) {
        logger.INFO(`Installing subscription handlers`);
        // run SubscriptionServer.create using context function provided in ApolloServer constructor
        apolloServer.installSubscriptionHandlers(httpServer);
    }
    return httpServer;
}
exports.createGraphQLServer = createGraphQLServer;
//# sourceMappingURL=index.js.map