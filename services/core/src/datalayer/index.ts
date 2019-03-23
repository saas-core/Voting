import * as Redis from 'ioredis'

function createRedis(redisUrl: string) {
  const redis = new Redis(redisUrl)

  return {
    async saveCsrfToken(csrfToken: string): Promise<void> {
      await redis.setex(`auth_csrf:${csrfToken}`, 60 * 5, csrfToken) // 5 minute expiry
    },
    async checkCsrfToken(csrfToken: string): Promise<boolean> {
      const val = await redis.get(`auth_csrf:${csrfToken}`)
      return !!val
    },
    async purgeCsrfToken(csrfToken: string): Promise<void> {
      await redis.del(`auth_csrf:${csrfToken}`)
    },
    async setLastEventReadTimestamp(timeMs: number): Promise<void> {
      await redis.set(`last_event_ms`, timeMs)
    },
    async getLastEventReadTimestamp(): Promise<number> {
      const ms = await redis.get(`last_event_ms`)
      return Number(ms)
    },
  }
}

interface IRedisConnector {
  REDIS_URL: string
}

interface DataLayerInitializer {
  redisConnectorOpts?: IRedisConnector
}

interface DataLayerInitialized {
  redis?: any
}

export class DataLayer {
  async initialize({
    redisConnectorOpts,
  }: DataLayerInitializer): Promise<DataLayerInitialized> {
    let connections = {}

    if (redisConnectorOpts) {
      const redis = createRedis(redisConnectorOpts.REDIS_URL)

      connections = {
        ...connections,
        redis,
      }
    }

    return connections
  }
}
