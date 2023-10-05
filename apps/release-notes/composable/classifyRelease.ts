import { GhRepo } from '../enums/dropdownEnum'
import { getReport } from './getreport'
import { Issue, Label, Releases } from '~/interface/interfaces'

/**
 * This function is to get the response from ZenhubAPI and
 * @param team string
 * @returns Releases
 */
export async function classifyReleases (team: string) {
  let items = {}
  if (team === 'ENTITIES') {
    const myGhIds: number[] = [GhRepo.ENTITIES]
    items = await getReport(myGhIds)
  }
  const itemArray = Array.isArray(items) ? items : []
  const releases = filterResponse(itemArray)
  return releases
}

/**
 * This function is to classify the responses fetched from ZenhubAPI and classify them into 2 fields:
    Close: for the release that has state "CLOSED"
    Open: for the release that has state "OPEN"
 * @param itemArray
 * @returns Releases
 */
function filterResponse (itemArray: any[]) {
  const releases: Releases = {
    open: [],
    close: []
  }
  for (let i = 0; i < itemArray.length; i++) {
    const item = itemArray[i]
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
function getIssues (issueArray: any[]) {
  const issues: Issue[] = []
  for (let i = 0; i < issueArray.length; i++) {
    const issue = issueArray[i]
    console.log(issue.labels.edges)
    const labels = getLabels(issue.labels.edges)
    issues.push({
      id: issue.id,
      title: issue.title,
      number: issue.number,
      htmlUrl: issue.htmlUrl,
      labels
    })
  }

  return issues
}

/**
 * This function is to get all the labels related to a particular issue
 * @param labelsArray
 * @returns Label[]
 */
export function getLabels (labelsArray: any[]) {
  const labels: Label[] = []
  for (let i = 0; i < labelsArray.length; i++) {
    const label = labelsArray[i].node
    labels.push({
      id: label.id,
      name: label.name
    })
  }
  return labels
}
