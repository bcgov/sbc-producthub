<script lang="ts">
import { classifyReleases } from '../composable/classifyRelease'
import { Release, Releases } from '../interface/interfaces'

export default {
  data () {
    const releases: Releases = { open: [], close: [] }
    const state: string = 'open'
    const display: Release[] = releases.open
    const link: string = ''
    return {
      releases,
      state,
      display,
      link
    }
  },
  beforeMount () {
    this.created()
  },
  methods: {
    async created () {
      console.log('hello')
      this.releases = await classifyReleases('ENTITIES')
      this.display = this.releases.open
    },

    switchState () {
      if (this.state === 'open') {
        this.state = 'close'
        this.display = this.releases.close
      } else {
        this.state = 'open'
        this.display = this.releases.open
      }
    },

    getLink (gitLink: string) {
      this.link = gitLink
      return this.link
    }
  }
}
</script>

<template>
  <div class="release-page">
    <h1>BC Registries Releases</h1>
    <div v-if="releases">
      <!-- Display the releases d ata here -->
      <button class="state-button" @click="switchState">
        {{ state }}
      </button>
      <ul>
        <li v-for="release in display" :key="release.id">
          <h1>{{ release.endOn }} - {{ release.state }}</h1>
          <h2>Title {{ release.title }}</h2>
          <div>Note {{ release.description }}</div>
          <h2>Issues:</h2>
          <ul>
            <li v-for="issue in release.issues" :key="issue.id">
              <NuxtLink :to="issue.htmlUrl">
                {{ issue.number }}
              </NuxtLink>
              <h2>
                {{ issue.title }} - {{ issue.number }} - {{ issue.htmlUrl }}
              </h2>
              <h3>Labels</h3>
              <ul>
                <li v-for="label in issue.labels" :key="label.id">
                  <div>
                    {{ label.name }}
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.release-page {
  margin: 40px;
}

h1 {
  font-size: 22px;
  font-weight: bolder;
}

h2 {
  font-size: 18px;
  font-weight: bold;
}

h3 {
  font-size: 15px;
  color: blueviolet;
}

.state-button {
  height: 30px;
  width: 90px;
  background-color: blue;
  color: white;
}
</style>
