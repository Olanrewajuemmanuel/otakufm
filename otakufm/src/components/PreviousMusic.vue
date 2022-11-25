<script setup>
import { useStore } from "vuex";
import { BACKWARD } from "../store/mutation";
import PreviousIcon from "./icons/PreviousIcon.vue";
const store = useStore();
</script>

<template>
  <button
    @click="$store.dispatch('prevOrForwardMusic', { actionType: BACKWARD })"
  >
    <PreviousIcon />
  </button>
</template>
