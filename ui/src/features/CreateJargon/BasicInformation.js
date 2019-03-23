import React, { Fragment } from "react";
import { Formik } from "formik";
import styled from "@emotion/styled";
import { StyledTextArea, StyledInput } from "../../components/Input";
import { LargeButton } from "../../components/Button";
import CreateJargonFormHeader from "./Header";

const FormSpacer = styled(`section`)`
  margin-bottom: 30px;
`;

export default function BasicInformation() {
  return (
    <section style={{ maxWidth: 520, margin: `0 auto`, paddingTop: 32 }}>
      <CreateJargonFormHeader
        title="The Basics"
        description="Just fill out the form below and we will provide you with the best
          offers on the market."
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
          <FormSpacer>
            <StyledInput
              label="Abbreviation"
              name="abbreviation"
              placeholder="Ex. CEO"
            />
          </FormSpacer>
          <FormSpacer>
            <StyledTextArea label="Definition" name="description" />
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
