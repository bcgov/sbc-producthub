<template>
  <div>
    <head>
      <link href="/dist/output.css" rel="stylesheet">
    </head>
    <header>
      <navbar />
    </header>
    <div class="home">
      <div class="title">
        <h1 class="text-3xl font-bold underline">BC Registries Status Dashboard</h1>
        <p>{{ date }}</p>
      </div>
      <VueTable :headers="header" :data="data" :keys="keys">
        <template #th>
          <th>
            Open
          </th>
        </template>
        <template #td>
          <td>
            <NuxtLink to="/releases">
              <button>
                Open
              </button>
            </NuxtLink>
          </td>
        </template>
      </VueTable>
    </div>
  </div>
</template>

<script setup>
import { VueTable } from '@harv46/vue-table'
import '@harv46/vue-table/dist/style.css'
import navbar from '~/components/navbar.vue'
const header = ['Application', 'Release Version', 'Release Note', 'Status']
const keys = ['application', 'version', 'note', 'status']
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
  background-color: #e2e8ee;
  width: 176px;
  height: 24px;
  font-family: Noto Sans;
  font-size: 18px;
  color: #212529;
  text-decoration: none solid rgb(33, 37, 41);
}

td {
  width: 176px;
  height: 90px;
  border-top-width: 1px;
  border-style: solid;
  border-color: #dee2e6;
  background-color: #ffffff;
  background-size: cover;
}

button {
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
</style>
