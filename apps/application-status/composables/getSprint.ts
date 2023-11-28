import { gql } from '@apollo/client/core'
import { getClient } from './getClient'

export async function getSprint (
  workspaceID: string
//   start: string,
//   end: string,
//   state: string
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
            }
          }
        }
      `,
      variables: {
        workspaceID
      }
    })
    // console.log(result.data.workspace.sprints)
    return result.data.workspace.activeSprint
  } catch (error) {
    console.log(error)
  }
}
