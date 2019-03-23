import React from "react";
import { ApolloProvider } from "react-apollo";
import { createApolloClient } from "../graphql";
import SEO from "../components/seo";

const IndexPage = () => (
  <ApolloProvider client={createApolloClient()}>
    <SEO title="Home" keywords={[`jargon`, `application`, `react`]} />
  </ApolloProvider>
);

export default IndexPage;
