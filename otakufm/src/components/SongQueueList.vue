<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const emit = defineEmits(['closeMenu'])
const currentlyPlayingId = store.state.currSongIndex
const selectMusic = (id) => {
  store.dispatch('changeMusic', { id, actionType: null })
  store.commit('changePlayingStatus', { status: true })
  emit('closeMenu')

}

const songQueue = computed(() => store.getters.getSongQueue);
</script>
<template>
  <div>
    <button @click="$emit('closeMenu')">Close menu</button>
    <div v-for="(details, i) in songQueue" class="song" role="navigation" @click="selectMusic(i)">
      <h3 :class="{ activeTrack: currentlyPlayingId == i }">{{ details.songName }}</h3>
      <small>{{ details.artistName }}</small>
    </div>
  </div>
</template>

<style scoped>
.song {
  cursor: pointer;
  transition: color 500ms ease-out;
}
.activeTrack {
  color: rgb(255, 124, 124);
}
.song:hover h3 {
  color: rgb(100, 100, 100);
}
button {
  padding: 1em;
  cursor: pointer;
}
div {
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h3 {
  color: white;
}
small {
  color: #949fff;
}
</style>
