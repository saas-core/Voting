import { Context } from "../types";
import {
  CoreMutationResolvers,
  MutationResult,
  Voter,
} from "@jargon-pkg/graphql";
import { link } from "fs";
// import { Link } from "../../generated/prisma-client";


export const VoterMutation: CoreMutationResolvers.Resolvers<Context> = {
  createVoter: async (_parent, { input }, { db }: Context, info) => {
    return await db.createVoter({
      name: input.name,
      resourceId: input.resourceId,
      displayName: input.displayName,
      email: input.email  
    }) as Voter;
  },
  deleteVoter: async (_parent, { id }, { db }: Context, info) => {
    const deletedVoter = (await db.deleteVoter({
      id: id,
    })) as Voter;
    if (deletedVoter) {
      return { success: true } as MutationResult;
    }
    return { success: false } as MutationResult;
  },
  updateVoter: async (_parent, { id, input }, { db }: Context, info) => {
    return await db.updateVoter({
      data: {
        name: input.name,
        displayName: input.displayName,
        email: input.email  
      },
      where: {
        id: id
      }
    }) as Voter;
  },
};

