<template>
  <div>
    <navbar />
    <div class="metrics flex flex-col self-center">
      <div>
        <b class="text-3xl">{{ entities.sprint.name }}</b>
      </div>
      <br>
      <div>
        <b class="text-2xl">ENTITIES REPO</b>
      </div>
      <div>
        <h2 class="text-xl">
          Total Points
        </h2>
        <pre>{{ entities.sprint.totalPoints }}</pre>
      </div>
      <div>
        <h2 class="text-xl">
          Total closed releases
        </h2>
        <pre>{{ entities.sprint.numberOfRelease }}</pre>
      </div>
      <div>
        <h2 class="text-xl">
          Total Issues
        </h2>
        <pre>{{ calculateTotalIssue(entities) }}</pre>
      </div>
      <br>
      <div>
        <b class="text-2xl">NAME TEAM REPO</b>
      </div>
      <div>
        <h2 class="text-xl">
          Total Points
        </h2>
        <pre>{{ nameteam.sprint.totalPoints }}</pre>
      </div>
      <div>
        <h2 class="text-xl">
          Total closed releases
        </h2>
        <pre>{{ nameteam.sprint.numberOfRelease }}</pre>
      </div>
      <div>
        <h2 class="text-xl">
          Total Issues
        </h2>
        <pre>{{ calculateTotalIssue(nameteam) }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import getData from '../helper/getData'
import BoardName from '../enums/boardName'
import { Response, Sprint } from '../interface/interfaces'
import { getBoard } from '../composables/getBoard'
export default {
  data () {
    const id = 1
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
      numberOfRelease: 0
    }
    const entities: Response = {
      sprint,
      releases: []
    }
    const nameteam: Response = {
      sprint,
      releases: []
    }
    return {
      id,
      entities,
      nameteam
    }
  },
  beforeMount () {
    this.getContent()
  },
  methods: {

    async getContent () {
        const entities = await getBoard(BoardName.ENTITIES)
        const nameteam = await getBoard(BoardName.NAMETEAMSPACE)
        this.entities = await getData(entities)
        this.nameteam = await getData(nameteam)
    },
    calculateTotalIssue (data: Response) {
      let sum = 0
      for (let i = 0; i < data.releases.length; i++) {
        sum += data.releases[i].issues
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
