import getIssue from './getIssues'
import { getOctokit } from '~/githubClient'
async function getWorkflows (owner: string, repo: string, runID: number) {
  const result = await getOctokit().request(
    'GET /repos/{owner}/{repo}/actions/runs/{runID}',
    {
      owner,
      repo,
      runID,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )

  return result
}

async function waitForSuccessStatus (
  owner: string,
  repo: string,
  runID: number,
  teamName: string
) {
  let attempts = 0
  const maxAttempts: number = 20
  const delay: number = 10000
  while (attempts < maxAttempts) {
    console.log('hello')
    const res = await getWorkflows(owner, repo, runID)
    const status = res.data.status
    console.log('status' + status)
    if (status === 'completed') {
      const issues = await getIssue(owner, repo, teamName)
      return issues
    }

    // Wait for a specified delay before checking again
    await new Promise(resolve => setTimeout(resolve, delay))

    attempts++
  }

  throw new Error(
    "Timeout: The status did not become 'success' within the specified number of attempts."
  )
}

export default waitForSuccessStatus
