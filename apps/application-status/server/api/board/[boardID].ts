import { getSprint } from '~/composables/getSprint'
import { getReleases } from '~/composables/getReleases'
import filterReleases from '~/helper/filterRelease'
import { castingSprint, castingReleases } from '~/helper/castingResponse'
import { Response } from '~/interface/interfaces'

export default defineEventHandler(async (event) => {
  const boardID: string = getRouterParam(event, 'boardID') || ''
  // console.log(boardID)
  const sprint = await getSprint(boardID)
  // console.log(sprint)
  const releases = await getReleases(boardID)
  // console.log(releases)
  const releasesInRange = filterReleases(releases, sprint.startAt, sprint.endAt)
  // console.log(releasesInRange)
  const castedSprint = castingSprint(sprint, releasesInRange.length)
  // console.log(castedSprint)
  const castedReleases = castingReleases(releasesInRange)
  const res: Response = {
    sprint: castedSprint,
    releases: castedReleases
  }
  return res
})
