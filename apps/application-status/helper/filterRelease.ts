function filterReleases (releases: any, startAt: any, endAt: any) {
  const releasesWithinDateRange =
      releases.nodes.filter((release: any) => {
        const closedAt = new Date(release.closedAt)
        const startDate = new Date(startAt)
        const endDate = new Date(endAt)

        return closedAt >= startDate && closedAt <= endDate
      })
  return releasesWithinDateRange
}

export default filterReleases
