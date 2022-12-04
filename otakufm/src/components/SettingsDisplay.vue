<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { BG_CHANGE } from "../store/mutation";

const emit = defineEmits(["close-menu"]);

const store = useStore();
const pageSession = ref({
    useSession: ref(true),
    useLastBg: ref(true),
})

const bgPaths = computed(() => {
    let list = store.getters.getCurrBgList
    return list.map(path => `background-image: url( './img/${path}.png')`)
});
function changeBg(index) {
    let selectedImg = store.getters.getCurrBgList[index]
    store.commit(BG_CHANGE, { image: selectedImg })
    emit('close-menu')

}
</script>

<template>
  <nav>
    <button @click="$emit('close-menu')">Close settings</button>
    <div class="bg-container">
      <!-- bg change -->
      <h2>Change background</h2>
      <div class="boxes">
              <div :class="['box', { activeBg: store.state.currBgDisplay == store.getters.getCurrBgList[index] }]" v-for="(path, index) in bgPaths" :style="path" @click="changeBg(index)"></div>

      </div>
    </div>
    <div>
      <!-- last station & bg -->
      <p>On first page load:</p>
      <p>
        <label for="last-session">use last session</label>
        <input type="checkbox" name="last-session" v-model="pageSession.useSession" />
      </p>
      <p>
        <label for="last-bg">use last background</label>
        <input type="checkbox" name="last-bg" v-model="pageSession.useLastBg" />
      </p>
    </div>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  background: var(--background);
  z-index: 99;
  color: white;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
button {
  padding: 1em;
  cursor: pointer;
}
.box {
  width: 100px;
  height: 100px;
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 0.2em;
  margin: 10px 20px;
  outline: 2px solid white;
  cursor: pointer;
  flex: 1 0 calc(100%/3);
  flex-grow: 0;
}
.boxes {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.activeBg {
  outline: 2px solid rgb(86, 86, 88);
}
.box:hover {
  opacity: 0.8;
}
.bg-container h2 {
  padding: 1em 0;
  text-align: center;
}
p {
    padding: .2em;
}
p:first-child {
    font-weight: bold;
}
input[type='checkbox'] {
    cursor: pointer;
}

</style>
