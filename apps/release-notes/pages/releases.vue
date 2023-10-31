<script lang="ts">
import { classifyReleases } from '../composable/classifyRelease'
import { Release, Releases, PageInfo } from '../interface/interfaces'
// import { useState } from '../composable/state';
import { useCursor } from '~/composable/state'
import ButtonComponent from '~/components/ButtonComponent.vue'
import { Colors, Sizes } from '~/enums/ButtonEnum'
import ContactCard from '~/components/ContactCard.vue'

export default {
  components: { ContactCard },
  data () {
    const releases: Releases = { open: [], close: [] }
    const state: string = 'close'
    const cursor = useCursor()
    const display: Release[] = releases.close
    const statusDisplay = 'Done'
    const pages = [cursor]
    const nextButton = {
      color: Colors.Cyan,
      size: Sizes.Md,
      text: 'Next'
    }
    const filterButton = {
      text: 'Filter'
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
      nextButton,
      filterButton,
      pages
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
          Release Dates
        </h1>
        <div class="path">
          <h1>BC Registries and Online Services Application Releases & Notes</h1>
          <h2>All releases that are {{ statusDisplay }} are noted below.</h2>
        </div>
        <div class="choose-state">
          <p>Go to:</p>
          <select id="status" v-model="state" class="state-options">
            <option value="close">
              Done Releases
            </option>
            <option value="open">
              In Progress Releases
            </option>
          </select>
          <div class="filter-button">
            <ButtonComponent :text="filterButton.text" type="submit" @click="switchState" />
          </div>
        </div>
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

            <div class="contact">
              <ContactCard />
            </div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <ButtonComponent :color="nextButton.color" :size="nextButton.size" :text="nextButton.text" type="submit" @click="changeCursor" />
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
  width: 30%;
  color: black;
}

.path {
  flex-direction: column;
  width: 50%;
  font-weight: bolder;
  display: flex;

}

.path > h1 {
  color: black;
}

.path > h2 {
  color: #757575;
  flex-direction: column;
  margin-left: 15%;
}

.page {
  display: flex;
}

.content {
  flex-direction: column;
  width: 60%
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
.pagination {
  flex-direction: row;
  margin-left: 92%;
  margin-bottom: 5%;
}

.contact {
  flex-direction: column;
  margin-left: 10%
}

.choose-state {
  display: flex;
  align-items: center;
  margin-right: 4%;
}
.choose-state > p {
  flex-direction: column;
  width: 40%;
}

.choose-state > select {
  text-align: center;
}

.filter-button {
  flex-direction: column;
  width: 10%;
  margin-left: 10%;
}
</style>
