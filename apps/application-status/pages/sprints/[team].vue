<template>
  <div>
    <ul>
      <li v-for="team in curTeams" :key="team.id">
        <NuxtLink :to="team.path">
          {{ team.title }}
        </NuxtLink>
      </li>
    </ul>
    <button @click="changeEndCursor">
      Next
    </button>
    <button @click="changeStartCursor">
      Prev
    </button>
    <p> {{ teamName }} </p>
    <pre>
            {{ display }}
        </pre>
  </div>
</template>

<script lang="ts">
import getSprints from '../../helper/getSprints'
import teams from '../../data/TeamsData'
import { PageInfo, TeamSprints } from '../../interface/interfaces'
import { getReleases } from '../../composables/getReleases'
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
        if (this.teamName === 'entity') {
          this.boardId = this.curTeams[0].id
          this.keyWord = this.curTeams[0].keyWord
        } else if (this.teamName === 'nameteamspace') {
          this.boardId = this.curTeams[1].id
          this.keyWord = this.curTeams[1].keyWord
        } else if (this.teamName === 'assets') {
          this.boardId = this.curTeams[2].id
          this.keyWord = this.curTeams[2].keyWord
        } else if (this.teamName === 'relationships') {
          this.boardId = this.curTeams[3].id
          this.keyWord = this.curTeams[3].keyWord
        } else if (this.teamName === 'btr') {
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
        console.log(this.prev)
        this.displayData()
      }
    }
  }
}

</script>
