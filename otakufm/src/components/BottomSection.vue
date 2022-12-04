<script setup>
import FlexContentAround from "./FlexContentAround.vue";
import AudioSoundControl from "./AudioSoundControl.vue";
import SongQueue from "./SongQueue.vue";
import AudioTimeControl from "./AudioTimeControl.vue";
</script>
<template>
  <div class="bottom">
    <FlexContentAround>
      <AudioSoundControl />
      <AudioTimeControl />
        <SongQueue />
    </FlexContentAround>
  </div>
</template>

<style scoped>
.bottom {
  margin: 0;
  padding-inline: 1.5em;
}
</style>
