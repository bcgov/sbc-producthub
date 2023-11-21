<template>
    <h1>
        hello
    </h1>
    <h2>
        {{ id }}
    </h2>
</template>

<script lang="ts">
 export default {
    data(){
        const id = 1
        return {
            id
        }
    }
    
 }
</script>

