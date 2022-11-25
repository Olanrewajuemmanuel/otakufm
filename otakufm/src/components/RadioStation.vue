<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { STATION_CHANGE } from "../store/mutation";

const emit = defineEmits(['toggleMenu'])
const store = useStore();
const availStations = ref([
  { label: "OP", name: 'One Piece Openings' },
  { label: "BL", name: "Bleach Openings" },
  { label: "NAR", name: "Naruto Openings" },
  { label: "MOB", name: "Mob Psycho 100 Openings" },
]);

function changeStation(label) {
  store.dispatch("pauseCurrentMusic") // pause music
  store.dispatch("getPlayListData", { station: label })
  emit('toggleMenu')

}

</script>
<template>
  <div>
    <h2>Available stations</h2>
    <button @click="$emit('toggleMenu')">Close menu</button>
    <li v-for="station in availStations" :key="station.label">
      <a href="#" @click.stop="changeStation(station.label)">{{ station.name }}</a>
    </li>
  </div>
</template>

<style scoped>
div {
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;
}
button {
  padding: 1em;
  cursor: pointer;
}
h2 {
  color: white;
  font-weight: normal;
  letter-spacing: 2px;
}
li {
  list-style: none;
  font-size: 1.5rem;
}
li a {
  text-decoration: underline;
  color: #949fff;

}
li a:hover {
  opacity: .8;
}
</style>