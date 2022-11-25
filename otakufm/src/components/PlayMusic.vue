<script setup>
import AudioPlayIcon from "./icons/AudioPlayIcon.vue";
import AudioPauseIcon from "./icons/AudioPauseIcon.vue";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
let isPlaying = ref(false);
const store = useStore();

</script>
<template>
  <button @click="isPlaying = !isPlaying">
    <div v-if="isPlaying" @click="store.dispatch('pauseCurrentMusic')">
      <AudioPauseIcon />
    </div>
    <div v-else @click="store.dispatch('playCurrentMusic')">
      <AudioPlayIcon />
    </div>
  </button>
</template>

<style scoped>
button {
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>
