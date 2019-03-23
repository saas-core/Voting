/// <reference types="node" />
import * as express from 'express';
export interface IGraphQLServerCreator {
    app: express.Application;
    graphQLPath?: string;
    subscriptionsPath?: string;
    port: number;
    typeDefs: string;
    onConnect?: (connectionParams: any) => Promise<true | {
        user: {};
    }>;
    logger: any;
    context: ({ req, connection }: {
        req: any;
        connection: any;
    }) => any;
    resolvers: any;
    permissions?: any;
    middlewares?: any;
    sentry?: any;
}
export declare function createGraphQLServer({ app, typeDefs, permissions, graphQLPath, subscriptionsPath, port, logger, resolvers, context, middlewares, sentry, }: IGraphQLServerCreator): import("http").Server;
