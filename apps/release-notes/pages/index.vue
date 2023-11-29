<script lang="ts">
import { classifyReleases } from '../composable/classifyRelease'
import { Release, PageInfo } from '../interface/interfaces'
// import { useState } from '../composable/state';
import { useCursor } from '~/composable/state'
import ButtonComponent from '~/components/ButtonComponent.vue'
import ContactCard from '~/components/ContactCard.vue'

export default {
  components: { ContactCard },
  data () {
    const releases: Release[] = []
    const state: string = 'CLOSED'
    const startCursor = useCursor()
    const endCursor = useCursor()
    const display: Release[] = releases
    const statusDisplay = 'Done'
    const board: string = 'ENTITIES'
    const prev: string[] = ['']
    const navButton = {
      nextText: 'Next',
      prevText: 'Prev'
    }
    const filterButton = {
      text: 'Filter'
    }
    const pageInfo: PageInfo = {
      hasPreviousPage: false,
      hasNextPage: false,
      startCursor: '',
      endCursor: ''
    }
    return {
      releases,
      state,
      display,
      pageInfo,
      startCursor,
      endCursor,
      ButtonComponent,
      statusDisplay,
      navButton,
      filterButton,
      board,
      prev
    }
  },
  beforeMount () {
    this.created()
  },
  methods: {
    async created () {
      const response = await classifyReleases(this.board, this.pageInfo.startCursor, this.pageInfo.endCursor, this.state)
      this.releases = response.releases
      this.pageInfo = {
        hasPreviousPage: response.pageInfo.hasPreviousPage,
        hasNextPage: response.pageInfo.hasNextPage,
        startCursor: response.pageInfo.startCursor,
        endCursor: response.pageInfo.endCursor
      }
      this.display = this.releases
      this.scrollToTop()
    },
    switchState () {
      this.display = []
      if (this.state === 'OPEN') {
        this.state = 'OPEN'
        this.statusDisplay = 'In progress'
      } else {
        this.state = 'CLOSED'
        this.statusDisplay = 'Done'
      }
      this.pageInfo = {
        hasPreviousPage: false,
        hasNextPage: false,
        startCursor: '',
        endCursor: ''
      }
      this.created()
    },
    changeStartCursor () {
      if (this.pageInfo.hasPreviousPage) {
        this.pageInfo.endCursor = ''
        this.prev.push(this.pageInfo.startCursor)
        this.created()
      }
    },
    changeEndCursor () {
      if (this.pageInfo.hasNextPage) {
        this.pageInfo.endCursor = ''
        this.pageInfo.startCursor = this.prev[this.prev.length - 2]
        this.prev.pop()
        this.created()
      }
    },
    scrollToTop () {
      window.scrollTo(0, 0)
    },
    scrollToElement (elementID: string) {
      const element = document.getElementById(elementID)
      element?.scrollIntoView()
    }
  }
}
</script>

<template>
  <div>
    <header>
      <navbar />
    </header>
    <div class="title-page">
      <b class="title" />
      <div class="path">
        <h1>BC Registries and Online Services Application Releases & Notes</h1>
        <h2>All releases that are {{ statusDisplay }} are noted below.</h2>
      </div>
      <div class="choose-state">
        <b>
          Go to:
        </b>
        <select id="status" v-model="state" class="state-options">
          <option value="CLOSED">
            Done Releases
          </option>
          <option value="OPEN">
            In Progress Releases
          </option>
        </select>
        <div class="filter-button">
          <ButtonComponent :text="filterButton.text" type="submit" @click="switchState" />
        </div>
      </div>
    </div>

    <div class="release-page">
      <div class="pagination">
        <div id="prev" class="prev-bttn">
          <ButtonComponent :text="navButton.prevText" type="submit" @click="changeEndCursor" />
        </div>
        <div class="next-bttn">
          <ButtonComponent :text="navButton.nextText" type="submit" @click="changeStartCursor" />
        </div>
      </div>
      <div v-if="releases">
        <div class="page">
          <div class="date-range">
            <div class="dates">
              <b class="title">
                Release Dates
              </b>
              <ul>
                <li v-for="release in display" :key="release.id">
                  <button @click="scrollToElement(release.id)">
                    {{ release.endOn }}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div class="content">
            <ul>
              <li v-for="release in display" :key="release.id">
                <h1 :id="release.id">
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
      <div id="prev" class="prev-bttn">
        <ButtonComponent :text="navButton.prevText" type="submit" @click="changeEndCursor" />
      </div>
      <div class="next-bttn">
        <ButtonComponent :text="navButton.nextText" type="submit" @click="changeStartCursor" />
      </div>
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
  margin-left: 5%;
  margin-right: 5%;
}

.date-range {
  flex-direction: column;
  width: 20%;
  font-weight: 500;
  height: 20%;
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
  font-size: 20px;
}

.path {
  flex-direction: column;
  width: 50%;
  font-weight: bolder;
  display: flex;

}

.path > h1, .choose-state > b {
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
  width: 80%;
}

.link {
  color:#1669bb;
}

.state-options, .state-options > option {
  width: 166px;
  height: 44px;
  border-radius: 4px;
  background-color: #e2e8ee;
  text-decoration: none solid rgb(22, 105, 187);
}

.pagination {
  flex-direction: row;
  margin-bottom: 5%;
  margin-left: 45%;
  display: flex;
}

.contact {
  flex-direction: column;
  width: 28%;
  background-color: #E4EDF7;
  border-radius: 20px;
  height: 20%;
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

.next-bttn {
  flex-direction: column;
  margin-left: 2%;
}
</style>
