<script setup>
import { onUpdated, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const currAudioPlayer = store.getters.getCurrAudioPlayer
const trackCtrl = ref(null)
currAudioPlayer.ontimeupdate = () => {
    const lengthPercent = (currAudioPlayer.currentTime / currAudioPlayer.duration) * 100
    trackCtrl.value.style.left = `${lengthPercent}%`
}
const changeCurrTime = (event) => {
    const trackElemLength = event.currentTarget.clientWidth 
    const mousePos = event.offsetX
    const duration = currAudioPlayer.duration
    currAudioPlayer.currentTime = (mousePos/trackElemLength) * duration
    
}

</script>

<template>
    <div>
        <div class="track" @click="(event) => changeCurrTime(event)">
            <span class="track-ctrl" ref="trackCtrl"></span>
        </div>
    </div>
</template>

<style scoped>
.track {
    height: 2px;
    min-width: 100px;
    max-width: 100%;
    background: white;
    cursor: pointer;
    position: relative;

    display: flex;
    align-items: center;
}

.track-ctrl {
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    transition: all ease-out 200ms;
}
.track-ctrl:hover {
    scale: 1.1;
}
</style>