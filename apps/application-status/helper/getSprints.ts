import { getAllSprints } from '../composables/getAllSprints'
import { castingReleases, castingSprint } from './castingResponse'
import { filterReleasesByDate, filterReleaseByTeam } from './filterRelease'
import { TeamSprints } from '~/interface/interfaces'

/**
 * Get all of the sprints in each Zenhub board.
 * @param boardId 
 * @param startCursor 
 * @param endCursor 
 * @param releases 
 * @param team 
 * @returns 
 */
export default async function getSprints (boardId: string, startCursor: string, endCursor: string, releases: any, team: string) {
  const data = await getAllSprints(boardId, startCursor, endCursor)
  const result: TeamSprints = {
    totalCount: data.totalCount,
    pageInfo: {
      endCursor: data.pageInfo.endCursor,
      hasNextPage: data.pageInfo.hasNextPage,
      hasPreviousPage: data.pageInfo.hasPreviousPage,
      startCursor: data.pageInfo.startCursor
    },
    sprints: []
  }

  for (let i = 0; i < data.nodes.length; i++) {
    const sprint = data.nodes[i]
    const releasesInRange = filterReleasesByDate(
      releases,
      sprint.startAt,
      sprint.endAt
    )

    const castedReleases = castingReleases(releasesInRange)
    const releaseInTeam = filterReleaseByTeam(castedReleases, team)
    const castedSprint = castingSprint(sprint, releaseInTeam.length)
    result.sprints.push(castedSprint)
  }
  return result
}
