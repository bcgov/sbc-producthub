import { gql } from '@apollo/client/core'
import { getClient } from './getClient'

/**
 * Get the active sprint on Zenhub, and their scope changes within that sprint
 * @param workspaceID
 * @returns
 */
export async function getSprint (
  workspaceID: string
) {
  const client = getClient()
  try {
    const result = await client.query({
      query: gql`
        query Workspace($workspaceID: ID!) {
          workspace(id: $workspaceID) {
            activeSprint {
              closedIssuesCount
              completedPoints
              createdAt
              description
              endAt
              id
              name
              startAt
              state
              totalPoints
              updatedAt
              issues {
                totalCount
              }
              scopeChange {
                totalCount
                nodes {
                  issue {
                    htmlUrl
                    id
                    number
                  }
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
    return result.data.workspace.activeSprint
  } catch (error) {
    console.log(error)
  }
}
