import { createStore } from "vuex";
import { BL_bg, MOB_bg, NAR_bg, OP_bg } from "../components/api/backgroundList";
import { fetchPlaylistData } from "../components/api/OtakuFMAPI";
import { playlistIDArray } from "../components/api/playlistID";
import {
  BACKWARD,
  BG_CHANGE,
  FORWARD,
  INCREMENT,
  PLAYLIST_FETCH,
  STATION_CHANGE,
} from "./mutation";

function getRandomIndexFromList(list) {
  return Math.floor(Math.random() * list.length);
}

const store = createStore({
  state() {
    return {
      counter: 0,
      currStation: "", // OP, BL, NAR, MOB
      currPlaylist: [],
      currBgDisplay: "",
      audioPlayer: null,
      currSongIndex: 0,
      currSongInfo: {},
      musicIsPlaying: false,
      isLoadingResource: false,
      isMuted: false,
    };
  },
  mutations: {
    [INCREMENT](state, payload) {
      if (payload) {
        state.counter += payload.amount;
      } else {
        state.counter += 1;
      }
    },
    [STATION_CHANGE](state, payload) {
      state.currStation = payload.name;
    },
    [PLAYLIST_FETCH](state, payload) {
      state.currPlaylist = payload.playListData;
    },
    [BG_CHANGE](state, payload) {
      if (payload) {
        state.currBgDisplay = payload.image;
      } else {
        // no image given
        if (state.currStation == "OP") {
          state.currBgDisplay = OP_bg[getRandomIndexFromList(OP_bg)];
        } else if (state.currStation == "BL") {
          state.currBgDisplay = BL_bg[getRandomIndexFromList(BL_bg)];
        } else if (state.currStation == "NAR") {
          state.currBgDisplay = NAR_bg[getRandomIndexFromList(NAR_bg)];
        } else if (state.currStation == "MOB") {
          state.currBgDisplay = MOB_bg[getRandomIndexFromList(MOB_bg)];
        }
      }
    },
    makeAudio(state, { audioPlayer }) {
      state.audioPlayer = audioPlayer;
    },
    changeCurrSong(state, payload) {
      state.currSongInfo = payload;
    },
    changeCurrSongIndex(state, payload) {
      state.currSongIndex = payload.id;
    },
    changePlayingStatus(state, { status }) {
      state.musicIsPlaying = status;
    },
    setIsLoadingState(state, { status }) {
      state.isLoadingResource = status;
    },
    changeMuteStatus(state, { status }) {
      state.isMuted = status;
    },
  },
  getters: {
    getCounter(state) {
      return state.counter;
    },
    getSongQueue(state) {
      const queue =
        state.currPlaylist.items &&
        state.currPlaylist.items.map((playlistTrack) => {
          return {
            artistName: playlistTrack.track.artists[0].name,
            songName: playlistTrack.track.name,
            streamUrl: playlistTrack.track.preview_url,
          };
        });
      return queue;
    },
    getCurrBgDisplay(state) {
      return state.currBgDisplay + ".png";
    },
    getCurrSongName(state) {
      return state.currSongInfo.songName;
    },
    getPlayingState(state) {
      return state.musicIsPlaying;
    },
    getCurrAudioPlayer(state) {
      return state.audioPlayer;
    },
    getCurrBgList(state) {
      let curr_list = [];
      if (state.currStation == "OP") {
        curr_list = OP_bg;
      } else if (state.currStation == "BL") {
        curr_list = BL_bg;
      } else if (state.currStation == "NAR") {
        curr_list = NAR_bg;
      } else if (state.currStation == "MOB") {
        curr_list = MOB_bg;
      }
      return curr_list;
    },
  },
  actions: {
    async getPlayListData(context, payload) {
      if (payload.station == "") {
        // user first visit
        context.commit(STATION_CHANGE, {
          name: playlistIDArray[0].name,
        });
      } else {
        context.commit(STATION_CHANGE, { name: payload.station });
      }
      const currPlayListID = playlistIDArray.find(
        (obj) => obj.name == context.state.currStation
      ).id;
      context.commit("setIsLoadingState", { status: true }); // loading
      const playListData = await fetchPlaylistData(currPlayListID);
      context.commit(PLAYLIST_FETCH, { playListData }); // update state
      context.state.currSongIndex = 0; // revert to start of queue. bad method!
      // create audio player
      context.dispatch("createAudioPlayer");
      context.commit("setIsLoadingState", { status: false });
      context.commit(BG_CHANGE);
      context.dispatch("storeSession", {
        image: context.state.currBgDisplay,
        playlistID: context.state.currStation,
      });
    },
    createAudioPlayer(context) {
      const songQueue = context.getters.getSongQueue;

      const currPlayer = context.state.audioPlayer || new Audio(); // use existing player or create new
      const currSongIndex = context.state.currSongIndex;

      // commit current song to state for further use.
      const currSongInfo = songQueue[currSongIndex];
      store.commit("changeCurrSong", currSongInfo);

      currPlayer.src = songQueue[currSongIndex].streamUrl;
      store.commit("makeAudio", { audioPlayer: currPlayer });
    },
    pauseCurrentMusic(context) {
      context.state.audioPlayer.pause();
      store.commit("changePlayingStatus", { status: false });
    },
    playCurrentMusic(context) {
      context.state.audioPlayer.play();
      store.commit("changePlayingStatus", { status: true });
    },
    changeMusic({ dispatch, state, getters, commit }, { id }) {
      commit("changeCurrSongIndex", { id }); // chg curr song index
      dispatch("createAudioPlayer"); // create audio player
      dispatch("playCurrentMusic"); // play
    },
    prevOrForwardMusic({ commit, state, dispatch, getters }, { actionType }) {
      let currId = state.currSongIndex;
      const songQueueList = getters.getSongQueue.length;
      if (actionType === FORWARD) {
        if (currId + 1 <= songQueueList)
          commit("changeCurrSongIndex", { id: currId + 1 }); // chg curr song index if within queue range
      } else if (actionType === BACKWARD) {
        if (currId - 1 > 0) commit("changeCurrSongIndex", { id: currId - 1 });
      }
      dispatch("createAudioPlayer"); // create audio player
      dispatch("playCurrentMusic"); // play
    },
    toggleAudioSound({ state, commit }) {
      const currPlayer = state.audioPlayer;
      currPlayer.muted = !state.isMuted;
      commit("changeMuteStatus", { status: !state.isMuted });
    },
    storeSession({ state, commit }, { image, playlistID }) {
      window.localStorage.setItem("image", image);
      window.localStorage.setItem("playlist", playlistID);
    },
  },
});

export default store;
