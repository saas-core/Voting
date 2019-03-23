declare function instrumentation(resolve: any, parent: any, args: any, context: any, info: any): Promise<any>;
export declare const instrumentationMiddleware: {
    Query: typeof instrumentation;
    Mutation: typeof instrumentation;
};
export {};
