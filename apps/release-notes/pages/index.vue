<script setup lang="ts">
// const { data } = await useFetch('/api/hello')
// console.log(data)
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core'

// Get the API key from environment variables
const apiKey = process.env.ZENHUB_APIKEY
if (!apiKey) {
  console.error('API key is missing in the environment variables.')
  process.exit(1) // Exit the application if the API key is missing
}

const client = new ApolloClient({
  uri: 'https://api.zenhub.com/public/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${apiKey}`
  }
})

async function getReport (ghId: number[]) {
  try {
    const result = await client.query({
      query: gql`
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
      `,
      variables: {
        repositoryGhId: ghId
      }
    })

    return result.data.repositoriesByGhId[0].releases
  } catch (error) {
    console.error(error)
    throw error
  }
}

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
