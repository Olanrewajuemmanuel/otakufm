import { createStore } from "vuex";
import { BL_bg, MOB_bg, NAR_bg, OP_bg } from "../components/api/backgroundList";
import { fetchPlaylistData } from "../components/api/OtakuFMAPI";
import { playlistIDArray } from "../components/api/playlistID";
import {
  BG_CHANGE,
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
    [BG_CHANGE](state) {
      if (state.currStation == "OP") {
        state.currBgDisplay = OP_bg[getRandomIndexFromList(OP_bg)];
      } else if (state.currStation == "BL") {
        state.currBgDisplay = BL_bg[getRandomIndexFromList(BL_bg)];
      } else if (state.currStation == "NAR") {
        state.currBgDisplay = NAR_bg[getRandomIndexFromList(NAR_bg)];
      } else if (state.currStation == "MOB") {
        state.currBgDisplay = MOB_bg[getRandomIndexFromList(MOB_bg)];
      }
    },
    makeAudio(state, { audioPlayer }) {
      state.audioPlayer = audioPlayer
    },
    changeCurrSong (state, payload) {
      state.currSongInfo = payload
    },
    changeCurrSongIndex(state, payload) {
      state.currSongIndex = payload.id
    }
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
      return state.currSongInfo.songName
    }
  },
  actions: {
    async getPlayListData(context, payload) {
      if (context.state.currStation == "")
        context.commit(STATION_CHANGE, {
          name: playlistIDArray[0].name,
        }); // chg station to first available station (initial render)
      else {
        context.commit(STATION_CHANGE, { name: payload.station });
      }
      const currPlayListID = playlistIDArray.find(
        (obj) => obj.name == context.state.currStation
      ).id
      const playListData = await fetchPlaylistData(currPlayListID);
      context.commit(PLAYLIST_FETCH, { playListData }); // update state
      // create audio player
      context.dispatch("createAudioPlayer")
      context.commit(BG_CHANGE) // chg background
    },
    createAudioPlayer(context) {
      const songQueue = context.getters.getSongQueue
      const currPlayer = new Audio()
      const currSongIndex = context.state.currSongIndex

      // commit current song to state for further use.
      const currSongInfo = songQueue[currSongIndex]
      store.commit('changeCurrSong', currSongInfo)
     
      currPlayer.src = songQueue[currSongIndex].streamUrl
      store.commit('makeAudio', { audioPlayer: currPlayer })
    },
    pauseCurrentMusic(context) {
      context.state.audioPlayer.pause()
    },
    playCurrentMusic(context) {

      context.state.audioPlayer.play()
    },
    changeMusic({ dispatch, state, getters, commit }, { id }) {
      commit('changeCurrSongIndex', { id, }) // chg curr song index
      dispatch('createAudioPlayer') // create audio player
      dispatch('playCurrentMusic') // play
    }
  },
});

export default store;
