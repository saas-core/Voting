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
const lodash_1 = require("lodash");
// import * as promClient from "prom-client";
// export const graphqlRequestDurartion = new promClient.Histogram({
//   name: `graphql_request_duration_seconds`,
//   help: `Request duration in seconds`,
//   labelNames: [`fieldName`]
// });
/**
 * Taken from https://github.com/siimon/prom-client/blob/master/lib/summary.js#L194
 */
function startTimer() {
    const start = process.hrtime();
    return () => {
        const delta = process.hrtime(start);
        return delta[0] + delta[1] / 1e9; // returns a float in seconds
    };
}
function instrumentation(resolve, parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const endTime = startTimer();
        const baseLogEvent = [
            { fieldName: info.fieldName },
            { args },
            {
                context: lodash_1.omit(context, `daos`, `_extensionStack`, `hooks`, `logger`, `db`),
            },
        ];
        console.log(`[INFO]`, ...baseLogEvent);
        try {
            const result = yield resolve(parent, args, context, info);
            const elapsedTime = endTime();
            console.log(`[INFO]`, ...[...baseLogEvent, { elapsedTime }, { status: 200 }]);
            // graphqlRequestDurartion.observe({ fieldName: info.fieldName }, elapsedTime);
            return result;
        }
        catch (e) {
            const elapsedTime = endTime();
            console.log(`[ERROR]`, ...[
                ...baseLogEvent,
                { error: e.message },
                { elapsedTime },
                { status: 400 },
            ]);
            // graphqlRequestDurartion.observe({ fieldName: info.fieldName }, elapsedTime);
            throw e;
        }
    });
}
exports.instrumentationMiddleware = {
    Query: instrumentation,
    Mutation: instrumentation,
};
//# sourceMappingURL=logging.js.map