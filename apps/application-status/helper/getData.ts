import { filterReleasesByDate, filterReleaseByTeam } from './filterRelease'
import { castingReleases, castingSprint } from './castingResponse'
import { Response } from '~/interface/interfaces'
import { getSprint } from '~/composables/getSprint'

export default async function getData (boardID: any, team: string, releases: any) {
  const sprint = await getSprint(boardID)
  const releasesInRange = filterReleasesByDate(
    releases,
    sprint.startAt,
    sprint.endAt
  )
  const castedSprint = castingSprint(sprint, releasesInRange.length)
  const castedReleases = castingReleases(releasesInRange)
  const releaseInTeam = filterReleaseByTeam(castedReleases, team)
  const res: Response = {
    sprint: castedSprint,
    releases: releaseInTeam
  }
  return res
}
