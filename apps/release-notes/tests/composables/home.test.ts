import { afterEach, describe, expect, it, vi } from 'vitest'
import { getIssues, filterResponse } from '../../composable/classifyRelease'
import { Release } from '~/interface/interfaces'
// const labels = {
//   items: [
//     {
//       node: {
//         id: '1',
//         name: 'Team 1'
//       }
//     },
//     {
//       node: {
//         id: '2',
//         name: 'Team 2'
//       }
//     }
//   ],
//   expected: [
//     {
//       id: '1',
//       name: 'Team 1'
//     },
//     {
//       id: '2',
//       name: 'Team 2'
//     }
//   ]
//   // getLabels
// }

const issues = {
  items: [
    {
      id: '1',
      title: 'Direct to Google',
      number: 1,
      htmlUrl: 'https://www.google.com/'
      // labels: { edges: labels.items }
    },
    {
      id: '2',
      title: 'Direct to Youtube',
      number: 2,
      htmlUrl: 'https://www.youtube.com/'
      // labels: { edges: labels.items }
    }
  ],

  expected: [
    {
      id: '1',
      title: 'Direct to Google',
      number: 1,
      htmlUrl: 'https://www.google.com/'
      // labels: labels.expected
    },
    {
      id: '2',
      title: 'Direct to Youtube',
      number: 2,
      htmlUrl: 'https://www.youtube.com/'
      // labels: labels.expected
    }
  ],
  getIssues
}

const releases = {
  items: [
    {
      id: "1",
      title: "Release 1",
      description: "This is release 1",
      startOn: "2023-10-02",
      endOn: "2023-12-04",
      state: "OPEN",
      issues: { nodes: issues.items },
    },
    {
      id: "2",
      title: "Release 2",
      description: "This is release 2",
      startOn: "2022-11-19",
      endOn: "2023-02-24",
      state: "CLOSED",
      issues: { nodes: issues.items },
    },
  ],

  expected: [
    {
      id: "2",
      title: "Release 2",
      description: "This is release 2",
      startOn: "2022-11-19",
      endOn: "2023-02-24",
      state: "CLOSED",
      issues: issues.expected,
    },
    {
      id: "1",
      title: "Release 1",
      description: "This is release 1",
      startOn: "2023-10-02",
      endOn: "2023-12-04",
      state: "OPEN",
      issues: issues.expected,
    },
  ],
  filterResponse,
};

describe('helper functions test', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  // it('Test getLabels function', () => {
  //   const spy = vi.spyOn(labels, 'getLabels')
  //   expect(spy.getMockName()).toEqual('getLabels')
  //   expect(labels.getLabels(labels.items)).toEqual(
  //     labels.expected
  //   )
  //   expect(spy).toHaveBeenCalledTimes(1)

  //   spy.mockImplementationOnce(() => [])
  //   expect(labels.getLabels(labels.items)).toEqual([])

  //   expect(spy).toHaveBeenCalledTimes(2)
  // })

  it('Test getIssues function', () => {
    const spy = vi.spyOn(issues, 'getIssues')
    expect(spy.getMockName()).toEqual('getIssues')
    expect(issues.getIssues(issues.items)).toEqual(issues.expected)
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockImplementationOnce(() => [])
    expect(issues.getIssues(issues.items)).toEqual([])

    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('Test filterResponse function', () => {
    const spy = vi.spyOn(releases, 'filterResponse')
    expect(spy.getMockName()).toEqual('filterResponse')
    expect(releases.filterResponse(releases.items)).toEqual(releases.expected)
    expect(spy).toHaveBeenCalledTimes(1)

    const empty: Release[] = []
    spy.mockImplementationOnce(() => empty)
    expect(releases.filterResponse(releases.items)).toEqual(empty)

    expect(spy).toHaveBeenCalledTimes(2)
  })
})
