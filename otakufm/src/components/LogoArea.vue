<script setup>
import AppInfoIcon from "./icons/AppInfoIcon.vue";
import AppInfo from "./AppInfo.vue";
import { ref } from "vue";

const isMenuOpen = ref(false);
</script>
<template>
  <div class="logo-wrapper">
    <div>
      <h1>
        OtakuFM
        <span class="icon" @click="isMenuOpen = !isMenuOpen"
          ><AppInfoIcon
        /></span>
      </h1>
      <div class="app-info" v-if="isMenuOpen">
        <AppInfo @close-menu="isMenuOpen = false" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-info {
  position: absolute;
  inset: 0 0 0 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  background: rgb(22, 15, 15, .85);
  z-index: 99;
}
h1 {
  font-size: 2rem;
  font-weight: normal;
  color: white;
  position: relative;
}
.icon {
  position: absolute;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  left: 98%;
  top: -10%;
}
.icon > * {
  width: 10px;
  height: 10px;
}
</style>
