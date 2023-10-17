<template>
    <div class="rec">
      <img src="../assets/images/gov_bc_logo_horiz.b6e98a7.png" alt="Logo">
      <h2>BC Registries and Online Services</h2>
    </div>
</template>

<!-- <script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NavBar
</script> -->

<style>
.rec {
  height: 53px;
  color: white;
  background-color: #003366;
  display: flex ;
}

.rec > img {
  margin-left: 10%;
  resize: both;
}

.rec > h2 {
  flex-direction: column;
  margin-left: 20px;
  align-self: center;
}
</style>