<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const songQueue = computed(() => store.getters.getSongQueue)
</script>
<template>
    <div>
         <div v-for="details in songQueue">
        <h3>{{ details.songName }}</h3>
        <small>{{ details.artistName }}</small>
  </div>
    </div>
 
  
</template>

