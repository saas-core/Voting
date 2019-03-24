import * as express from "express";
import { createGraphQLServer, coreTypeDefs } from "@voting-pkg/graphql";
import { json, urlencoded } from "body-parser";
import { prisma } from "./generated/prisma-client";
import createContext from "./resolvers/context";
import createResolvers from "./resolvers";
import { DataLayer } from "./datalayer";
import { REDIS_URL } from "./constants";
import logger from "./logger";

const app = express();

const PORT = 4001;

app.use(json());

const datalayer = new DataLayer();

datalayer
  .initialize({
    redisConnectorOpts: {
      REDIS_URL
    }
  })
  .then(({ redis }) => {
    // Entry point to the Slack OAuth flow
    // Given a csrfToken, redirect to the
    // Slack OAuth process

    // Entry point to the Slack OAuth Callback flow
    const resolvers = createResolvers();

    const context = createContext({ db: prisma });

    createGraphQLServer({
      app,
      port: PORT,
      resolvers,
      context,
      typeDefs: [coreTypeDefs].join(""),
      logger: logger
    });
  });
