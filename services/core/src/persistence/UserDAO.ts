import { head } from 'lodash'
import { Prisma, SourceType } from '../generated/prisma-client'
import logger from '../logger'

export class UserDAO {
  db: Prisma
  constructor(db: Prisma) {
    this.db = db
  }

  public async findOrCreateUserBySlackId({
    slackUserId,
    slackUser,
    token,
    onError,
  }) {
    logger.INFO(`Fetching User by Slack User Id ${slackUserId}`)

    let user

    try {
      const users = await this.db.users({
        where: {
          sources_some: {
            sourceId: slackUserId,
          },
        },
      })

      user = head(users)

      logger.INFO(`User found by Slack User Id ${slackUserId}`)
    } catch (e) {
      logger.ERROR(`Unable to find User by Slack User ID ${slackUserId}`)
      logger.ERROR(e.message)
      return onError()
    }

    if (!user) {
      logger.INFO(`User not found, creating...`)

      try {
        user = await this.db.createUser({
          name: slackUser.real_name,
          email: slackUser.email,
          displayName: slackUser.display_name,
          timezone: slackUser.tz,
          title: slackUser.title,
          timezoneLabel: slackUser.tz_label,
          avatarUrl: slackUser.image_192,
          sources: {
            create: {
              sourceId: slackUserId,
              sourceToken: token,
              sourceType: `SLACK` as SourceType,
            },
          },
        })
      } catch (e) {
        logger.ERROR(`Unable to create User`)
        logger.ERROR(e.message)
        return onError()
      }
    }

    return user
  }
}
