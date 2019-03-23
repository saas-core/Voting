import { Context } from '../types'
import {
  CoreQueryResolvers,
  VoteCount
} from '@jargon-pkg/graphql'

export const VoteCountQuery: CoreQueryResolvers.Resolvers<Context> = {
  voteCountById: async (_parent, { id }, { db }) => {
    const vote = await db.voteCount({ id })
    return vote as VoteCount;
  },
  allVoteCount: async (_parent, _params, { db }) => {
    const votes = await db.voteCounts()
    return votes as VoteCount[]
  },
}
