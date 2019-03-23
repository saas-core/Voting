import * as faker from 'faker'

export const MockMutation = {
  createJargon: (_parent, { input }) => {
    return {
      id: faker.random.uuid(),
      name: input.name,
      description: input.description,
      abbreviation: input.abbreviation,
      resourceType: input.resourceType,
      tags: input.tags,
    }
  },
}
