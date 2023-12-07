<template>
  <NuxtLink to="https://www.bcregistry.gov.bc.ca/">
    <div class="rec">
      <img src="../assets/images/gov_bc_logo_horiz.b6e98a7.png" alt="Logo">
      <h2>BC Registries and Online Services</h2>
    </div>
  </NuxtLink >
</template>

<style>
.rec {
  height: 53px;
  color: white;
  background-color: #003366;
  display: flex ;
}

.rec > img {
  margin-left: 5%;
  resize: both;
  scale: 80%;
}

.rec > h2 {
  flex-direction: column;
  margin-left: 20px;
  align-self: center;
}
</style>