import { Sprint } from '~/interface/interfaces'

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
    numberOfRelease: noReleases
  }
  return res
}

export function castingReleases (releases: any) {
  const res = []
  for (let i = 0; i < releases.length; i++) {
    const release = releases[i]
    res.push({
      closeAt: release.closeAt,
      issues: release.issues.totalCount
    })
  }
  return res
}
