import { Sprint, Issue } from '~/interface/interfaces'

/**
 * Cast the response from Zenhub to type Sprint
 * @param sprint
 * @param noReleases
 * @returns
 */
export function castingSprint (sprint: any, noReleases: any) {
  const res: Sprint = {
    closedIssuesCount: sprint.closedIssuesCount,
    completedPoints: sprint.completedPoints,
    createdAt: sprint.createdAt,
    description: sprint.description,
    endAt: sprint.endAt,
    id: sprint.id,
    name: sprint.name,
    startAt: sprint.startAt,
    state: sprint.state,
    totalPoints: sprint.totalPoints,
    updatedAt: sprint.updatedAt,
    numberOfRelease: noReleases,
    issues: sprint.issues,
    scopeChange: {
      totalCount: sprint.scopeChange.totalCount,
      issues: castingIssues(sprint.scopeChange.nodes)
    }
  }
  return res
}

/**
 * Casting the response from Zenhub to type Issue
 * @param issues
 * @returns
 */
function castingIssues (issues: any) {
  const res: Issue[] = []
  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i].issue
    res.push({
      number: issue.number,
      htmlUrl: issue.htmlUrl,
      id: issue.id
    })
  }
  return res
}

export function castingReleases (releases: any) {
  const res = []
  for (let i = 0; i < releases.length; i++) {
    const release = releases[i]
    res.push({
      closeAt: release.closeAt,
      issues: release.issues.totalCount,
      title: release.title
    })
  }
  return res
}
