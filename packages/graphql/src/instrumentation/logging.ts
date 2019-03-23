import { omit } from 'lodash'
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
  const start = process.hrtime()
  return () => {
    const delta = process.hrtime(start)
    return delta[0] + delta[1] / 1e9 // returns a float in seconds
  }
}

async function instrumentation(resolve, parent, args, context, info) {
  const endTime = startTimer()
  const baseLogEvent = [
    { fieldName: info.fieldName },
    { args },
    {
      context: omit(
        context,
        `daos`,
        `_extensionStack`,
        `hooks`,
        `logger`,
        `db`
      ),
    },
  ]

  console.log(`[INFO]`, ...baseLogEvent)

  try {
    const result = await resolve(parent, args, context, info)
    const elapsedTime = endTime()

    console.log(
      `[INFO]`,
      ...[...baseLogEvent, { elapsedTime }, { status: 200 }]
    )

    // graphqlRequestDurartion.observe({ fieldName: info.fieldName }, elapsedTime);

    return result
  } catch (e) {
    const elapsedTime = endTime()

    console.log(
      `[ERROR]`,
      ...[
        ...baseLogEvent,
        { error: e.message },
        { elapsedTime },
        { status: 400 },
      ]
    )

    // graphqlRequestDurartion.observe({ fieldName: info.fieldName }, elapsedTime);

    throw e
  }
}

export const instrumentationMiddleware = {
  Query: instrumentation,
  Mutation: instrumentation,
}
