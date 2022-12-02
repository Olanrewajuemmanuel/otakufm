<script setup>
import { ref } from "vue";
import SettingsIcon from "./icons/SettingsIcon.vue";
import SettingsDisplay from "./SettingsDisplay.vue";

const isMenuOpen = ref(false);
</script>
<template>
  <div class="settings">
    <button @click="(isMenuOpen = !isMenuOpen)">
      <SettingsIcon />
    </button>
    <div class="settings-area" v-if="isMenuOpen">
      <SettingsDisplay @close-menu="(isMenuOpen = false)" />
    </div>
  </div>
</template>

<style>
.settings > button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
