<script lang="ts">
import { classifyReleases } from '../composable/classifyRelease'
import { Release, Releases } from '../interface/interfaces'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
export default {
  data () {
    const releases: Releases = { open: [], close: [] }
    const state: string = 'close'
    const display: Release[] = releases.close
    const active: boolean = true
    return {
      releases,
      state,
      display,
      active
    }
  },
  beforeMount () {
    this.created()
  },
  methods: {
    async created () {
      console.log('hello')
      this.releases = await classifyReleases('ENTITIES')
      if (this.state === 'close') {
        this.display = this.releases.close
      }
      else {
        this.display = this.releases.open
      }
    },

    switchState () {
      if (this.state === 'open') {
        this.state = 'open'
        this.display = this.releases.open
      }
      else {
        this.state = 'close'
        this.display = this.releases.close
      }
    }, 

    switchToOpen () {
        this.state = 'open'
        this.display = this.releases.open
        this.active = false
    },

    switchToClose () {
      this.state = 'close'
      this.display = this.releases.close
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
        <h1 class="title">BC Registries Releases</h1>
        <h2 class="path">
          BC Registries and Online Services > {{ state }}
        </h2>
        <select class="state-options" id="status" v-model="state">
          <option value="close">
              Completed Releases
          </option>
          <option value="open">
              In Progress Releases
          </option>
        </select>
        <button class="state-button" type="submit" @click="switchState"> Filter </button>
        <!-- <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <div v-if="state === 'open'"> In Progress</div>
              <div v-else="state === 'close'"> Completed </div>
              <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
              </svg>            
            </MenuButton>
          </div>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem :v-slot= active> 
                  <a href="#" @click="switchToClose" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Completed Releases</a>
                </MenuItem>
                <MenuItem :v-slot= active>
                  <a href="#" @click="switchToOpen" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">In Progress Releases</a>

                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu> -->
      </div>
      
      <!-- <div class="relative inline-block text-left">
        <div>
          <button type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
            <div v-if="state === 'open'"> In Progress</div>
            <div v-else="state === 'close'"> Completed </div>
            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
            <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3" @click="switchToClose">Completed</button>
            <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3" @click="switchToOpen">In progress</button>
          </div>
        </div>
      </div> -->

      <div class="release-page">
        <div v-if="releases">
          <!-- Display the releases d ata here -->
          <!-- <button class="state-button" @click="switchState">
            {{ state }}
          </button> -->
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
                  <h1> {{ release.title }} </h1>
                  <br>
                  <div class="release-content">
                    <h2>Release Summary</h2>
                    <div class="issue">{{ release.description }}</div>
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
    </body>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
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
  padding-left: 20px;
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

.state-options {
  /* margin-left: 60%; */
  width: 166px;
  height: 44px;
  border-radius: 4px;
  background-color: #e2e8ee;
  text-decoration: none solid rgb(22, 105, 187);
}
</style>
