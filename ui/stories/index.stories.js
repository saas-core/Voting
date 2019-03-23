import React from "react";
import { storiesOf } from "@storybook/react";

import ObjectType from "../src/features/ObjectType";

storiesOf("Object Types", module)
  .add("Title", () => {
    return (
      <ObjectType
        name="Chief Executive Officer"
        resourceType="TITLE"
        abbreviation="CEO"
        description="The chief executive officer, or just chief executive, is the most senior corporate, executive, or administrative officer in charge of managing an organization – especially an independent legal entity such as a company or nonprofit institution."
        tags={["Leadership", "Executive Team"]}
      />
    );
  })
  .add("Term", () => {
    return (
      <ObjectType
        name="Mobile Device Management"
        resourceType="TERM"
        abbreviation="MDM"
        description="Mobile device management is software that allows IT administrators to control, secure and enforce policies on smartphones, tablets and other endpoints. The intent of MDM is to optimize the functionality and security of mobile devices within the enterprise while simultaneously protecting the corporate network."
        tags={["Leadership", "Executive Team"]}
      />
    );
  })
  .add("Event", () => {
    return (
      <ObjectType
        name="Convergence"
        resourceType="EVENT"
        description="A program packed with awesome content. The Cornerstone Convergence agenda will be jam-packed with over 50 sessions led by top-tier Cornerstone clients and partners. We've organized it into 12 tracks tailored for professionals at every organizational level."
        tags={["Leadership", "Executive Team"]}
      />
    );
  })
  .add("Person", () => {
    return (
      <ObjectType
        name="Cameron Lindsay"
        resourceType="PERSON"
        description="If the person decides to put a bio in here this is where that would display. They can add a bio from the profile page in their account settings."
        tags={["Chief Creative Officer", "Philz Coffee"]}
      />
    );
  })
  .add("Product", () => {
    return (
      <ObjectType
        name="Amplitude"
        resourceType="PRODUCT"
        description="Amplitude is the comprehensive product analytics software for web and mobile. Over 12000 companies use Amplitude to set product strategy, increase key conversions and such that i need to fill out the remainder of this sentance block perhaps just one more word will."
        tags={["Leadership", "Executive Team"]}
      />
    );
  })
  .add("Location", () => {
    return (
      <ObjectType
        name="Dusseldorf"
        resourceType="LOCATION"
        description="Dusseldorf is a conference room located on the 6th floor of the Santa Monica HQ. You will need badge access."
        tags={["Leadership", "Executive Team"]}
      />
    );
  })
  .add("Team", () => {
    return (
      <ObjectType
        name="Europe, Middle East & Africa"
        abbreviation="EMEA"
        resourceType="TEAM"
        description="EMEA (EMEIA if India is included) is a shorthand designation meaning Europe, the Middle East and Africa. It is used by institutions and governments, as well as in marketing and business."
        tags={["Leadership", "Executive Team"]}
      />
    );
  });
