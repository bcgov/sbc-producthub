<script lang="ts">
import { classifyReleases } from '../composable/classifyRelease'
import { Release, Releases, PageInfo } from '../interface/interfaces'
// import { useState } from '../composable/state';
import { useCursor } from '~/composable/state'
import ButtonComponent from '~/components/ButtonComponent.vue'
import { Colors, Sizes } from '~/enums/ButtonEnum'

export default {
  data () {
    const releases: Releases = { open: [], close: [] }
    const state: string = 'close'
    const cursor = useCursor()
    const display: Release[] = releases.close
    const statusDisplay = 'Done'
    const button = {
      color: Colors.Cyan,
      size: Sizes.Md,
      text: 'next page'
    }
    const pageInfo: PageInfo = {
      hasPreviousPage: false,
      startCursor: ''
    }
    return {
      releases,
      state,
      display,
      pageInfo,
      cursor,
      ButtonComponent,
      statusDisplay,
      button
    }
  },
  beforeMount () {
    this.created()
  },
  methods: {
    async created () {
      console.log('hello')
      const response = await classifyReleases('ENTITIES', this.cursor)
      this.releases = response.releases
      this.pageInfo = {
        hasPreviousPage: response.pageInfo.hasPreviousPage,
        startCursor: response.pageInfo.startCursor
      }
      if (this.state === 'close') {
        this.display = this.releases.close
      } else {
        this.display = this.releases.open
      }
    },

    switchState () {
      if (this.state === 'open') {
        this.state = 'open'
        this.display = this.releases.open
        this.statusDisplay = 'In progress'
      } else {
        this.state = 'close'
        this.display = this.releases.close
        this.statusDisplay = 'Done'
      }
    },

    changeCursor () {
      this.cursor = this.pageInfo.startCursor
      this.created()
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
      <div class="title-page">
        <h1 class="title">
          BC Registries Releases
        </h1>
        <h2 class="path">
          BC Registries and Online Services > {{ statusDisplay }}
        </h2>
        <select id="status" v-model="state" class="state-options">
          <option value="close">
            Done Releases
          </option>
          <option value="open">
            In Progress Releases
          </option>
        </select>
        <button class="state-button" type="submit" @click="switchState">
          Filter
        </button>
        <button class="pagination" type="submit" @click="changeCursor">
          Next
        </button>
      </div>

      <div class="release-page">
        <div v-if="releases">
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
                  <h1 class="font-display">
                    {{ release.endOn }} - {{ statusDisplay }}
                  </h1>
                  <h1> {{ release.title }} </h1>
                  <br>
                  <div class="release-content">
                    <h2>Release Summary</h2>
                    <div class="issue">
                      {{ release.description }}
                    </div>
                    <br>
                    <h2>Issues</h2>
                    <ul>
                      <li v-for="issue in release.issues" :key="issue.id">
                        <h3 class="issue">
                          {{ issue.title }} -
                          <NuxtLink class="link" :to="issue.htmlUrl">
                            {{ issue.number }}
                          </NuxtLink>
                        </h3>
                      </li>
                    </ul>
                  </div>
                  <br>
                  <br>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <ButtonComponent :color="button.color" :size="button.size" :text="button.text" type="submit" @click="changeCursor" />
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

.issue {
  font-size: 15px;
  padding-left: 30px;
}

.release-content {
  padding-left: 30px;
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
  display: flex;
}
.title {
  flex-direction: column;
  align-self: center;
  width: 50%;
}

.path {
  flex-direction: column;
  width: 50%;
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

.state-options, .state-options > option {
  /* margin-left: 60%; */
  width: 166px;
  height: 44px;
  border-radius: 4px;
  background-color: #e2e8ee;
  text-decoration: none solid rgb(22, 105, 187);
}
</style>
