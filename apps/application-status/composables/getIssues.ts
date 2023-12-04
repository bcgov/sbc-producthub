import { getOctokit } from '~/githubClient'

async function getIssue (owner: string, repo: string, teamName: string) {
  const issues = await getOctokit().request('GET /repos/{owner}/{repo}/issues', {
    owner,
    repo,
    labels: teamName
  })
  return issues.data[0]
}

export default getIssue
