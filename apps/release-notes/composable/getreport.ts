import { gql } from '@apollo/client/core'
import { getClient } from './getClient'

export async function getReport (ghId: number[]) {
  const client = getClient()
  try {
    const result = await client.query({
      query: gql`
        query getRepositoryReleaseReports($repositoryGhId: [Int!]!) {
          repositoriesByGhId(ghIds: $repositoryGhId) {
            id
            releases(first: 10) {
              nodes {
                id
                title
                description
                startOn
                endOn
                state
                issues(first: 10) {
                  nodes {
                    id
                    title
                    number
                    htmlUrl
                    labels {
                      edges {
                        node {
                          id
                          name
                        }
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
        repositoryGhId: ghId
      }
    })
    const items = result.data.repositoriesByGhId[0].releases.nodes;
    const itemArray = Array.isArray(items) ? items : [];
    for (let i = 0; i < itemArray.length; i++) {
      const item = itemArray[i];
      // Access and process each item here
      console.log(item); // Assuming there's a 'name' field in your data
    }
    // console.log(result.data.repositoriesByGhId[0].releases.nodes);
    return result.data.repositoriesByGhId[0].releases;
  } catch (error) {
    console.error(error)
    throw error
  }
}
