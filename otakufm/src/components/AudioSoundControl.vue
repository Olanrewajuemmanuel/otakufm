<script setup>
import { useStore } from "vuex";
import AudioIcon from "./icons/AudioIcon.vue";
import AudioMutedIcon from "./icons/AudioMutedIcon.vue";
const store = useStore();
</script>

<template>
  <button @click="store.dispatch('toggleAudioSound')">
    <div v-if="!store.state.isMuted">
    <AudioIcon />
  </div>
  <div v-else>
    <AudioMutedIcon />
  </div>
  </button>
  
</template>
<style scoped>
button {
  cursor: pointer;
  border: none;
  background: none;
}
</style>
