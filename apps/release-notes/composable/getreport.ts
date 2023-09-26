import { gql } from "@apollo/client/core";
import getClient from "./getClient";

export async function getReport(ghId: number[]) {
  const client = await getClient()
  try {
    const result = await client.query({
      query: gql`
        query getRepositoryReleaseReports($repositoryGhId: [Int!]!) {
          repositoriesByGhId(ghIds: $repositoryGhId) {
            id
            releases(first: 50) {
              nodes {
                id
                title
                description
                startOn
                endOn
                issues(first: 50) {
                  nodes {
                    id
                    title
                    number
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        repositoryGhId: ghId,
      },
    });

    return result.data.repositoriesByGhId[0].releases;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
