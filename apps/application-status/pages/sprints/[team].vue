<template>
  <div>
    <navbar />
    <div class="grid justify-items-center">
      <div>
        <ul class="grid grid-cols-5 divide-x">
          <li v-for="team in curTeams" :key="team.id">
            <NuxtLink :to="team.path">
              <button class="bg-secondary rounded-lg bg-auto w-64 h-20">
                {{ team.title }}
              </button>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <br>
      <div>
        <button class="bg-button rounded-lg bg-auto w-36 h-11 text-white" @click="changeEndCursor">
          Next
        </button>
        <button class="bg-button rounded-lg bg-auto w-36 h-11 text-white" @click="changeStartCursor">
          Prev
        </button>
      </div>
      <br>
      <div>
        <p> {{ teamName }} </p>
        <pre>
                {{ display }}
            </pre>
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
export default {
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
    return {
      teamName,
      pageInfo,
      display,
      prev,
      curTeams,
      boardId,
      keyWord
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
        } else if (this.teamName === teamName.NAMESTEAMSPACE) {
          this.boardId = this.curTeams[1].id
          this.keyWord = this.curTeams[1].keyWord
        } else if (this.teamName === teamName.ASSETS) {
          this.boardId = this.curTeams[2].id
          this.keyWord = this.curTeams[2].keyWord
        } else if (this.teamName === teamName.RELATIONSHIPS) {
          this.boardId = this.curTeams[3].id
          this.keyWord = this.curTeams[3].keyWord
        } else if (this.teamName === teamName.BTR) {
          this.boardId = this.curTeams[4].id
          this.keyWord = this.curTeams[4].keyWord
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
