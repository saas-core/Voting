import { CoreQueryResolvers, Voter } from "@voting-pkg/graphql";
import { get, head } from "lodash";
import { Context } from "../types";

export const VoterQuery: CoreQueryResolvers.Resolvers<Context> = {
  voterByID: async (_parent, { id }, { db }) => {
    const voter = await db.voter({ id: id });
    return voter as Voter;
  }
};
