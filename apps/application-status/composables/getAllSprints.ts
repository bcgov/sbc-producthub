import { gql } from '@apollo/client/core'
import { getClient } from './getClient'

/**
 * Get the active sprint by teams, and number of scope changes within that sprint.
 * @param workspaceID
 * @returns
 */
export async function getAllSprints (workspaceID: string, startCursor: string, endCursor: string) {
  const client = getClient()
  try {
    const result = await client.query({
      query: gql`
        query Workspace(
          $workspaceID: ID!
          $endCursor: String!
          $startCursor: String!
        ) {
          workspace(id: $workspaceID) {
            sprints(first: 2, after: $endCursor, before: $startCursor) {
              totalCount
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
              nodes {
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
                  nodes {
                    labels {
                      nodes {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        workspaceID,
        endCursor,
        startCursor
      }
    })
    return result.data.workspace.sprints
  } catch (error) {
    console.log(error)
  }
}
