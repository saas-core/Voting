import React, { useEffect } from "react";
import qs from "query-string";
import PropTypes from "prop-types";
import { Redirect } from "@reach/router";

export default function AuthRedirect({ location }) {
  const searchQuery = location.search;

  const query = qs.parse(searchQuery);

  const { id, token, loginRedirectUrl } = query;
  useEffect(() => {
    localStorage.setItem(`jargon:token`, token);
    localStorage.setItem(`jargon:userid`, id);
  }, [query.id, query.token]);

  if (token) {
    if (loginRedirectUrl) {
      return <Redirect to={loginRedirectUrl} noThrow />;
    }

    return <Redirect to="/app/all" noThrow />;
  } else {
    return <Redirect to="/app/login" noThrow />;
  }
}

AuthRedirect.propTypes = {
  location: PropTypes.object
};
