import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import ObjectType from "../ObjectType";

function UserDisplay({ user }) {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img src={user.avatarUrl} alt="User Avatar URL" style={{ width: 60, height: 60 }} />
      </div>
      <div style={{ alignSelf: "center", marginLeft: 10 }}>
        <p style={{ margin: 0 }}>ID: {user.id}</p>
        <p style={{ margin: 0 }}>Name: {user.name}</p>
        <p style={{ margin: 0 }}>Display Name: {user.displayName}</p>
        <p style={{ margin: 0 }}> Email: {user.email}</p>
        <p style={{ margin: 0 }}>Timezone: {user.timezone}</p>
        <p style={{ margin: 0 }}>Timezone Label: {user.timezoneLabel}</p>
      </div>
    </div>
  );
}

const CREATE_PERSON_JARGON = gql`
  mutation createJargon($input: JargonCreateInput) {
    createJargon(input: $input) {
      id
    }
  }
`;

let CreatePersonJargon = function CreatePersonJargon({ user, mutate }) {
  return (
    <button
      onClick={() => {
        return mutate({
          variables: {
            input: {
              name: user.name,
              abbreviation: user.displayName,
              resourceType: `PERSON`,
              description: `Imported from Slack`
            }
          }
        }).then(() => {
          return window.location.reload();
        });
      }}
    >
      Create a Jargon Person Type
    </button>
  );
};

CreatePersonJargon = graphql(CREATE_PERSON_JARGON)(CreatePersonJargon);

const SLACK_TEAM_USERS = gql`
  query slackTeamUsers {
    slackTeamUsers {
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

let SlackTeam = function SlackTeam({ data }) {
  const slackTeamUsers = data && data.slackTeamUsers;

  if (data && data.loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1> Slack Team Members</h1>
      {slackTeamUsers.map(user => {
        return (
          <div style={{ marginBottom: 16, display: "flex" }}>
            <UserDisplay user={user} />
            <div>
              <CreatePersonJargon user={user} />
            </div>
          </div>
        );
      })}
    </>
  );
}

SlackTeam = graphql(SLACK_TEAM_USERS)(SlackTeam);

const ALL_JARGON_OBJECTS = gql`
  query allJargonObjects {
    allJargonObjects {
      id
      name
      abbreviation
      description
      resourceType
      tags {
        key
        value
      }
    }
  }
`;

function AllJargonObjects({ data }) {
  const jargonObjects = data && data.allJargonObjects;

  if (data && data.loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {jargonObjects.map(({ id, tags, ...rest }) => {
        return (
          <ObjectType
            key={id}
            {...rest}
            tags={(tags || []).map(tag => {
              return tag.value;
            })}
          />
        );
      })}
      <SlackTeam />
    </>
  );
}

export default graphql(ALL_JARGON_OBJECTS)(AllJargonObjects);
