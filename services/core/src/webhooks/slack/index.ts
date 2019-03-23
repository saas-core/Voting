// import { prisma } from '../../generated/prisma-client'
// import * as fetch from 'isomorphic-fetch'
// import { JargonObjectType } from '@jargon-pkg/graphql'

// export const jargonSlackAll = async (req, res) => {
//   try {
//     const allJargonObjects = await prisma.jargons()
//     const slackReqObj = req.body
//     const response = {
//       response_type: 'in_channel',
//       channel: slackReqObj.channel_id,
//       text: 'Here are all the terms in Jargon',
//       attachments: allJargonObjects.map(jargon => {
//         const title = `*${jargon.abbreviation}*, _${jargon.name}_ - ${
//           jargon.resourceType
//         }`

//         const tags = ((jargon && jargon.tags) || [])
//           .map(tag => tag.value)
//           .join(',')
//         const description = jargon.description
//         return {
//           text: `${title}\nDescription:\n${description}\nTags: ${tags}`,
//           color: '#2c963f',
//           attachment_type: 'default',
//         }
//       }),
//     }

//     fetch(slackReqObj.response_url, {
//       method: 'POST',
//       body: JSON.stringify(response),
//     }).catch(e => {
//       console.error(e.message)
//     })

//     return res.sendStatus(200)
//   } catch (err) {
//     console.error(err)
//     return res.status(500).send('Something blew up. We\'re looking into it.')
//   }
// }

// export const jargonByFilter = async (req, res) => {
//   try {
//     const slackReqObj = req.body
//     console.log(slackReqObj)

//     const argues = req.body.text
//     const array = argues.split(' ')

//     const filterType = array[0]
//     const searchText = array[1]

//     let jargons
//     switch (filterType) {
//       case 'name':
//         jargons = await prisma.jargons({ where: { name: searchText } })
//         break
//       case 'resourceType':
//         jargons = await prisma.jargons({
//           where: { resourceType: searchText as JargonObjectType },
//         })
//         break
//       case 'abbreviation':
//         jargons = await prisma.jargons({ where: { abbreviation: searchText } })
//         break
//       default:
//         jargons = []
//         break
//     }

//     const response = {
//       response_type: 'in_channel',
//       channel: slackReqObj.channel_id,
//       text: `Here are all the terms in Jargon for ${searchText} by ${filterType}`,
//       attachments: jargons.map(jargon => {
//         const title = `*${jargon.abbreviation}*, _${jargon.name}_ - ${
//           jargon.resourceType
//         }`

//         const tags = ((jargon && jargon.tags) || [])
//           .map(tag => tag.value)
//           .join(',')
//         const description = jargon.description
//         return {
//           text: `${title}\nDescription:\n${description}\nTags: ${tags}`,
//           color: '#2c963f',
//           attachment_type: 'default',
//         }
//       }),
//     }
//     fetch(slackReqObj.response_url, {
//       method: 'POST',
//       body: JSON.stringify(response),
//     }).catch(e => {
//       console.error(e.message)
//     })
//     return res.sendStatus(200)
//   } catch (err) {
//     console.error(err)
//     return res.status(500).send('Something blew up. We\'re looking into it.')
//   }
// }
