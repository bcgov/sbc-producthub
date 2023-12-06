import { Release } from '~/interface/interfaces'
export function filterReleasesByDate (releases: any, startAt: any, endAt: any) {
  const releasesWithinDateRange =
      releases.nodes.filter((release: any) => {
        const closedAt = new Date(release.closedAt)
        const startDate = new Date(startAt)
        const endDate = new Date(endAt)

        return closedAt >= startDate && closedAt <= endDate
      })
  return releasesWithinDateRange
}

export function filterReleaseByTeam (releases: Release[], team: string) {
  console.log(releases)
  const releaseHasName = releases.filter((release: Release) => {
    const title = release.title
    return title.toLowerCase().includes(team)
  })
  return releaseHasName
}
