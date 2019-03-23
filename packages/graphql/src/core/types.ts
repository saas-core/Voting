// THIS IS A GENERATED FILE
export type Maybe<T> = T | null;

export interface PaginationInput {
  limit?: Maybe<number>;

  offset?: Maybe<number>;
}

export interface VoterCreateInput {
  resourceId: string;

  name: string;

  displayName: string;

  email: string;
}

export interface VoterUpdateInput {
  name?: Maybe<string>;

  displayName?: Maybe<string>;

  email?: Maybe<string>;
}

export interface VoteCountCreateInput {
  resourceId: string;
}

export interface VoteCreateInput {
  vote: VoteType;
}

export interface VoteUpdateInput {
  id: string;

  vote: VoteType;
}

export enum VoteType {
  Upvote = "UPVOTE",
  Downvote = "DOWNVOTE"
}

export enum OrderType {
  TotalAsc = "total_ASC",
  TotalDesc = "total_DESC",
  UpvotesAsc = "upvotes_ASC",
  UpvotesDesc = "upvotes_DESC",
  DownvotesAsc = "downvotes_ASC",
  DownvotesDesc = "downvotes_DESC"
}

// ====================================================
// Types
// ====================================================

export interface Query {
  ping: string;

  voteCountById?: Maybe<VoteCount>;

  allVoteCount?: Maybe<(Maybe<VoteCount>)[]>;

  voterByID?: Maybe<Voter>;
}

export interface VoteCount {
  id: string;

  resourceId: string;

  upvotes: number;

  downvotes: number;

  total: number;

  votes?: Maybe<(Maybe<Vote>)[]>;
}

export interface Vote {
  id: string;

  vote: VoteType;
}

export interface Voter {
  id: string;

  resourceId: string;

  name?: Maybe<string>;

  displayName?: Maybe<string>;

  avatarUrl?: Maybe<string>;

  email?: Maybe<string>;

  timezone?: Maybe<string>;

  timezoneLabel?: Maybe<string>;

  votes?: Maybe<(Maybe<Vote>)[]>;
}

export interface Mutation {
  createVoter?: Maybe<Voter>;

  updateVoter?: Maybe<Voter>;

  deleteVoter?: Maybe<MutationResult>;

  createVoteCount?: Maybe<VoteCount>;

  deleteVoteCount?: Maybe<MutationResult>;

  castVote?: Maybe<MutationResult>;

  withdrawVote?: Maybe<MutationResult>;

  deleteVote?: Maybe<MutationResult>;

  changeVote?: Maybe<MutationResult>;

  changeVoteVoter?: Maybe<MutationResult>;
}

export interface MutationResult {
  success?: Maybe<boolean>;
}

// ====================================================
// Arguments
// ====================================================

export interface VoteCountByIdQueryArgs {
  id: string;
}
export interface AllVoteCountQueryArgs {
  pagination?: Maybe<PaginationInput>;

  orderBy?: Maybe<OrderType>;
}
export interface VoterByIdQueryArgs {
  id: string;
}
export interface CreateVoterMutationArgs {
  input: VoterCreateInput;
}
export interface UpdateVoterMutationArgs {
  id: string;

  input: VoterUpdateInput;
}
export interface DeleteVoterMutationArgs {
  id: string;
}
export interface CreateVoteCountMutationArgs {
  input: VoteCountCreateInput;
}
export interface DeleteVoteCountMutationArgs {
  id: string;
}
export interface CastVoteMutationArgs {
  voterId: string;

  countId: string;

  input: VoteCreateInput;
}
export interface WithdrawVoteMutationArgs {
  voterId: string;

  countId: string;

  voteId: string;
}
export interface DeleteVoteMutationArgs {
  countId: string;

  voteId: string;
}
export interface ChangeVoteMutationArgs {
  countId: string;

  input: VoteUpdateInput;
}
export interface ChangeVoteVoterMutationArgs {
  voterId: string;

  countId: string;

  input: VoteUpdateInput;
}

