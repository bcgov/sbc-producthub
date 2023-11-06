import { GhRepo } from '../enums/dropdownEnum'
import { getReport } from './getreport'
import { Issue, Label, Releases, PageInfo } from '~/interface/interfaces'

/**
 * This function is to get the response from ZenhubAPI and
 * @param team string
 * @returns Releases
 */
export async function classifyReleases (
  team: string,
  startCursor: String,
  endCursor: String
) {
  let items = {}
  let pageInfo: PageInfo = {
    hasPreviousPage: false,
    hasNextPage: false,
    startCursor: '',
    endCursor: ''
  }
  if (team === 'ENTITIES') {
    const myGhIds: String = GhRepo.ENTITIES
    const response = await getReport(myGhIds, startCursor, endCursor)
    items = response.nodes
    pageInfo = response.pageInfo
  }
  const itemArray = Array.isArray(items) ? items : []
  // console.log(itemArray)
  const releases = filterResponse(itemArray)
  return {
    releases,
    pageInfo
  }
}

/**
 * This function is to classify the responses fetched from ZenhubAPI and classify them into 2 fields:
    Close: for the release that has state "CLOSED"
    Open: for the release that has state "OPEN"
 * @param itemArray
 * @returns Releases
 */
export function filterResponse (itemArray: any[]) {
  const releases: Releases = {
    open: [],
    close: []
  }
  for (let i = itemArray.length - 1; i > -1; i--) {
    const item = itemArray[i]
    // console.log(item)
    const issues = getIssues(item.issues.nodes)
    if (item.state === 'CLOSED') {
      releases.close.push({
        id: item.id,
        title: item.title,
        description: item.description,
        startOn: item.startOn,
        endOn: item.endOn,
        state: item.state,
        issues
      })
    } else {
      releases.open.push({
        id: item.id,
        title: item.title,
        description: item.description,
        startOn: item.startOn,
        endOn: item.endOn,
        state: item.state,
        issues
      })
    }
  }
  return releases
}

/**
 * This function is to get all the issues in a particular release
 * @param issueArray
 * @returns Issue[]
 */
export function getIssues (issueArray: any[]) {
  const issues: Issue[] = []
  for (let i = 0; i < issueArray.length; i++) {
    const issue = issueArray[i]
    // const labels = getLabels(issue.labels.edges)
    issues.push({
      id: issue.id,
      title: issue.title,
      number: issue.number,
      htmlUrl: issue.htmlUrl
      // labels
    })
  }

  return issues
}

// /**
//  * This function is to get all the labels related to a particular issue
//  * @param labelsArray
//  * @returns Label[]
//  */
// export function getLabels (labelsArray: any[]) {
//   const labels: Label[] = []
//   for (let i = 0; i < labelsArray.length; i++) {
//     const label = labelsArray[i].node
//     labels.push({
//       id: label.id,
//       name: label.name
//     })
//   }
//   return labels
// }
