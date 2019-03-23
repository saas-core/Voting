import { prisma } from '../generated/prisma-client'

async function main() {
  // Create Jargon

  const jargon = await prisma.createJargon({
    name: 'Chief Executive Officer',
    description:
      'The chief executive officer (CEO),[1] or just chief executive (CE), is the most senior corporate, executive, or administrative officer in charge of managing an organization – especially an independent legal entity such as a company or nonprofit institution.',
    resourceType: 'TERM',
    abbreviation: 'CEO',
    tags: ['Boss'],
  })

  console.log('Jargon Created: ', jargon)

  // Fetch

  const jargonFetched = await prisma.jargon({
    id: jargon.id,
  })

  console.log('Jargon Fetched: ', jargonFetched)

  // Update

  const jargonUpdated = await prisma.updateJargon({
    where: {
      id: jargonFetched.id,
    },
    data: {
      abbreviation: 'C.E.O',
    },
  })

  console.log('Jargon Updated: ', jargonUpdated)

  // Delete

  const jargonDeleted = await prisma.deleteJargon({
    id: jargonUpdated.id,
  })

  console.log('Jargon Deleted', jargonDeleted)
}

main()
  .then(() => {
    console.log('DONE')
  })
  .catch(e => {
    console.error(e)
  })
