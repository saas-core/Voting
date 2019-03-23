import React, { Fragment } from "react";
import { Formik } from "formik";
import styled from "@emotion/styled";
import { StyledInput } from "../../components/Input";
import { LargeButton } from "../../components/Button";
import CreateJargonFormHeader from "./Header";

const FormSpacer = styled(`section`)`
  margin-bottom: 30px;
`;

export default function Associations() {
  return (
    <section style={{ maxWidth: 520, margin: `0 auto`, paddingTop: 32 }}>
      <CreateJargonFormHeader
        title="Associations"
        description="Associations is a way to tie an entry to a person at your organization. This can be the leader, owner or resident expert."
      />
      <Formik initialValues={{ entryName: `` }}>
        <Fragment>
          <FormSpacer>
            <StyledInput
              label="Entry Name"
              name="entryName"
              placeholder="Ex. Chief Executive Officer"
            />
          </FormSpacer>
          <FormSpacer
            style={{ display: `flex`, justifyContent: `center`, width: `100%` }}
          >
            <LargeButton>Continue</LargeButton>
          </FormSpacer>
        </Fragment>
      </Formik>
    </section>
  );
}
