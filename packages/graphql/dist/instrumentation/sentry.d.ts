/**
 * Attach Sentry at all nodes of the GraphQL schema
 */
export declare function sentryMiddleware(sentry: any): (resolve: any, parent: any, args: any, ctx: any, info: any) => Promise<any>;
