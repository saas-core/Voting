"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_code_generator_1 = require("graphql-code-generator");
const path = require("path");
const fs = require("fs");
const utils_1 = require("./utils");
const services = [`core`];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Service Types
        yield Promise.all(services.map((svc) => __awaiter(this, void 0, void 0, function* () {
            const schema = utils_1.printSchemaFromInput(svc);
            // write a generatedSchema file
            const outputBinding = path.resolve(`./src/${svc}/generatedSchema.graphql`);
            fs.writeFileSync(outputBinding, schema, `utf-8`);
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
            };
            const output = graphql_code_generator_1.generate(config);
            function cleanup() {
                fs.unlinkSync(outputBinding);
            }
            return output.then(cleanup).catch(e => {
                console.error(e.message);
                cleanup();
            });
        }))).catch((e) => {
            console.error(e.message);
        });
    });
}
main();
//# sourceMappingURL=index.js.map