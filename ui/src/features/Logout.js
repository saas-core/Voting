import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { Redirect } from "@reach/router";

export default function Logout() {
  useEffect(() => {
    localStorage.setItem(`jargon:token`, ``);
    localStorage.setItem(`jargon:userid`, ``);
    navigate(`/app/login`);
  }, []);

  return <Redirect to="/app/login" noThrow />;
}
