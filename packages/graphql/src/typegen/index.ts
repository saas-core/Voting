import { generate } from 'graphql-code-generator'
import * as path from 'path'
import * as fs from 'fs'
import { printSchemaFromInput } from './utils'

const services = [`core`]

async function main() {

  // Service Types
  await Promise.all(
    services.map(async svc => {
      const schema = printSchemaFromInput(svc)
      // write a generatedSchema file
      const outputBinding = path.resolve(`./src/${svc}/generatedSchema.graphql`)
      fs.writeFileSync(outputBinding, schema, `utf-8`)

      const config = {
        overwrite: true,
        schema: [`./src/${svc}/generatedSchema.graphql`],
        generates: {
          [`src/${svc}/types.ts`]: {
            plugins: [
              { add: `// THIS IS A GENERATED FILE` },
              `typescript-common`,
              `typescript-server`,
              `typescript-resolvers`,
            ],
          },
        },
      }

      const output = generate(config)

      function cleanup() {
        fs.unlinkSync(outputBinding)
      }

      return output.then(cleanup).catch(e => {
        console.error(e.message)
        cleanup()
      })
    })
  ).catch((e) => {
    console.error(e.message)
  })
}

main()
