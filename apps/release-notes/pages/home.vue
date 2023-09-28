<script setup lang="ts">
import { getReport } from '../composable/getreport'
import { GhRepo } from '../enums/dropdownEnum'

  const myGhIds: number[] = [GhRepo.ENTITIES]
  const dis = await getReport(myGhIds)
  // console.log(dis)
</script>

<template>
  <div class="release-page" >
    <h1>BC Registries Releases</h1>
    <div v-if="dis">
      <!-- Display the releases data here -->
      <ul>
        <li v-for="release in dis.nodes" :key="release.id">
          <h1>{{ release.endOn }} - {{ release.state }}</h1>
          <h2>Title {{ release.title }}</h2>
          <div>Note {{ release.description }}</div>
          <h2>Issues:</h2>
          <ul>
            <li v-for="issue in release.issues.nodes" :key="issue.id">
              <h2>
                {{ issue.title }} - {{ issue.number }} - {{ issue.htmlUrl }}
              </h2>
              <h3>Labels</h3>
              <ul>
                <li v-for="label in issue.labels.edges" :key="label.id">
                  <div>
                    {{ label.node.name }}
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
</style>
