<script setup>
import { ref } from "vue";
import SongQueueIcon from "./icons/SongQueueIcon.vue";
import SongQueueList from "./SongQueueList.vue";

let toggleListState = ref(false)
</script>

<template>
  <button @click="toggleListState = !toggleListState">
    <SongQueueIcon />
  </button>
  <nav class="list" v-if="toggleListState">
    <SongQueueList @closeMenu="toggleListState = false" />
  </nav>
</template>

<style scoped>
button {
  border: none;
  background: none;
  cursor: pointer;
}
nav.list {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  background: rgb(22, 15, 15);
  z-index: 99;
}

</style>

