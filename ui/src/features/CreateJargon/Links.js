import React, { Fragment } from "react";
import { Formik } from "formik";
import styled from "@emotion/styled";
import { StyledInput } from "../../components/Input";
import { LargeButton } from "../../components/Button";
import CreateJargonFormHeader from "./Header";

const FormSpacer = styled(`section`)`
  margin-bottom: 30px;
`;

export default function Links() {
  return (
    <section style={{ maxWidth: 520, margin: `0 auto`, paddingTop: 32 }}>
      <CreateJargonFormHeader
        title="Links"
        description="Links allow users to take action on an entry."
      />
      <Formik initialValues={{ entryName: `` }}>
        <Fragment>
          <FormSpacer>
            <StyledInput
              label="Website URL"
              name="webUrl"
              placeholder="www.company.com/important"
            />
          </FormSpacer>
          <FormSpacer>
            <StyledInput
              label="LinkedIn"
              name="linkedinUrl"
              placeholder="www.company.com/important"
            />
          </FormSpacer>
          <FormSpacer>
            <StyledInput
              label="Instagram"
              name="instagramUrl"
              placeholder="www.company.com/important"
            />
          </FormSpacer>
          <FormSpacer>
            <StyledInput
              label="Facebook"
              name="facebookUrl"
              placeholder="www.company.com/important"
            />
          </FormSpacer>
          <FormSpacer>
            <StyledInput
              label="Slack"
              name="slackUrl"
              placeholder="www.company.com/important"
            />
          </FormSpacer>
          <FormSpacer
            style={{ display: `flex`, justifyContent: `center`, width: `100%` }}
          >
            <LargeButton>Submit</LargeButton>
          </FormSpacer>
        </Fragment>
      </Formik>
    </section>
  );
}
