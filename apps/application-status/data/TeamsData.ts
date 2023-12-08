import { Sprint } from '~/interface/interfaces'
import BoardName from '~/enums/boardName'
import BoardTitles from '~/enums/boardTitles'
/**
 * Centralize data to display on frontend
 */
const sprint: Sprint = {
  closedIssuesCount: 0,
  completedPoints: 0,
  createdAt: '',
  description: '',
  endAt: '',
  id: '',
  name: '',
  startAt: '',
  state: '',
  totalPoints: 0,
  updatedAt: '',
  numberOfRelease: 0,
  issues: {
    totalCount: 0
  },
  scopeChange: {
    totalCount: 0,
    issues: []
  }
}
const result = {
  totalReleases: 0,
  totalBugs: 0
}
const teams = [
  {
    id: 1,
    title: BoardTitles.ENTITIES,
    board: BoardName.ENTITIES,
    keyWord: 'enti',
    result,
    sprint
  },
  {
    id: 2,
    title: BoardTitles.NAMESTEAMSPACE,
    board: BoardName.NAMETEAMSPACE,
    keyWord: 'name',
    result,
    sprint
  },
  {
    id: 3,
    title: BoardTitles.ASSETS,
    board: BoardName.ASSETS,
    keyWord: 'assets',
    result,
    sprint
  },
  {
    id: 4,
    title: BoardTitles.RELATIONSHIPS,
    board: BoardName.RELATIONSHIPS,
    keyWord: 'relationships',
    result,
    sprint
  }
]

export default teams
