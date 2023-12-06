function getBugs (issues: any) {
  let count: number = 0
  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i]
    const labels = issue.labels.nodes
    const issueLabels: string[] = []
    for (let j = 0; j < labels.length; j++) {
      const label = labels[j]
      issueLabels.push(label.name)
    }
    if (issueLabels.includes('bug')) {
      count++
    }
  }
  return count
}

export default getBugs
