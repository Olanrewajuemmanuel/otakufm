<script setup>
import AppInfoIcon from "./icons/AppInfoIcon.vue";
</script>
<template>
  <div>
    <h1>OtakuFM</h1>
    <span class="icon"><AppInfoIcon /></span>
  </div>
</template>

<style scoped>
div {
    position: relative;
}
h1 {
    font-size: 2.5rem;
    font-weight: normal;
    color: white;
}
.icon {
    display: block;
    position: absolute;  
    left: 100%;
    top: 0;
    border-radius: 50%;
    background-color: transparent;
}
.icon > * {
    width: 10px;
    height: 10px;
}
</style>
