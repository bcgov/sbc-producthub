import { getIssueGithub } from './getIssues'
import { getOctokit } from '~/githubClient'

/**
 * Get the workflow by runID
 * @param owner
 * @param repo
 * @param runID
 * @returns Workflpw data
 */
async function getWorkflows (owner: string, repo: string, runID: number) {
  const result = await getOctokit().request(
    'GET /repos/{owner}/{repo}/actions/runs/{runID}',
    {
      owner,
      repo,
      runID
    }
  )

  return result
}

/**
 * Wait for the workflow to finish running then get the latest issue
 */
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
    const res = await getWorkflows(owner, repo, runID)
    const status = res.data.status
    if (status === 'completed') {
      const issues = await getIssueGithub(owner, repo, teamName)
      return issues.body
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
