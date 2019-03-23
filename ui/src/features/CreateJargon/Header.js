import React from "react";
import styled from "@emotion/styled";

const Header = styled(`h1`)`
  color: #313e49;
  font-family: Lato;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 0.5px;
  line-height: 40px;
  margin: 0;
`;

const FormText = styled(`p`)`
  color: #677580;
  font-family: Roboto;
  font-size: 17px;
  line-height: 25px;
`;

export default function CreateJargonFormHeader({ title, description }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <Header>{title}</Header>
      <FormText>{description}</FormText>
    </div>
  );
}
