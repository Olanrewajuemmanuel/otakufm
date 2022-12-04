<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import RadioStation from "./RadioStation.vue";
let stationMenu = ref(false);
const store = useStore();

onMounted(() =>
  store.dispatch("getPlayListData", {
    station: localStorage.getItem("playlist") || '',
  })
);
</script>
<template>
  <div class="placholder">
    <button @click="stationMenu = !stationMenu">
      <img src="../assets/station.svg" alt="Station" />
    </button>
    <nav v-if="stationMenu">
      <RadioStation @toggleMenu="stationMenu = !stationMenu" />
    </nav>
  </div>
</template>

<style scoped>
.placeholder {
  position: relative;
}
button {
  background: none;
  border: none;
  cursor: pointer;
}
button img {
  width: 60px;
  height: 60px;
}
nav {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  background: var(--background-menu);
  z-index: 99;
}
</style>
