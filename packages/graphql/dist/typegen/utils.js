"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const lodash_1 = require("lodash");
const graphql_1 = require("graphql");
const fs_1 = require("fs");
/**
 * Create a GraphQLSchema from multiple SDL files
 */
function getSchemaFromInput(input) {
    const schemaPath = `./src/${input}/schema.graphql`;
    const sdl = fs_1.readFileSync(path.resolve(schemaPath), `utf-8`);
    const schema = removeUnusedTypesFromSchema(graphql_1.buildSchema(sdl));
    return schema;
}
exports.getSchemaFromInput = getSchemaFromInput;
/**
 * Print a GraphQL SDL from schema sdl files
 */
function printSchemaFromInput(input) {
    const schemaPath = `./src/${input}/schema.graphql`;
    const sdl = fs_1.readFileSync(path.resolve(schemaPath), `utf-8`);
    const schema = removeUnusedTypesFromSchema(graphql_1.buildSchema(sdl));
    return graphql_1.printSchema(schema);
}
exports.printSchemaFromInput = printSchemaFromInput;
/**
 * N.B. The code below for `findAllReachableInterfaces` is taken from a library
 * called `graphql-transformer`
 * The original link to the code is here:
 * https://github.com/AEB-labs/graphql-transformer/blob/master/src/remove-unused-types.ts
 */
/**
 * Finds all interface types that are reachable through any of the given types
 */
function findAllReachableInterfaces(types) {
    const visitedTypes = new Set();
    const interfaces = new Set();
    function visitType(type) {
        type = graphql_1.getNamedType(type);
        if (visitedTypes.has(type)) {
            return;
        }
        visitedTypes.add(type);
        if (type instanceof graphql_1.GraphQLUnionType) {
            for (const option of type.getTypes()) {
                visitType(option);
            }
        }
        else if (type instanceof graphql_1.GraphQLInterfaceType ||
            type instanceof graphql_1.GraphQLObjectType) {
            if (type instanceof graphql_1.GraphQLInterfaceType) {
                interfaces.add(type);
            }
            for (const field of lodash_1.values(type.getFields())) {
                visitType(field.type);
            }
        }
    }
    for (const type of types) {
        visitType(type);
    }
    return interfaces;
}
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
function filterUsableInterfaceImplementations(candidates, rootTypes) {
    const reachableInterfaces = findAllReachableInterfaces(rootTypes);
    const implementations = new Set();
    let hasFoundNewInterfaces = false;
    do {
        const newImplementations = candidates.filter(objectType => objectType
            .getInterfaces()
            .some(implementedInterface => reachableInterfaces.has(implementedInterface)));
        for (const impl of newImplementations) {
            implementations.add(impl);
        }
        // we might have introduced some new fields that make use of interfaces which need to be added to reachableInterfaces
        const newInterfaces = findAllReachableInterfaces(newImplementations);
        hasFoundNewInterfaces = false;
        for (const newlyFoundInterface of Array.from(newInterfaces)) {
            if (!reachableInterfaces.has(newlyFoundInterface)) {
                // found some new interfaces, so trigger a new round
                hasFoundNewInterfaces = true;
                reachableInterfaces.add(newlyFoundInterface);
            }
        }
    } while (hasFoundNewInterfaces);
    return Array.from(implementations);
}
exports.filterUsableInterfaceImplementations = filterUsableInterfaceImplementations;
/**
 * N.B. The code below for `removeUnusedTypesFromSchema` is taken from a library
 * called `graphql-transformer`
 * The original link to the code is here:
 * https://github.com/AEB-labs/graphql-transformer/blob/master/src/remove-unused-types.ts
 */
function removeUnusedTypesFromSchema(schema) {
    const rootTypes = lodash_1.compact([
        schema.getQueryType(),
        schema.getMutationType(),
        schema.getSubscriptionType(),
    ]);
    const objectTypes = lodash_1.values(schema.getTypeMap()).filter(type => type instanceof graphql_1.GraphQLObjectType);
    return new graphql_1.GraphQLSchema({
        query: schema.getQueryType(),
        mutation: schema.getMutationType() || undefined,
        subscription: schema.getSubscriptionType() || undefined,
        directives: Array.from(schema.getDirectives()),
        types: filterUsableInterfaceImplementations(objectTypes, rootTypes),
    });
}
exports.removeUnusedTypesFromSchema = removeUnusedTypesFromSchema;
//# sourceMappingURL=utils.js.map