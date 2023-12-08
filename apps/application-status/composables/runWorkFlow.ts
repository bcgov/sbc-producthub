import { getOctokit } from '~/githubClient'

/**
 * Run the workflow by runID
 * @param owner 
 * @param repo 
 * @param runID 
 * @returns 
 */
async function runWorkflow (owner: string, repo: string, runID: number) {
  return await getOctokit().request(
    'POST /repos/{owner}/{repo}/actions/runs/{runID}/rerun',
    {
      owner,
      repo,
      runID
    }
  )
}

export default runWorkflow
