<script setup>
import PlayMusic from "./PlayMusic.vue";
import FlexContentAround from "./FlexContentAround.vue";
import ForwardMusic from "./ForwardMusic.vue";
import PreviousMusic from "./PreviousMusic.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const getName = computed(() => store.getters.getCurrSongName);
const classObj = {
  marquee: getName.length > 30,
  title: true,
};
</script>
<template>
  <div class="body">
    <div class="w-sm container">
      <FlexContentAround>
        <PreviousMusic />
        <PlayMusic />
        <ForwardMusic />
      </FlexContentAround>

      <p :class="{ classObj }">{{ getName }}</p>
    </div>
  </div>
</template>

<style scoped>
.body {
  height: 75vh;
  display: flex;
}
.w-sm {
  margin: 0 auto;
  width: 80%;
}
button {
  border: none;
  background: none;
  cursor: pointer;
}
.container {
  position: relative;
  margin: 0 auto;
}
.container p {
  color: white;
  font-weight: bold;
  font-size: 1.2em;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, 60%);
  max-width: 300px;
}
.marquee {
  animation: marquee 20s ease-in infinite forwards;
}
@keyframes marquee {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
