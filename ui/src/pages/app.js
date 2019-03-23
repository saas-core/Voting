import React from "react";
import { Router } from "@reach/router";
import { ApolloProvider } from "react-apollo";
import { createApolloClient } from "../graphql";
import AllJargonObjects from "../features/AllJargonObjects";
import Login from "../features/Login";
import Logout from "../features/Logout";
import BasicInformation from "../features/CreateJargon/BasicInformation";
import Associations from "../features/CreateJargon/Associations";
import ProtectedRoute from "../features/ProtectedRoute";
import AuthRedirect from "../features/AuthRedirect";
import SEO from "../components/seo";
import "../styles/global.css";
import Links from "../features/CreateJargon/Links";

const App = () => (
  <ApolloProvider client={createApolloClient()}>
    <SEO title="Home" keywords={[`jargon`, `application`, `react`]} />
    <Router>
      <Logout path="/app/logout" />
      <Login path="/app/login" />
      <ProtectedRoute component={AllJargonObjects} path="/app/all" />
      <ProtectedRoute component={BasicInformation} path="/app/create/basics" />
      <ProtectedRoute
        component={Associations}
        path="/app/create/associations/:jargonId"
      />
      <ProtectedRoute component={Links} path="/app/create/links/:jargonId" />
      <AuthRedirect path="/app/auth/redirect" />
    </Router>
  </ApolloProvider>
);

export default App;
