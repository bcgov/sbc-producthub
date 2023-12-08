import { gql } from '@apollo/client/core'
import { getClient } from './getClient'

/**
 * Get total releases on Zenhub
 * @param workspaceID 
 * @returns 
 */
export async function getReleases (
  workspaceID: string
) {
  const client = getClient()
  try {
    const result = await client.query({
      query: gql`
        query Workspace($workspaceID: ID!) {
          workspace(id: $workspaceID) {
            releases (last: 100){
              totalCount
              nodes {
                closedAt
                title
                issues {
                  totalCount
                }
              }
            }
          }
        }
      `,
      variables: {
        workspaceID
      }
    })
    return result.data.workspace.releases
  } catch (error) {
    console.log(error)
  }
}
