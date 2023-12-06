<template>
  <div>
    <navbar />
    <div class="metrics flex flex-col self-center">
      <ul>
        <li v-for="team in teams" :key="team.id">
          <div>
            <b class="text-2xl">{{ team.title }}</b>
          </div>
          <div>
            <b class="text-2xl">{{ team.sprint.name }}</b>
          </div>
          <div>
            <h2 class="text-xl">
              Total Points
            </h2>
            <pre>{{ team.sprint.totalPoints }}</pre>
          </div>
          <div>
            <h2 class="text-xl">
              Total closed releases
            </h2>
            <pre>{{ team.result.totalReleases }}</pre>
          </div>
          <div>
            <h2 class="text-xl">
              Total Issues
            </h2>
            <pre>{{ team.sprint.issues.totalCount }}</pre>
          </div>
          <div>
            <h2 class="text-xl">
              Total Bugs
            </h2>
            <pre>{{ team.result.totalBugs }}</pre>
          </div>
          <br>
        </li>
      </ul>
    </div>
    <pre class="mx-20">
      <div v-if="issues === null">
        Loading issues
      </div>
        {{ issues }}
    </pre>
  </div>
</template>

<script lang="ts">
import getData from '../helper/getData'
import { Release } from '../interface/interfaces'
import { getBoard } from '../composables/getBoard'
import {getIssueZenhub} from '../composables/getIssues'
import getBugs from '../helper/countBugs'
// import workflowRun from '../enums/workflowRun'
// import runWorkFlow from '../composables/runWorkFlow'
// import runJob from '../enums/runJob'
// import waitForSuccessStatus from '../composables/getWorkFlows'
import teams from '../data/TeamsData'

export default {
  data () {
    const issues: any = null
    return {
      teams,
      issues
    }
  },
  beforeMount () {
    this.getContent()
  },
  methods: {

    async getContent () {
      // this.assets = await getData(entities, 'assets', releases)
      // await runWorkFlow(workflowRun.OWNER, workflowRun.REPO, runJob.ENTITIES)
      // this.issues = await waitForSuccessStatus(workflowRun.OWNER, workflowRun.REPO, runJob.ENTITIES, 'Entity')
      for (let i = 0; i < this.teams.length; i++) {
        const team = this.teams[i]
        const boardID = await getBoard(team.board)
        team.id = boardID
        const releases = await getReleases(boardID)
        const teamsContent = await getData(boardID, team.keyWord, releases)
        team.sprint = teamsContent.sprint
        team.result = {
          totalIssues: this.calculateTotalIssue(teamsContent.releases),
          totalReleases: teamsContent.releases.length,
          totalBugs: 0
        }
        const issues = await getIssueZenhub(boardID)
        team.result.totalBugs = getBugs(issues)
      }
    },
    calculateTotalIssue (releases: Release[]) {
      let sum = 0
      for (let i = 0; i < releases.length; i++) {
        sum += releases[i].issues
      }
      return sum
    }
  }
}
</script>
<style>
.metrics {
    margin-left: 35%;
    margin-top: 40px;
}
</style>
