import { MOCK } from '../constants'
import { VoterQuery, VoterMutation } from './voters'
import { VoteCountMutation, VoteCountQuery} from './vote'
import { MockQuery, MockMutation } from './mocks'

export default function createResolvers() {
  if (MOCK) {
    return {
      Query: MockQuery,
      Mutation: MockMutation,
    }
  }
  return {
    Voter: {
      votes: (parent, params, { db }) => {
        return db.voter({ id: parent.id }).votes()
      }
    },
    VoteCount: {
      votes: (parent, params, { db }) => {
        return db.voteCount({ id: parent.id }).votes()
      }
    },
    Query: {
      ...VoterQuery,
      ...VoteCountQuery,
    },
    Mutation: {
      ...VoterMutation,
      ...VoteCountMutation
    },
  }
}
