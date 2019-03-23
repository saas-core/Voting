import React from "react";
import styled from "@emotion/styled";

const tagColors = {
  PERSON: {
    backgroundColor: `#36c5f0`,
    color: `white`
  },
  TITLE: {
    backgroundColor: "#1264A3",
    color: `white`
  },
  TERM: {
    backgroundColor: "#42B983",
    color: `white`
  },
  EVENT: {
    backgroundColor: "#7C3085",
    color: `white`
  },
  PRODUCT: {
    backgroundColor: "#E01E5A",
    color: `white`
  },
  LOCATION: {
    backgroundColor: "#4A154B",
    color: `white`
  },
  TEAM: {
    backgroundColor: "#ECB22E",
    color: `white`
  }
};

export const TagText = styled(`p`)`
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 10px;
  line-height: 13px;
  margin: 0;
  text-align: center;
`;

export const TagContainer = styled("div")`
  border-radius: 3px;
  padding: 4px 10px;
  background-color: ${props => {
    return tagColors[props.resourceType].backgroundColor || "white";
  }};
  color: ${props => {
    return tagColors[props.resourceType].color || "white";
  }};
`;

export default function Tag({ children, resourceType }) {
  return (
    <TagContainer resourceType={resourceType}>
      <TagText>{children}</TagText>
    </TagContainer>
  );
}
