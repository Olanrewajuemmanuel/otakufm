<script setup>
import Header from "./components/Header.vue";
import Body from "./components/Body.vue";
import Loading from "./components/Loading.vue";
import BottomSection from "./components/BottomSection.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();

const getBgDisplay = computed(() => {
  return `background-image: url( './img/${store.getters.getCurrBgDisplay}')`;
});
const getLoadingStatus = computed(() => store.state.isLoadingResource);
</script>
<template>
  <div class="appContainer" :style="getBgDisplay">
      <Loading :loading="getLoadingStatus" />
      <Header />
      <Body />
      <BottomSection />
    </div>
</template>

<style>
.appContainer {
  font-family: "Roboto", sans-serif;
  min-height: 100vh;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  object-position: top;
  transition: background 500ms ease-in;
}
</style>
