<template>
  <button type="button" className="buttonClasses">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';


export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style>
.buttonClasses {
  width: 88px ;
  height: 34px;
  border-radius: 4px;
  background-color: #1669bb;
  background-size: cover;
  font-size: 14px;
  color: #ffffff;
  text-decoration: none solid rgb(255, 255, 255);
  text-align: center;
}
</style>
