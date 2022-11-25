<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import RadioStation from "./RadioStation.vue";
let stationMenu = ref(false);
const store = useStore();

onMounted(() => store.dispatch("getPlayListData", { station: '' })); // TODO: load from localStorage
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
}
nav {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  padding: 0;
  background: rgb(22, 15, 15);
  z-index: 99;
}
</style>
