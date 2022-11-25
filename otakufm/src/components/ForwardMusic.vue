<script setup>
import { useStore } from 'vuex';
import { FORWARD } from '../store/mutation';
import ForwardIcon from './icons/ForwardIcon.vue';
const store = useStore()

</script>

<template>
    <button @click="$store.dispatch('prevOrForwardMusic', { actionType: FORWARD })">
        <ForwardIcon />
    </button>
</template>

