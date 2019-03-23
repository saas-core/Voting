import styled from "@emotion/styled";

const BaseButton = styled(`button`)`
  font-family: Lato;
`;

export const LargeButton = styled(BaseButton)`
  height: 70px;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  line-height: 25px;
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #685FE3;
  cursor: pointer;
  :hover {
    opacity: 0.8
  }
`;
