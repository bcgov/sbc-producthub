<!-- <template>
    <div>
        <h1>BC Registries Status Dashboard</h1>
        <p>{{date}}</p>
        <VueTable :headers="header" :data="data" :keys="keys" />
        <NuxtLink to="/home">Home page</NuxtLink>
        <pre>{{ data }}</pre>
        <h1>Hi</h1>
    </div>
    
</template>

<script setup>
import { VueTable  } from "@harv46/vue-table"
import "@harv46/vue-table/dist/style.css"

const header = ["Application", "Release Version", "Release Note", "Status"]
const keys=["application", "version", "note", "status"]

const data = [{
    application: "Example Name 1",
    version: 2,
    note: "Note 1",
    status: "Done"
}, {
    application: "Example Name 2",
    version: 1,
    note: "Note 2",
    status: "Bug"
}]
const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
const {data} = await useFetch('/api/hello')
console.log({data})
</script>

   -->

<script setup lang="ts">
    const { data } = await useFetch('/api/hello')
    console.log(data)
</script>

<template>
    <!-- <pre>{{ data }}</pre> -->
    <NuxtLink to="/home">{{ data.hello }}</NuxtLink>
    <h1>Hi</h1>
</template>
   