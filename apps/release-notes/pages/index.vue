<template>
  <div class="home">
    <div class="title">
      <h1>BC Registries Status Dashboard</h1>
      <p>{{ date }}</p>
    </div>
    <VueTable :headers="header" :data="data" :keys="keys">
      <template #th>
        <th>
          Application
        </th>
      </template>
      <template #td="{item}">
        <td>
          <NuxtLink to="/home">
            {{ item.application }}
          </NuxtLink>
        </td>
      </template>
    </VueTable>
  </div>
</template>

<script setup>
import { VueTable } from '@harv46/vue-table'
import '@harv46/vue-table/dist/style.css'
const header = ['Release Version', 'Release Note', 'Status']
const keys = ['version', 'note', 'status']
const data = [
  {
    application: 'Business Registry',
    version: 2,
    note: 'Note 1',
    status: 'Done'
  },
  {
    application: 'Name Request',
    version: 1,
    note: 'Note 2',
    status: 'Bug'
  },
  {
    application: 'Business Search',
    version: 1,
    note: 'Note 2',
    status: 'Bug'
  },
  {
    application: 'Personal Property Registry',
    version: 1,
    note: 'Note 2',
    status: 'Bug'
  },
  {
    application: 'Manufactured Home Registry',
    version: 1,
    note: 'Note 2',
    status: 'Bug'
  },
  {
    application: 'Rural Property Tax Search',
    version: 1,
    note: 'Note 2',
    status: 'Bug'
  },
  {
    application: 'Wills Registry',
    version: 1,
    note: 'Note 2',
    status: 'Bug'
  },
  {
    application: 'Site Registry',
    version: 1,
    note: 'Note 2',
    status: 'Bug'
  },
  {
    application: 'Court Services Online (CSO)',
    version: 1,
    note: 'Note 2',
    status: 'Bug'
  },
  {
    application: 'API Gateway',
    version: 1,
    note: 'Note 2',
    status: 'Bug'
  }
]
const current = new Date()
const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`
</script>

<style>
h1 {
  font-size: 22px;
  font-weight: bold;
}

.home {
  margin: 40px;
  align-items: center;
}

.title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 10px;
}

th {
  color: white;
  background-color: #003366;
}
</style>
