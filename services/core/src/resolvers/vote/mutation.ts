import { Context } from "../types";
import {
  CoreMutationResolvers,
  MutationResult,
  VoteCount,
  Voter
} from "@jargon-pkg/graphql";
import { link } from "fs";
import { Vote } from "../../generated/prisma-client";
// import { Link } from "../../generated/prisma-client";


export const VoteCountMutation: CoreMutationResolvers.Resolvers<Context> = {
  createVoteCount: async (_parent, { input }, { db }: Context, info) => {
    return await db.createVoteCount({
      resourceId: input.resourceId
    }) as VoteCount;
  },
  deleteVoteCount: async (_parent, { id }, { db }: Context, info) => {
    const deletedVoteCount = (await db.deleteVoteCount({
      id: id,
    })) as VoteCount
    if (deletedVoteCount) {
      return { success: true } as MutationResult
    }
    return { success: false } as MutationResult
  },
  castVote: async (_parent, { voterId, countId, input }, { db }: Context, info) => {
    const cast = await (db.createVote({
      vote: input.vote,
      user: {
        connect: { id: voterId }
      },
      voteCount: {
        connect: { id: countId}
      }
    })) as Vote;
    var upvote = 0;
    var downvote = 0;
    if (cast.vote == "UPVOTE") {
      upvote = upvote + 1;
    } else {
      downvote = downvote + 1;
    }
    // const user = await db.updateUser({
    //   data: {
    //     votes: {
    //       connect: { id: cast.id }
    //     }
    //   },
    //   where: {
    //     id: userId
    //   }
    // }) as User;
    const currentVoteCount = await db.voteCount({ id: countId })
    const voteCount = await db.updateVoteCount({
      data: {
        upvotes: currentVoteCount.upvotes + upvote,
        downvotes: currentVoteCount.downvotes + downvote,
        total: currentVoteCount.total + upvote - downvote
        // votes: {
        //   connect: { id: cast.id }
        // }
      },
      where: {
        id: countId
      }
    }) as VoteCount;
    if (cast && voteCount) {
      return { success: true } as MutationResult
    }
    return { success: false } as MutationResult
  },
  withdrawVote: async (_parent, { voterId, countId, voteId }, { db }: Context, info) => {
    const cast = await (db.vote({ id: voteId })) as Vote;
    var upvote = 0;
    var downvote = 0;
    if (cast.vote == "UPVOTE") {
      upvote = upvote + 1;
    } else {
      downvote = downvote + 1;
    }
    const voter = await db.updateVoter({
      data: {
        votes: {
          delete: { id: cast.id }
        }
      },
      where: {
        id: voterId
      }
    }) as Voter;
    const currentVoteCount = await db.voteCount({ id: countId })
    const voteCount = await db.updateVoteCount({
      data: {
        upvotes: currentVoteCount.upvotes - upvote,
        downvotes: currentVoteCount.downvotes - downvote,
        total: currentVoteCount.total - upvote + downvote,
      },
      where: {
        id: countId
      }
    }) as VoteCount;
    if ( voter && voteCount) {
      return { success: true } as MutationResult
    }
    return { success: false } as MutationResult
  },
  deleteVote: async (_parent, { countId, voteId }, { db }: Context, info) => {
    const deletedCast = await (db.deleteVote({ id: voteId })) as Vote;
    var upvote = 0;
    var downvote = 0;
    if (deletedCast.vote == "UPVOTE") {
      upvote = upvote + 1;
    } else {
      downvote = downvote + 1;
    }
    const currentVoteCount = await db.voteCount({ id: countId })
    const voteCount = await db.updateVoteCount({
      data: {
        upvotes: currentVoteCount.upvotes - upvote,
        downvotes: currentVoteCount.downvotes - downvote,
        total: currentVoteCount.total - upvote + downvote,
      },
      where: {
        id: countId
      }
    }) as VoteCount;
    if (deletedCast && voteCount) {
      return { success: true } as MutationResult
    }
    return { success: false } as MutationResult
  },
  changeVote: async (_parent, { countId, input }, { db }: Context, info) => {
    const oldVote = await (db.vote({id: input.id}))
    const cast = await (db.updateVote({
      data: {
        vote: input.vote
      },
      where: {
        id: input.id
      }
    })) as Vote;
    var upvote = 0;
    var downvote = 0;
    if(cast.vote != oldVote.vote){
      if (cast.vote == "UPVOTE") {
        upvote = upvote + 1;
        downvote = downvote - 1;
      } else {
        downvote = downvote + 1;
        upvote = upvote - 1;
      }
    }
    const currentVoteCount = await db.voteCount({ id: countId })
    const voteCount = await db.updateVoteCount({
      data: {
        upvotes: currentVoteCount.upvotes + upvote,
        downvotes: currentVoteCount.downvotes + downvote,
        total: currentVoteCount.total + upvote - downvote,
      },
      where: {
        id: countId
      }
    }) as VoteCount;
    if (cast && voteCount) {
      return { success: true } as MutationResult
    }
    return { success: false } as MutationResult
  },
  changeVoteVoter: async (_parent, { voterId, countId, input }, { db }: Context, info) => {
    const oldVote = await (db.vote({id: input.id}))
    const voter = await (db.updateVoter({
      data: {
        votes: {
          update: {
            data: {
              vote: input.vote
            },
            where: {
              id: input.id
            }
          }
        }
      },
      where: {
        id: voterId
      }
    }))
    var upvote = 0;
    var downvote = 0;
    if(input.vote != oldVote.vote){
      if (input.vote == "UPVOTE") {
        upvote = upvote + 1;
        downvote = downvote - 1;
      } else {
        downvote = downvote + 1;
        upvote = upvote - 1;
      }
    }
    const currentVoteCount = await db.voteCount({ id: countId })
    const voteCount = await db.updateVoteCount({
      data: {
        upvotes: currentVoteCount.upvotes + upvote,
        downvotes: currentVoteCount.downvotes + downvote,
        total: currentVoteCount.total + upvote - downvote,
      },
      where: {
        id: countId
      }
    }) as VoteCount;
    if (voter && voteCount) {
      return { success: true } as MutationResult
    }
    return { success: false } as MutationResult
  },
};

