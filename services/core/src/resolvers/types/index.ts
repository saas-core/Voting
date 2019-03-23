import { Prisma } from '../../generated/prisma-client'
import { UserDAO, SlackDAO } from '../../persistence'

export interface Context {
  db: Prisma
  userId?: string
  daos: {
    user: UserDAO
    slack: SlackDAO
  }
}
