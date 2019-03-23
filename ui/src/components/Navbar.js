import React from "react";

function Avatar({ avatarUrl, name }) {
  return (
    <div style={{ height: 40, width: 40 }}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar Url"
          style={{ maxWidth: `100%`, height: `auto`, borderRadius: `50%` }}
        />
      ) : (
        <div
          style={{
            borderRadius: `50%`,
            backgroundColor: `#F5F5F5`,
            height: `100%`,
            display: `flex`,
            justifyContent: `center`
          }}
        >
          <div
            style={{
              alignSelf: `center`,
              color: `black`,
              fontSize: 14,
              fontFamily: `Lato`,
              fontWeight: `bold`
            }}
          >
            {name.split(" ")[0][0]}
            {name.split(" ")[1][0]}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar({ avatarUrl, name }) {
  return (
    <nav style={{ height: 81, display: `flex`, padding: "0 50px" }}>
      <div style={{ alignSelf: "center", flex: `1 0 0px` }}>
        <button
          style={{
            background: "none",
            backgroundColor: "transparent",
            fontWeight: `bold`,
            color: "black",
            fontFamily: `Lato`,
            fontSize: 20,
            border: `none`,
            padding: 0,
            margin: 0
          }}
        >
          Jargon
        </button>
      </div>
      <div style={{ alignSelf: "center" }}>
        <Avatar name={name} avatarUrl={avatarUrl} />
      </div>
    </nav>
  );
}
