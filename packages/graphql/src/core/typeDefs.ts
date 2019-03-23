import { readFileSync } from 'fs'

export const coreTypeDefs = readFileSync(__dirname + '/schema.graphql', 'utf-8')
