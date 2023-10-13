<script lang="ts">
import { classifyReleases } from '../composable/classifyRelease'
import { Release, Releases } from '../interface/interfaces'

export default {
  data () {
    const releases: Releases = { open: [], close: [] }
    const state: string = 'open'
    const display: Release[] = releases.open
    return {
      releases,
      state,
      display
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
    }
  }
}
</script>

<template>
  <div>
    <header>
      <navbar />
    </header>
    <body>
      <h1 class="title-page">
        BC Registries Releases
      </h1>
      <div class="release-page">
        <div v-if="releases">
          <!-- Display the releases d ata here -->
          <button class="state-button" @click="switchState">
            {{ state }}
          </button>
          <div class="page">
            <div class="date-range">
              <ul>
                <li v-for="release in display" :key="release.id">
                  {{ release.endOn }}
                </li>
              </ul>
            </div>
            <div class="content">
              <ul>
                <li v-for="release in display" :key="release.id">
                  <h1>{{ release.endOn }} - {{ release.state }}</h1>
                  <h1>Release {{ release.title }}</h1>
                  <div>Note {{ release.description }}</div>
                  <h2>Issues:</h2>
                  <ul>
                    <li v-for="issue in release.issues" :key="issue.id">
                      <h2>
                        {{ issue.title }} -
                        <NuxtLink class="link" :to="issue.htmlUrl">
                          {{ issue.number }}
                        </NuxtLink>
                      </h2>
                      <!-- <h3>Labels</h3>
                      <ul>
                        <li v-for="label in issue.labels" :key="label.id">
                          <div>
                            {{ label.name }}
                          </div>
                        </li>
                      </ul> -->
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<style>
.release-page {
  margin: 40px;
}

h1 {
  font-size: 22px;
  font-weight: bolder;
  color: #1669bb;
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
  width: 88px;
  height: 34px;
  border-radius: 4px;
  background-color: #1669bb;
  background-size: cover;
  font-family: Noto Sans;
  font-size: 14px;
  color: #ffffff;
  text-decoration: none solid rgb(255, 255, 255);
  text-align: center;
}

.date-range {
  flex-direction: column;
  width: 20%;
  font-weight: 500;
}

.title-page {
  margin: 40px;
}

.page {
  display: flex;
}

.content {
  flex-direction: column;
  width: 80%
}

.link {
  color:#1669bb;
}
</style>
