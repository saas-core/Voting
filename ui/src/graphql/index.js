import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import {
  fragmentCacheRedirect,
  fragmentLinkState
} from "apollo-link-state-fragment";
import apolloLogger from "apollo-link-logger";
import { BatchHttpLink } from "apollo-link-batch-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

/* set up apollo graphql client */
const graphqlEndpoint = (useWebSocket = false) =>
  useWebSocket
    ? `${process.env.NODE_ENV === `production` ? `wss` : `ws`}://${
        process.env.GATSBY_DASHBOARD_GRAPHQL_URL
      }`
    : `${process.env.NODE_ENV === `production` ? `https` : `http`}://${
        process.env.GATSBY_DASHBOARD_GRAPHQL_URL
      }`;

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      ...fragmentCacheRedirect()
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

/* create apollo client */
export function createApolloClient() {
  let headers = {};
  const authToken = localStorage.getItem(`jargon:token`);

  if (authToken) {
    headers = {
      Authorization: `Bearer ${authToken}`
    };
  }

  const batchHttpLink = new BatchHttpLink({
    uri: graphqlEndpoint(),
    headers
  });

  let links = [errorLink, fragmentLinkState(cache), batchHttpLink];

  if (process.env.NODE_ENV === `development`) {
    links = [apolloLogger, ...links];
  }

  const link = ApolloLink.from(links);

  return new ApolloClient({
    cache,
    link
  });
}

export const apolloCache = cache;
