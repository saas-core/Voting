import React, { Fragment, useCallback } from "react";
import * as uuid from "uuid/v4";

export default function Login() {
  const login = useCallback(() => {
    return window.location.assign(
      `http://localhost:4001/oauth/slack?csrfToken=${uuid()}`
    );
  }, []);

  return (
    <Fragment>
      <h1>Login</h1>
      <button onClick={login}>Log In with Slack</button>
    </Fragment>
  );
}
