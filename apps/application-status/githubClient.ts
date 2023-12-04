import { Octokit } from 'octokit'
export function getOctokit () {
  const config = useRuntimeConfig()
  const octokit = new Octokit({
    auth: config.public.githubToken
  })
  return octokit
}
