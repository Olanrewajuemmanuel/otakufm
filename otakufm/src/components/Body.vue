<script setup>
import PlayMusic from "./PlayMusic.vue";
import FlexContentAround from "./FlexContentAround.vue";
import ForwardMusic from "./ForwardMusic.vue";
import PreviousMusic from "./PreviousMusic.vue";
</script>
<template>
  <div class="body">
    <div class="w-sm">
      <FlexContentAround>
        <PreviousMusic />
        <PlayMusic />
        <ForwardMusic />
      </FlexContentAround>
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
</style>
