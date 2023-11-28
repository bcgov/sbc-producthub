// export interface Label {
//   id: string;
//   name: string;
// }

// export interface Issue {
//   id: string;
//   title: string;
//   number: string;
//   htmlUrl: string;
//   // labels: Label[];
// }

export interface Release {
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
}

export interface Response {
  sprint: Sprint
  releases: Release[]
}

// export interface PageInfo {
//   hasPreviousPage: boolean;
//   hasNextPage: boolean;
//   startCursor: string,
//   endCursor: string
// }
