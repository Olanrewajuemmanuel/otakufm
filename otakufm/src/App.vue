<script setup>
import Header from "./components/Header.vue";
import Body from "./components/Body.vue";
import Loading from "./components/Loading.vue";
import BottomSection from "./components/BottomSection.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { FORWARD } from "./store/mutation";

const store = useStore();

const getBgDisplay = computed(() => {
  return `background-image: url( './img/${store.getters.getCurrBgDisplay}')`;
});
const getLoadingStatus = computed(() => store.state.isLoadingResource);
const currentAudioPlayer = computed(() => store.getters.getCurrAudioPlayer);

onMounted(() => {
  currentAudioPlayer.value &&
    currentAudioPlayer.value.addEventListener("ended", () => {
      store.dispatch("prevOrForwardMusic", { actionType: FORWARD });
    });
});
</script>
<template>
  <div class="appContainer" :style="getBgDisplay">
    <div class="inner">
      <Loading :loading="getLoadingStatus" />
      <Header />
      <Body />
      <BottomSection />
    </div>
  </div>
</template>

<style>
.appContainer {
  font-family: "Roboto", sans-serif;
  min-height: 100vh;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left center;
  object-position: top;
  transition: background 700ms ease-in;
}
.appContainer > .inner {
  background: rgba(70, 0, 0, 0.5);
  height: 100vh;
}
@media (max-width: 576px) {
  .appContainer {
    background-position: center center;
  }
}
</style>
