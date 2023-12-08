import { Release } from '~/interface/interfaces'
/**
 * Filter the releases by date range
 * @param releases
 * @param startAt
 * @param endAt
 * @returns
 */
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

/**
 * Filter the releases by team
 * @param releases
 * @param team
 * @returns
 */
export function filterReleaseByTeam (releases: Release[], team: string) {
  const releaseHasName = releases.filter((release: Release) => {
    const title = release.title
    return title.toLowerCase().includes(team)
  })
  return releaseHasName
}
