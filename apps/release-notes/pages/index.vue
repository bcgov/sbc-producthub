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
    import { ApolloClient, InMemoryCache, gql, WatchQueryOptions } from '@apollo/client/core';

// Get the API key from environment variables
const apiKey = process.env.ZENHUB_APIKEY;
if (!apiKey) {
  console.error("API key is missing in the environment variables.");
  process.exit(1); // Optionally, exit the application if the API key is missing
}

const client = new ApolloClient({
  uri: 'https://api.zenhub.com/public/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${apiKey}`
  }
});

const GET_REPORT = gql`
        query getRepositoryReleaseReports($repositoryGhId: [Int!]!) {
          repositoriesByGhId(ghIds: $repositoryGhId) {
            id
            releases(first: 50) {
              nodes {
                id
                title
                description
                startOn
                endOn
                issues(first: 50) {
                  nodes {
                    id
                    title
                    number
                  }
                }
              }
            }
          }
        }
`;

// function getReport() {
//     const {loading, error, data} = useQuery(GET_REPORT, {variables: [157936592, 222018242]});
//     if (loading) return null;
//     if (error) return 'Error! ${error}';
//     return data
// }

apollo: {
    report: {
        query: gql`query getRepositoryReleaseReports($repositoryGhId: [Int!]!) {
          repositoriesByGhId(ghIds: $repositoryGhId) {
            id
            releases(first: 50) {
              nodes {
                id
                title
                description
                startOn
                endOn
                issues(first: 50) {
                  nodes {
                    id
                    title
                    number
                  }
                }
              }
            }
          }
        }`
        variables: {
            repositoryGhId: [157936592, 222018242]
        }
    }
    
}

// console.log(getReport())
</script>

<template>
    <!-- <pre>{{ data }}</pre> -->
    <NuxtLink to="/home">{{ data.hello }}</NuxtLink>
    <h1>Hi</h1>
</template>
   