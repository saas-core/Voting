export declare type Maybe<T> = T | null;
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
export declare enum VoteType {
    Upvote = "UPVOTE",
    Downvote = "DOWNVOTE"
}
export declare enum OrderType {
    TotalAsc = "total_ASC",
    TotalDesc = "total_DESC",
    UpvotesAsc = "upvotes_ASC",
    UpvotesDesc = "upvotes_DESC",
    DownvotesAsc = "downvotes_ASC",
    DownvotesDesc = "downvotes_DESC"
}
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
export declare type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (parent: Parent, args: Args, context: TContext, info: GraphQLResolveInfo) => Promise<Result> | Result;
export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
    subscribe<R = Result, P = Parent>(parent: P, args: Args, context: TContext, info: GraphQLResolveInfo): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
    resolve?<R = Result, P = Parent>(parent: P, args: Args, context: TContext, info: GraphQLResolveInfo): R | Result | Promise<R | Result>;
}
export declare type SubscriptionResolver<Result, Parent = {}, TContext = {}, Args = {}> = ((...args: any[]) => ISubscriptionResolverObject<Result, Parent, TContext, Args>) | ISubscriptionResolverObject<Result, Parent, TContext, Args>;
export declare type TypeResolveFn<Types, Parent = {}, TContext = {}> = (parent: Parent, context: TContext, info: GraphQLResolveInfo) => Maybe<Types>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (next: NextResolverFn<TResult>, source: any, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export declare namespace QueryResolvers {
    interface Resolvers<TContext = {}, TypeParent = {}> {
        ping?: PingResolver<string, TypeParent, TContext>;
        voteCountById?: VoteCountByIdResolver<Maybe<VoteCount>, TypeParent, TContext>;
        allVoteCount?: AllVoteCountResolver<Maybe<(Maybe<VoteCount>)[]>, TypeParent, TContext>;
        voterByID?: VoterByIdResolver<Maybe<Voter>, TypeParent, TContext>;
    }
    type PingResolver<R = string, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext>;
    type VoteCountByIdResolver<R = Maybe<VoteCount>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, VoteCountByIdArgs>;
    interface VoteCountByIdArgs {
        id: string;
    }
    type AllVoteCountResolver<R = Maybe<(Maybe<VoteCount>)[]>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, AllVoteCountArgs>;
    interface AllVoteCountArgs {
        pagination?: Maybe<PaginationInput>;
        orderBy?: Maybe<OrderType>;
    }
    type VoterByIdResolver<R = Maybe<Voter>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, VoterByIdArgs>;
    interface VoterByIdArgs {
        id: string;
    }
}
export declare namespace VoteCountResolvers {
    interface Resolvers<TContext = {}, TypeParent = VoteCount> {
        id?: IdResolver<string, TypeParent, TContext>;
        resourceId?: ResourceIdResolver<string, TypeParent, TContext>;
        upvotes?: UpvotesResolver<number, TypeParent, TContext>;
        downvotes?: DownvotesResolver<number, TypeParent, TContext>;
        total?: TotalResolver<number, TypeParent, TContext>;
        votes?: VotesResolver<Maybe<(Maybe<Vote>)[]>, TypeParent, TContext>;
    }
    type IdResolver<R = string, Parent = VoteCount, TContext = {}> = Resolver<R, Parent, TContext>;
    type ResourceIdResolver<R = string, Parent = VoteCount, TContext = {}> = Resolver<R, Parent, TContext>;
    type UpvotesResolver<R = number, Parent = VoteCount, TContext = {}> = Resolver<R, Parent, TContext>;
    type DownvotesResolver<R = number, Parent = VoteCount, TContext = {}> = Resolver<R, Parent, TContext>;
    type TotalResolver<R = number, Parent = VoteCount, TContext = {}> = Resolver<R, Parent, TContext>;
    type VotesResolver<R = Maybe<(Maybe<Vote>)[]>, Parent = VoteCount, TContext = {}> = Resolver<R, Parent, TContext>;
}
export declare namespace VoteResolvers {
    interface Resolvers<TContext = {}, TypeParent = Vote> {
        id?: IdResolver<string, TypeParent, TContext>;
        vote?: VoteResolver<VoteType, TypeParent, TContext>;
    }
    type IdResolver<R = string, Parent = Vote, TContext = {}> = Resolver<R, Parent, TContext>;
    type VoteResolver<R = VoteType, Parent = Vote, TContext = {}> = Resolver<R, Parent, TContext>;
}
export declare namespace VoterResolvers {
    interface Resolvers<TContext = {}, TypeParent = Voter> {
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
    type IdResolver<R = string, Parent = Voter, TContext = {}> = Resolver<R, Parent, TContext>;
    type ResourceIdResolver<R = string, Parent = Voter, TContext = {}> = Resolver<R, Parent, TContext>;
    type NameResolver<R = Maybe<string>, Parent = Voter, TContext = {}> = Resolver<R, Parent, TContext>;
    type DisplayNameResolver<R = Maybe<string>, Parent = Voter, TContext = {}> = Resolver<R, Parent, TContext>;
    type AvatarUrlResolver<R = Maybe<string>, Parent = Voter, TContext = {}> = Resolver<R, Parent, TContext>;
    type EmailResolver<R = Maybe<string>, Parent = Voter, TContext = {}> = Resolver<R, Parent, TContext>;
    type TimezoneResolver<R = Maybe<string>, Parent = Voter, TContext = {}> = Resolver<R, Parent, TContext>;
    type TimezoneLabelResolver<R = Maybe<string>, Parent = Voter, TContext = {}> = Resolver<R, Parent, TContext>;
    type VotesResolver<R = Maybe<(Maybe<Vote>)[]>, Parent = Voter, TContext = {}> = Resolver<R, Parent, TContext>;
}
export declare namespace MutationResolvers {
    interface Resolvers<TContext = {}, TypeParent = {}> {
        createVoter?: CreateVoterResolver<Maybe<Voter>, TypeParent, TContext>;
        updateVoter?: UpdateVoterResolver<Maybe<Voter>, TypeParent, TContext>;
        deleteVoter?: DeleteVoterResolver<Maybe<MutationResult>, TypeParent, TContext>;
        createVoteCount?: CreateVoteCountResolver<Maybe<VoteCount>, TypeParent, TContext>;
        deleteVoteCount?: DeleteVoteCountResolver<Maybe<MutationResult>, TypeParent, TContext>;
        castVote?: CastVoteResolver<Maybe<MutationResult>, TypeParent, TContext>;
        withdrawVote?: WithdrawVoteResolver<Maybe<MutationResult>, TypeParent, TContext>;
        deleteVote?: DeleteVoteResolver<Maybe<MutationResult>, TypeParent, TContext>;
        changeVote?: ChangeVoteResolver<Maybe<MutationResult>, TypeParent, TContext>;
        changeVoteVoter?: ChangeVoteVoterResolver<Maybe<MutationResult>, TypeParent, TContext>;
    }
    type CreateVoterResolver<R = Maybe<Voter>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, CreateVoterArgs>;
    interface CreateVoterArgs {
        input: VoterCreateInput;
    }
    type UpdateVoterResolver<R = Maybe<Voter>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, UpdateVoterArgs>;
    interface UpdateVoterArgs {
        id: string;
        input: VoterUpdateInput;
    }
    type DeleteVoterResolver<R = Maybe<MutationResult>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, DeleteVoterArgs>;
    interface DeleteVoterArgs {
        id: string;
    }
    type CreateVoteCountResolver<R = Maybe<VoteCount>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, CreateVoteCountArgs>;
    interface CreateVoteCountArgs {
        input: VoteCountCreateInput;
    }
    type DeleteVoteCountResolver<R = Maybe<MutationResult>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, DeleteVoteCountArgs>;
    interface DeleteVoteCountArgs {
        id: string;
    }
    type CastVoteResolver<R = Maybe<MutationResult>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, CastVoteArgs>;
    interface CastVoteArgs {
        voterId: string;
        countId: string;
        input: VoteCreateInput;
    }
    type WithdrawVoteResolver<R = Maybe<MutationResult>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, WithdrawVoteArgs>;
    interface WithdrawVoteArgs {
        voterId: string;
        countId: string;
        voteId: string;
    }
    type DeleteVoteResolver<R = Maybe<MutationResult>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, DeleteVoteArgs>;
    interface DeleteVoteArgs {
        countId: string;
        voteId: string;
    }
    type ChangeVoteResolver<R = Maybe<MutationResult>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, ChangeVoteArgs>;
    interface ChangeVoteArgs {
        countId: string;
        input: VoteUpdateInput;
    }
    type ChangeVoteVoterResolver<R = Maybe<MutationResult>, Parent = {}, TContext = {}> = Resolver<R, Parent, TContext, ChangeVoteVoterArgs>;
    interface ChangeVoteVoterArgs {
        voterId: string;
        countId: string;
        input: VoteUpdateInput;
    }
}
export declare namespace MutationResultResolvers {
    interface Resolvers<TContext = {}, TypeParent = MutationResult> {
        success?: SuccessResolver<Maybe<boolean>, TypeParent, TContext>;
    }
    type SuccessResolver<R = Maybe<boolean>, Parent = MutationResult, TContext = {}> = Resolver<R, Parent, TContext>;
}
/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export declare type SkipDirectiveResolver<Result> = DirectiveResolverFn<Result, SkipDirectiveArgs, {}>;
export interface SkipDirectiveArgs {
    /** Skipped when true. */
    if: boolean;
}
/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export declare type IncludeDirectiveResolver<Result> = DirectiveResolverFn<Result, IncludeDirectiveArgs, {}>;
export interface IncludeDirectiveArgs {
    /** Included when true. */
    if: boolean;
}
/** Marks an element of a GraphQL schema as no longer supported. */
export declare type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<Result, DeprecatedDirectiveArgs, {}>;
export interface DeprecatedDirectiveArgs {
    /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
    reason?: string;
}
export declare type IResolvers<TContext = {}> = {
    Query?: QueryResolvers.Resolvers<TContext>;
    VoteCount?: VoteCountResolvers.Resolvers<TContext>;
    Vote?: VoteResolvers.Resolvers<TContext>;
    Voter?: VoterResolvers.Resolvers<TContext>;
    Mutation?: MutationResolvers.Resolvers<TContext>;
    MutationResult?: MutationResultResolvers.Resolvers<TContext>;
} & {
    [typeName: string]: never;
};
export declare type IDirectiveResolvers<Result> = {
    skip?: SkipDirectiveResolver<Result>;
    include?: IncludeDirectiveResolver<Result>;
    deprecated?: DeprecatedDirectiveResolver<Result>;
} & {
    [directiveName: string]: never;
};
