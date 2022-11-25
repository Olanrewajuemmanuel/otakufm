<script setup>
import AudioPlayIcon from "./icons/AudioPlayIcon.vue";
import AudioPauseIcon from "./icons/AudioPauseIcon.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
const store = useStore();
const isPlaying = computed(() => store.getters.getPlayingState)
console.log(isPlaying);
</script>
<template>
  <button @click="store.commit('changePlayingStatus', { status: !isPlaying })">
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
