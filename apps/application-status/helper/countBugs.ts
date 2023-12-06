import { Label } from "~/interface/interfaces"
function getBugs(issues: any) {
    var count: number = 0
    for (let i = 0; i<issues.length; i++) {
        const issue = issues[i]
        const labels = issue.labels.nodes
        var issueLabels: string[] = []
        for (let j = 0; j<labels.length; j++) {
            const label = labels[j]
            issueLabels.push(label.name)
        }
        if (issueLabels.some(e => e === 'bug')) {
            count ++;
        }
    }
    return count
}

export default getBugs