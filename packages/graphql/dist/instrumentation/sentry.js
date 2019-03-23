"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Attach Sentry at all nodes of the GraphQL schema
 */
function sentryMiddleware(sentry) {
    // Return middleware resolver
    return (resolve, parent, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
        const userId = ctx && ctx.userId;
        const serviceId = ctx && ctx.serviceId;
        try {
            const res = yield resolve(parent, args, ctx, info);
            if (res instanceof Error) {
                console.log(`Tracking Sentry Error:`, res.message);
                sentry.withScope(scope => {
                    captureWithScope({ scope, userId, serviceId });
                    sentry.captureException(res);
                });
            }
            return res;
        }
        catch (error) {
            console.log(`Tracking Sentry Error:`, error.message);
            sentry.withScope(scope => {
                captureWithScope({ scope, userId, serviceId });
                sentry.captureException(error);
            });
            // Forward error
            throw error;
        }
    });
}
exports.sentryMiddleware = sentryMiddleware;
function captureWithScope({ scope, userId, serviceId }) {
    if (userId) {
        scope.setUser({
            id: userId,
        });
    }
    if (serviceId) {
        scope.setExtra(`serviceId`, serviceId);
    }
}
//# sourceMappingURL=sentry.js.map