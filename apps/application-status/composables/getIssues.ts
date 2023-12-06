import { getOctokit } from '~/githubClient'
import { gql } from "@apollo/client/core";
import { getClient } from "./getClient";

export async function getIssueGithub (owner: string, repo: string, teamName: string) {
  const issues = await getOctokit().request('GET /repos/{owner}/{repo}/issues', {
    owner,
    repo,
    labels: teamName
  })
  return issues.data[0]
}

export async function getIssueZenhub(workspaceID: string) {
  const client = getClient();
  try {
    const result = await client.query({
      query: gql`
        query Workspace($workspaceID: ID!) {
          workspace(id: $workspaceID) {
            activeSprint {
              issues {
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
      `,
      variables: {
        workspaceID,
      },
    });
    return result.data.workspace.activeSprint.issues.nodes;
  } catch (error) {
    console.log(error);
  }
}
