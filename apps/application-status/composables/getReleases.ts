import { gql } from '@apollo/client/core'
import { getClient } from './getClient'

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
    // console.log(result.data.workspace.sprints)
    return result.data.workspace.releases
  } catch (error) {
    console.log(error)
  }
}
