import { gql } from '@apollo/client/core'
import { getClient } from './getClient'

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
