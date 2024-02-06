<template>
  <div>
    <navbar />
    <div class="grid justify-items-center">
      <div class="flex flex-row gap-4 mt-10">
        <button class="bg-button rounded-lg bg-auto w-20 h-10 text-white">
          <NuxtLink to="../">
            &lt; Back
          </NuxtLink>
        </button>
        <ul class="grid grid-cols-5 gap-4">
          <li v-for="team in curTeams" :key="team.id">
            <NuxtLink :to="team.path">
              <div v-if="team.id===boardId">
                <button class="bg-button rounded-lg bg-auto w-64 h-20 text-white">
                  {{ team.title }}
                </button>
              </div>
              <div v-else>
                <button class="bg-secondary rounded-lg bg-auto w-64 h-20">
                  {{ team.title }}
                </button>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <br>
      <div class="grid grid-cols-2 gap-4">
        <div v-if="display.pageInfo.hasPreviousPage">
          <button class="bg-button rounded-lg bg-auto w-36 h-11 text-white" @click="changeStartCursor">
            Prev
          </button>
        </div>
        <div v-else>
          <button class="bg-inactive rounded-lg bg-auto w-36 h-11" @click="changeStartCursor">
            Prev
          </button>
        </div>
        <div v-if="display.pageInfo.hasNextPage">
          <button class="bg-button rounded-lg bg-auto w-36 h-11 text-white" @click="changeEndCursor">
            Next
          </button>
        </div>
        <div v-else>
          <button class="bg-inactive rounded-lg bg-auto w-36 h-11" @click="changeEndCursor">
            Next
          </button>
        </div>
      </div>
      <br>
      <div class="grid justify-items-center">
        <b class="text-5xl"> {{ teamTitle }} </b>
        <b class="text-lg">Total sprints: {{ display.totalCount }}</b>
        <br>
        <ul>
          <li v-for="sprint in display.sprints" :key="sprint.id">
            <b>
              {{ sprint.name }} - {{ sprint.state }}
            </b>
            <br>
            <b>
              {{ formatDate(sprint.startAt) }} -  {{ formatDate(sprint.endAt) }}
            </b>
            <p>
              Total points: {{ sprint.totalPoints }}
            </p>
            <p>
              Total closed releases: {{ sprint.numberOfRelease }}
            </p>
            <p>
              Total issues: {{ sprint.issues.totalCount }}
            </p>
            <p>
              Total Production Defects: {{ sprint.issues.totalDefect }}
            </p>
            <br>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import getSprints from '../../helper/getSprints'
import teams from '../../data/TeamsData'
import { PageInfo, TeamSprints } from '../../interface/interfaces'
import { getReleases } from '../../composables/getReleases'
import teamName from '../../enums/teamNames'
import formatDate from '../../helper/formatDate'
import EachTeamLegend from '~/components/EachTeamLegend.vue'
export default {
  components: { EachTeamLegend },
  data () {
    const route = useRoute()
    const teamName = route.params.team
    const display: TeamSprints = {
      totalCount: 0,
      pageInfo: {
        endCursor: '',
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: ''
      },
      sprints: []
    }
    const pageInfo: PageInfo = {
      startCursor: '',
      endCursor: '',
      hasNextPage: false,
      hasPreviousPage: false
    }
    const prev: string[] = ['']
    const curTeams = teams
    const boardId = ''
    const keyWord = ''
    const teamTitle = ''
    return {
      teamName,
      pageInfo,
      display,
      prev,
      curTeams,
      boardId,
      keyWord,
      teamTitle,
      formatDate
    }
  },
  beforeMount () {
    this.displayData()
  },
  methods: {
    async displayData () {
      if (this.boardId === '' && this.keyWord === '') {
        if (this.teamName === teamName.ENTITIES) {
          this.boardId = this.curTeams[0].id
          this.keyWord = this.curTeams[0].keyWord
          this.teamTitle = this.curTeams[0].title
        } else if (this.teamName === teamName.NAMESTEAMSPACE) {
          this.boardId = this.curTeams[1].id
          this.keyWord = this.curTeams[1].keyWord
          this.teamTitle = this.curTeams[1].title
        } else if (this.teamName === teamName.ASSETS) {
          this.boardId = this.curTeams[2].id
          this.keyWord = this.curTeams[2].keyWord
          this.teamTitle = this.curTeams[2].title
        } else if (this.teamName === teamName.RELATIONSHIPS) {
          this.boardId = this.curTeams[3].id
          this.keyWord = this.curTeams[3].keyWord
          this.teamTitle = this.curTeams[3].title
        } else if (this.teamName === teamName.BTR) {
          this.boardId = this.curTeams[4].id
          this.keyWord = this.curTeams[4].keyWord
          this.teamTitle = this.curTeams[4].title
        }
      }
      const releases = await getReleases(this.boardId)
      const data = await getSprints(this.boardId, this.pageInfo.startCursor, this.pageInfo.endCursor, releases, this.keyWord)
      this.display = data
      this.pageInfo = this.display.pageInfo
    },
    changeStartCursor () {
      if (this.pageInfo.hasPreviousPage) {
        this.pageInfo.startCursor = ''
        this.pageInfo.endCursor = this.prev[this.prev.length - 2]
        this.prev.pop()
        this.displayData()
      }
    },
    changeEndCursor () {
      if (this.pageInfo.hasNextPage) {
        this.pageInfo.startCursor = ''
        this.prev.push(this.pageInfo.endCursor)
        this.displayData()
      }
    }
  }
}

</script>
