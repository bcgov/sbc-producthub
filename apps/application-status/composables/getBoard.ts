import { gql } from '@apollo/client/core'
import { getClient } from './getClient'
/**
 * Retrieve boardId via board name
 * @param teamName: string
 * @returns boardID: string
 */
export async function getBoard (
  teamName: string
) {
  const client = getClient()
  try {
    const result = await client.query({
      query: gql`
        query searchBoard($teamName: String!) {
          viewer {
            id
            searchWorkspaces(query: $teamName) {
              nodes {
                id
                name
              }
            }
          }
        }
      `,
      variables: {
        teamName
      }
    })
    return result.data.viewer.searchWorkspaces.nodes[0].id
  } catch (error) {
    console.log(error)
  }
}
