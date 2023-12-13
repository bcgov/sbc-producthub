export interface Release {
  title: string
  closeAt: string
  issues: number
}

export interface Issue {
  htmlUrl: string
  id: string
  number: number
}
export interface Sprint {
  closedIssuesCount: number
  completedPoints: number
  createdAt: string
  description: string
  endAt: string
  id: string
  name: string
  startAt: string
  state: string
  totalPoints: number
  updatedAt: string
  numberOfRelease: number
  issues: {
    totalCount: number
  }
  scopeChange: {
    totalCount: number,
    issues: Issue[]
  }
}

export interface Response {
  sprint: Sprint
  releases: Release[]
}

export interface PageInfo {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
}

export interface TeamSprints {
  totalCount: number,
  sprints: Sprint[],
  pageInfo: PageInfo
}
