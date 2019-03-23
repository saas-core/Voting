import { GraphQLSchema, GraphQLObjectType } from 'graphql';
/**
 * Create a GraphQLSchema from multiple SDL files
 */
export declare function getSchemaFromInput(input: any): GraphQLSchema;
/**
 * Print a GraphQL SDL from schema sdl files
 */
export declare function printSchemaFromInput(input: any): any;
/**
 * N.B. The code below for `filterUsableInterfaceImplementations` is taken from a library
 * called `graphql-transformer`
 * The original link to the code is here:
 * https://github.com/AEB-labs/graphql-transformer/blob/master/src/remove-unused-types.ts
 */
/**
 * Finds all object types that implement any of the interfaces reachable from any of the rootTypes
 * @param rootTypes types that are used fo reachability test
 * @param candidates the types which are filtered
 * @return the object types that are usable
 */
export declare function filterUsableInterfaceImplementations(candidates: GraphQLObjectType[], rootTypes: GraphQLObjectType[]): GraphQLObjectType[];
/**
 * N.B. The code below for `removeUnusedTypesFromSchema` is taken from a library
 * called `graphql-transformer`
 * The original link to the code is here:
 * https://github.com/AEB-labs/graphql-transformer/blob/master/src/remove-unused-types.ts
 */
export declare function removeUnusedTypesFromSchema(schema: GraphQLSchema): GraphQLSchema;
