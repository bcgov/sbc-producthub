<template>
  <button type="button" className="buttonClasses">
    <slot>{{ text }}</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Colors, Sizes } from '~/enums/ButtonEnum';


export default defineComponent({
  props: {
    color: {
      type: String as PropType<Colors>,
      required: false,
    },
    size: {
      type: String as PropType<Sizes>,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    buttonClasses(): string {
      return `font-bold ${this.text}`;
    },
  },
  data() {
    return {
      sizes: {
        [Sizes.Md]: 'px-4 py-2 rounded-md text-base',
        [Sizes.Lg]: 'px-5 py-3 rounded-lg text-lg',
      },
      colors: {
        [Colors.Indigo]: 'bg-indigo-500 hover:bg-indigo-600 text-white',
        [Colors.Cyan]: 'bg-cyan-600 hover:bg-cyan-700 text-white',
      },
      // text: {
      //   [Texts.Sans]: 'font-sans',
      //   [Texts.SanSerif]: 'font-serif'
      // }
    };
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
  font-family: Noto Sans;
  font-size: 14px;
  color: #ffffff;
  text-decoration: none solid rgb(255, 255, 255);
  text-align: center;
}

/* .btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
} */
</style>