import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  TContext = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>;

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<TContext = {}, TypeParent = {}> {
    ping?: PingResolver<string, TypeParent, TContext>;

    voteCountById?: VoteCountByIdResolver<
      Maybe<VoteCount>,
      TypeParent,
      TContext
    >;

    allVoteCount?: AllVoteCountResolver<
      Maybe<(Maybe<VoteCount>)[]>,
      TypeParent,
      TContext
    >;

    voterByID?: VoterByIdResolver<Maybe<Voter>, TypeParent, TContext>;
  }

  export type PingResolver<R = string, Parent = {}, TContext = {}> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type VoteCountByIdResolver<
    R = Maybe<VoteCount>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, VoteCountByIdArgs>;
  export interface VoteCountByIdArgs {
    id: string;
  }

  export type AllVoteCountResolver<
    R = Maybe<(Maybe<VoteCount>)[]>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, AllVoteCountArgs>;
  export interface AllVoteCountArgs {
    pagination?: Maybe<PaginationInput>;

    orderBy?: Maybe<OrderType>;
  }

  export type VoterByIdResolver<
    R = Maybe<Voter>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, VoterByIdArgs>;
  export interface VoterByIdArgs {
    id: string;
  }
}

export namespace VoteCountResolvers {
  export interface Resolvers<TContext = {}, TypeParent = VoteCount> {
    id?: IdResolver<string, TypeParent, TContext>;

    resourceId?: ResourceIdResolver<string, TypeParent, TContext>;

    upvotes?: UpvotesResolver<number, TypeParent, TContext>;

    downvotes?: DownvotesResolver<number, TypeParent, TContext>;

    total?: TotalResolver<number, TypeParent, TContext>;

    votes?: VotesResolver<Maybe<(Maybe<Vote>)[]>, TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = VoteCount,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type ResourceIdResolver<
    R = string,
    Parent = VoteCount,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type UpvotesResolver<
    R = number,
    Parent = VoteCount,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type DownvotesResolver<
    R = number,
    Parent = VoteCount,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type TotalResolver<
    R = number,
    Parent = VoteCount,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type VotesResolver<
    R = Maybe<(Maybe<Vote>)[]>,
    Parent = VoteCount,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
}

export namespace VoteResolvers {
  export interface Resolvers<TContext = {}, TypeParent = Vote> {
    id?: IdResolver<string, TypeParent, TContext>;

    vote?: VoteResolver<VoteType, TypeParent, TContext>;
  }

  export type IdResolver<R = string, Parent = Vote, TContext = {}> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type VoteResolver<
    R = VoteType,
    Parent = Vote,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
}

export namespace VoterResolvers {
  export interface Resolvers<TContext = {}, TypeParent = Voter> {
    id?: IdResolver<string, TypeParent, TContext>;

    resourceId?: ResourceIdResolver<string, TypeParent, TContext>;

    name?: NameResolver<Maybe<string>, TypeParent, TContext>;

    displayName?: DisplayNameResolver<Maybe<string>, TypeParent, TContext>;

    avatarUrl?: AvatarUrlResolver<Maybe<string>, TypeParent, TContext>;

    email?: EmailResolver<Maybe<string>, TypeParent, TContext>;

    timezone?: TimezoneResolver<Maybe<string>, TypeParent, TContext>;

    timezoneLabel?: TimezoneLabelResolver<Maybe<string>, TypeParent, TContext>;

    votes?: VotesResolver<Maybe<(Maybe<Vote>)[]>, TypeParent, TContext>;
  }

  export type IdResolver<R = string, Parent = Voter, TContext = {}> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type ResourceIdResolver<
    R = string,
    Parent = Voter,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type NameResolver<
    R = Maybe<string>,
    Parent = Voter,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type DisplayNameResolver<
    R = Maybe<string>,
    Parent = Voter,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type AvatarUrlResolver<
    R = Maybe<string>,
    Parent = Voter,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type EmailResolver<
    R = Maybe<string>,
    Parent = Voter,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type TimezoneResolver<
    R = Maybe<string>,
    Parent = Voter,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type TimezoneLabelResolver<
    R = Maybe<string>,
    Parent = Voter,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type VotesResolver<
    R = Maybe<(Maybe<Vote>)[]>,
    Parent = Voter,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
}

export namespace MutationResolvers {
  export interface Resolvers<TContext = {}, TypeParent = {}> {
    createVoter?: CreateVoterResolver<Maybe<Voter>, TypeParent, TContext>;

