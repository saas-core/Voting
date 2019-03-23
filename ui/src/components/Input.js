import React from "react";
import Input from "@saascore/forms/lib/Input";
import TextArea from "@saascore/forms/lib/TextArea";
import { css, cx } from "emotion";

const inputClass = css`
  height: 60px;
  background-color: #f5f9ff;
  border: none;
  width: 100%;
  padding: 0 20px;
  font-size: 15px;
  line-height: 25px;
  color: #313e49;
  font-family: Roboto;
  max-width: 480px;
`;

const labelClassName = css`
  color: #313e49;
  font-family: Roboto;
  font-size: 15px;
  font-weight: bold;
  line-height: 25px;
  margin-bottom: 10px;
  display: flex;
`;

export function StyledTextArea(props) {
  return (
    <TextArea
      className={cx(
        inputClass,
        css`
          min-height: 150px;
        `
      )}
      labelClassName={labelClassName}
      {...props}
    />
  );
}

export function StyledInput(props) {
  return (
    <Input className={inputClass} labelClassName={labelClassName} {...props} />
  );
}
