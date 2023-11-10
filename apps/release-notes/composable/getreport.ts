import { gql } from '@apollo/client/core'
import { getClient } from './getClient'

export async function getReport (
  ghId: string,
  start: string,
  end: string,
  state: string
) {
  const client = getClient()
  console.log(state, start, end)
  try {
    const result = await client.query({
      query: gql`
        query RepositoriesByGhId(
          $workspaceID: ID!
          $startCursor: String
          $endCursor: String
          $state: ReleaseState!
        ) {
          workspace(id: $workspaceID) {
            displayName
            releases(last: 20, before: $startCursor, after: $endCursor, state: { eq: $state }) {
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
        endCursor: end,
        state
      }
    })
    console.log('in getReport')
    console.log(result.data.workspace)
    return result.data.workspace.releases
  } catch (error) {
    console.error(error)
    throw error
  }
}
