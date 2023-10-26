import { gql } from '@apollo/client/core'
import { getClient } from './getClient'

export async function getReport (ghId: String, start: String) {
  const client = getClient()
  try {
    const result = await client.query({
      query: gql`
        query RepositoriesByGhId($workspaceID: ID!, $startCursor: String) {
          workspace(id: $workspaceID) {
            displayName
            releases(last: 10, before: $startCursor) {
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
                startCursor
              }
            }
          }
        }
      `,
      variables: {
        workspaceID: ghId,
        startCursor: start
      }
    })
    // console.log(result)
    return (
      result.data.workspace.releases
    )
  } catch (error) {
    console.error(error)
    throw error
  }
}
