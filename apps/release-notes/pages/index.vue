<script setup lang="ts">
import {getReport} from '../composable/getreport'

// Hard code one github repo, which is frm Entities team
const myGhIds: number[] = [157936592]
const dis = await getReport(myGhIds)
console.log(dis)
</script>

<template>
  <div>
    <div v-if="dis">
      <!-- Display the releases data here -->
      <ul>
        <li v-for="release in dis.nodes" :key="release.id">
          {{ release.title }} - {{ release.description }}
        </li>
      </ul>
    </div>
    <NuxtLink to="/home">
      Home
    </NuxtLink>
  </div>
</template>