    updateVoter?: UpdateVoterResolver<Maybe<Voter>, TypeParent, TContext>;

    deleteVoter?: DeleteVoterResolver<
      Maybe<MutationResult>,
      TypeParent,
      TContext
    >;

    createVoteCount?: CreateVoteCountResolver<
      Maybe<VoteCount>,
      TypeParent,
      TContext
    >;

    deleteVoteCount?: DeleteVoteCountResolver<
      Maybe<MutationResult>,
      TypeParent,
      TContext
    >;

    castVote?: CastVoteResolver<Maybe<MutationResult>, TypeParent, TContext>;

    withdrawVote?: WithdrawVoteResolver<
      Maybe<MutationResult>,
      TypeParent,
      TContext
    >;

    deleteVote?: DeleteVoteResolver<
      Maybe<MutationResult>,
      TypeParent,
      TContext
    >;

    changeVote?: ChangeVoteResolver<
      Maybe<MutationResult>,
      TypeParent,
      TContext
    >;

    changeVoteVoter?: ChangeVoteVoterResolver<
      Maybe<MutationResult>,
      TypeParent,
      TContext
    >;
  }

  export type CreateVoterResolver<
    R = Maybe<Voter>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, CreateVoterArgs>;
  export interface CreateVoterArgs {
    input: VoterCreateInput;
  }

  export type UpdateVoterResolver<
    R = Maybe<Voter>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, UpdateVoterArgs>;
  export interface UpdateVoterArgs {
    id: string;

    input: VoterUpdateInput;
  }

  export type DeleteVoterResolver<
    R = Maybe<MutationResult>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, DeleteVoterArgs>;
  export interface DeleteVoterArgs {
    id: string;
  }

  export type CreateVoteCountResolver<
    R = Maybe<VoteCount>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, CreateVoteCountArgs>;
  export interface CreateVoteCountArgs {
    input: VoteCountCreateInput;
  }

  export type DeleteVoteCountResolver<
    R = Maybe<MutationResult>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, DeleteVoteCountArgs>;
  export interface DeleteVoteCountArgs {
    id: string;
  }

  export type CastVoteResolver<
    R = Maybe<MutationResult>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, CastVoteArgs>;
  export interface CastVoteArgs {
    voterId: string;

    countId: string;

    input: VoteCreateInput;
  }

  export type WithdrawVoteResolver<
    R = Maybe<MutationResult>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, WithdrawVoteArgs>;
  export interface WithdrawVoteArgs {
    voterId: string;

    countId: string;

    voteId: string;
  }

  export type DeleteVoteResolver<
    R = Maybe<MutationResult>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, DeleteVoteArgs>;
  export interface DeleteVoteArgs {
    countId: string;

    voteId: string;
  }

  export type ChangeVoteResolver<
    R = Maybe<MutationResult>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, ChangeVoteArgs>;
  export interface ChangeVoteArgs {
    countId: string;

    input: VoteUpdateInput;
  }

  export type ChangeVoteVoterResolver<
    R = Maybe<MutationResult>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, ChangeVoteVoterArgs>;
  export interface ChangeVoteVoterArgs {
    voterId: string;

    countId: string;

    input: VoteUpdateInput;
  }
}

export namespace MutationResultResolvers {
  export interface Resolvers<TContext = {}, TypeParent = MutationResult> {
    success?: SuccessResolver<Maybe<boolean>, TypeParent, TContext>;
  }

  export type SuccessResolver<
    R = Maybe<boolean>,
    Parent = MutationResult,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export type IResolvers<TContext = {}> = {
  Query?: QueryResolvers.Resolvers<TContext>;
  VoteCount?: VoteCountResolvers.Resolvers<TContext>;
  Vote?: VoteResolvers.Resolvers<TContext>;
  Voter?: VoterResolvers.Resolvers<TContext>;
  Mutation?: MutationResolvers.Resolvers<TContext>;
  MutationResult?: MutationResultResolvers.Resolvers<TContext>;
} & { [typeName: string]: never };

export type IDirectiveResolvers<Result> = {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
} & { [directiveName: string]: never };
