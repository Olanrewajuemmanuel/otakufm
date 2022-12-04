<template>
  <div class="appinfo">
    <button @click="$emit('close-menu')">Dismiss</button>
    <h3>About this project</h3>
    <section>
      This project is intended as a web radio to listen to famous Japanese anime
      songs and intros. Inspired by my love for Japanese art and
      <a rel="nofollow" target="_blank" href="https://radio.madza.dev/"
        >Madza's project</a
      >
      <p>
        Current stations have openings from Naruto, Bleach, OP and Mob psycho
        animes. More to follow soon.
      </p>
      <p>
        Written in Vue 3.
        Free Song API from
        <a target="_blank" href="https://developer.spotify.com/"
          >Spotify API.</a
        >
        Wallpapers from <a href="#" target="_blank"> Wallhaven.</a> Icons from
        <a href="https://icons8.com/">Icons8</a> 
        <p>Hit me up for feature
        suggestions, collaborations and other stuff <a href="mailto:olalerulanre@gmail.com">here.</a></p>
      </p>
    </section>
  </div>
</template>

<style scoped>
.appinfo {
  height: 50%;
  color: white;
  word-spacing: 0.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  margin-top: 2em;
}
h3 {
  color: rgba(152, 152, 255, 0.836);
  margin: 1rem 0;
}
section {
  width: 80%;
}
section > p {
  margin-block: 1em;
}
button {
  padding: 1em;
  cursor: pointer;
}
a {
  color: var(--link);
}
</style>
