import { gql } from '@apollo/client/core'
import { getClient } from './getClient'

export async function getReport (ghId: String, start: String, end: String) {
  const client = getClient()
  try {
    const result = await client.query({
      query: gql`
        query RepositoriesByGhId($workspaceID: ID!, $startCursor: String, $endCursor: String) {
          workspace(id: $workspaceID) {
            displayName
            releases(last: 20, before: $startCursor, after: $endCursor) {
              totalCount
              nodes {
                startOn
                endOn
                description
                id
                title
                state
                issues {
                  nodes {
                    id
                    title
                    number
                    htmlUrl
                    # labels {
                    #   edges {
                    #     node {
                    #       id
                    #       name
                    #     }
                    #   }
                    # }
                  }
                }
              }
              pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
              }
            }
          }
        }
      `,
      variables: {
        workspaceID: ghId,
        startCursor: start,
        endCursor: end
      }
    })
    console.log(result.data.workspace.releases)
    return (
      result.data.workspace.releases
    )
  } catch (error) {
    console.error(error)
    throw error
  }
}
