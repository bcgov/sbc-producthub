import { getOctokit } from '~/githubClient'

async function runWorkflow (owner: string, repo: string, runID: number) {
  return await getOctokit().request(
    'POST /repos/{owner}/{repo}/actions/runs/{runID}/rerun',
    {
      owner,
      repo,
      runID,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )
}

export default runWorkflow
