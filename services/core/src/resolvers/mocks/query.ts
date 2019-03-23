import * as faker from 'faker'

function jargon(jargonItem) {
  return {
    id: faker.random.uuid(),
    ...jargonItem,
  }
}

function tags() {
  return [
    {
      key: 'Leadership',
      value: 'Leadership',
    },
    {
      key: 'Executive Team',
      value: 'Executive Team',
    },
  ]
}

export const MockQuery = {
  ping: () => 'Ok!',
  allJargonObjects: () => [
    jargon({
      name: 'Chief Executive Officer',
      resourceType: 'TITLE',
      abbreviation: 'CEO',
      description:
        'The chief executive officer, or just chief executive, is the most senior corporate, executive, or administrative officer in charge of managing an organization – especially an independent legal entity such as a company or nonprofit institution.',
      tags: tags(),
    }),
    jargon({
      name: 'Mobile Device Management',
      resourceType: 'TERM',
      abbreviation: 'MDM',
      description:
        'Mobile device management is software that allows IT administrators to control, secure and enforce policies on smartphones, tablets and other endpoints. The intent of MDM is to optimize the functionality and security of mobile devices within the enterprise while simultaneously protecting the corporate network.',
      tags: tags(),
    }),
    jargon({
      name: 'Convergence',
      resourceType: 'EVENT',
      description:
        'A program packed with awesome content. The Cornerstone Convergence agenda will be jam-packed with over 50 sessions led by top-tier Cornerstone clients and partners. We\'ve organized it into 12 tracks tailored for professionals at every organizational level.',
      tags: tags(),
    }),
    jargon({
      name: 'Cameron Lindsay',
      resourceType: 'PERSON',
      description:
        'If the person decides to put a bio in here this is where that would display. They can add a bio from the profile page in their account settings.',
      tags: tags(),
    }),
    jargon({
      name: 'Amplitude',
      resourceType: 'PRODUCT',
      description:
        'Amplitude is the comprehensive product analytics software for web and mobile. Over 12000 companies use Amplitude to set product strategy, increase key conversions and such that i need to fill out the remainder of this sentance block perhaps just one more word will.',
      tags: tags(),
    }),
    jargon({
      name: 'Dusseldorf',
      resourceType: 'LOCATION',
      description:
        'Dusseldorf is a conference room located on the 6th floor of the Santa Monica HQ. You will need badge access.',
      tags: tags(),
    }),
    jargon({
      name: 'Europe, Middle East & Africa',
      resourceType: 'TEAM',
      abbreviation: 'EMEA',
      description:
        'EMEA (EMEIA if India is included) is a shorthand designation meaning Europe, the Middle East and Africa. It is used by institutions and governments, as well as in marketing and business.',
      tags: tags(),
    }),
  ],
}
