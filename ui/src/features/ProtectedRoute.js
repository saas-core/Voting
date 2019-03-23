import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Redirect } from "@reach/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Navbar from "../components/Navbar";

const USER_INFO = gql`
  query UserInfo {
    currentUser {
      id
      name
      email
      displayName
      timezone
      timezoneLabel
      avatarUrl
    }
  }
`;

function ProtectedRoute({ component: Component, ...rest }) {
  if (!localStorage.getItem(`jargon:token`)) {
    // If we’re not logged in, redirect to the home page.
    return <Redirect to={`/app/login?loginRedirectUrl=${rest.uri}`} noThrow />;
  }

  return (
    <Query query={USER_INFO}>
      {({ data, loading, error }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <p>Error: {error.message}</p>;
        }

        const currentUser = data && data.currentUser;

        if (!currentUser) {
          return <Redirect to="/app/logout" noThrow />;
        }

        return (
          <Fragment>
            <Navbar {...currentUser} />
            <Component {...rest} />
          </Fragment>
        );
      }}
    </Query>
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired
};

export default ProtectedRoute;
