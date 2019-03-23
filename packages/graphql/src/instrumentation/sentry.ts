/**
 * Attach Sentry at all nodes of the GraphQL schema
 */
export function sentryMiddleware(sentry) {
  // Return middleware resolver
  return async (resolve, parent, args, ctx, info) => {
    const userId = ctx && ctx.userId
    const serviceId = ctx && ctx.serviceId
    try {
      const res = await resolve(parent, args, ctx, info)
      if (res instanceof Error) {
        console.log(`Tracking Sentry Error:`, res.message)
        sentry.withScope(scope => {
          captureWithScope({ scope, userId, serviceId })
          sentry.captureException(res)
        })
      }
      return res
    } catch (error) {
      console.log(`Tracking Sentry Error:`, error.message)
      sentry.withScope(scope => {
        captureWithScope({ scope, userId, serviceId })
        sentry.captureException(error)
      })
      // Forward error
      throw error
    }
  }
}

function captureWithScope({ scope, userId, serviceId }) {
  if (userId) {
    scope.setUser({
      id: userId,
    })
  }

  if (serviceId) {
    scope.setExtra(`serviceId`, serviceId)
  }
}
