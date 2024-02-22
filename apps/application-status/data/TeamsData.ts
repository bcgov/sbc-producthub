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
    totalCount: 0,
    totalDefect: 0
  },
  scopeChange: {
    totalCount: 0,
    issues: []
  }
}
const result = {
  totalReleases: 0,
  totalDefects: 0
}
const teams = [
  {
    id: '1',
    title: BoardTitles.ENTITIES,
    board: BoardName.ENTITIES,
    keyWord: 'enti',
    result,
    sprint,
    path: './entity'
  },
  {
    id: '2',
    title: BoardTitles.ENTITIESOLGA,
    board: BoardName.ENTITIESOLGA,
    keyWord: 'enti',
    result,
    sprint,
    path: './entity'
  },
  {
    id: '3',
    title: BoardTitles.NAMESTEAMSPACE,
    board: BoardName.NAMETEAMSPACE,
    keyWord: 'name',
    result,
    sprint,
    path: './nameteamspace'
  },
  {
    id: '4',
    title: BoardTitles.ASSETS,
    board: BoardName.ASSETS,
    keyWord: 'assets',
    result,
    sprint,
    path: './assets'
  },
  {
    id: '5',
    title: BoardTitles.RELATIONSHIPS,
    board: BoardName.RELATIONSHIPS,
    keyWord: 'relationships',
    result,
    sprint,
    path: './relationships'
  },
  {
    id: '6',
    title: BoardTitles.BTR,
    board: BoardName.BTR,
    keyWord: 'btr',
    result,
    sprint,
    path: './btr'
  }
]

export default teams
