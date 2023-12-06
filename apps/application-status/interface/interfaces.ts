export interface Release {
  title: string
  closeAt: string
  issues: number
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
}

export interface Response {
  sprint: Sprint
  releases: Release[]
}
