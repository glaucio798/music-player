import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export default new Vuex.Store({
  state: {
    player: null,
    tocando: false,
    currentTime: 0,
    duration: 0,
    updateTime: null,
    musica: {
      titulo: "",
      cantor: "",
      id: 0,
    },
    mutado: {
      status: false,
      oldVol: 0,
    },
    playlist: [],
    index: null,
    mode: "normal",
    shufflePlaylist: [],
  },
  mutations: {
    initialize(state) {
      state.player = new Audio();
      state.player.onended = function () {
        let index = state.index;
        if (state.mode == "shuffle") {
          index = (index + 1) % state.shufflePlaylist.length;
          state.musica.titulo = state.shufflePlaylist[index].titulo;
          state.musica.cantor = state.shufflePlaylist[index].cantor;
          state.musica.id = state.shufflePlaylist[index].id;
          state.player.src = state.shufflePlaylist[index].src;
        } else if (state.mode == "normal") {
          index = (index + 1) % state.playlist.length;
          state.musica.titulo = state.playlist[index].titulo;
          state.musica.cantor = state.playlist[index].cantor;
          state.musica.id = state.playlist[index].id;
          state.player.src = state.playlist[index].src;
        }
        state.index = index;
        state.player.play();
        state.tocando = true;
      };
    },
    initializePlaylist(state, playlist) {
      state.playlist = playlist;
      state.shufflePlaylist = state.playlist.slice();
    },
    changeSong(state, newSong) {
      state.musica.titulo = state.playlist[newSong].titulo;
      state.musica.cantor = state.playlist[newSong].cantor;
      state.musica.id = state.playlist[newSong].id;
      state.player.src = state.playlist[newSong].src;
      state.index = newSong;
    },
    playSong(state) {
      if (!state.playlist) return;

      if (state.musica.titulo == "") {
        state.musica.titulo = state.playlist[0].titulo;
        state.musica.cantor = state.playlist[0].cantor;
        state.player.src = state.playlist[0].src;
        state.index = 0;
      }
      state.player.play();
      state.tocando = true;

      state.updateTime = setInterval(() => {
        state.currentTime = state.player.currentTime;
        state.duration = state.player.duration;
      }, 100);
    },
    pauseSong(state) {
      state.player.pause();
      state.tocando = false;
      clearInterval(state.updateTime);
    },
    nextSong(state) {
      let index = state.index;
      if (state.mode == "shuffle") {
        index = (index + 1) % state.shufflePlaylist.length;
        state.musica.titulo = state.shufflePlaylist[index].titulo;
        state.musica.cantor = state.shufflePlaylist[index].cantor;
        state.musica.id = state.shufflePlaylist[index].id;
        state.player.src = state.shufflePlaylist[index].src;
      } else {
        index = (index + 1) % state.playlist.length;
        state.musica.titulo = state.playlist[index].titulo;
        state.musica.cantor = state.playlist[index].cantor;
        state.musica.id = state.playlist[index].id;
        state.player.src = state.playlist[index].src;
      }
      state.index = index;
      state.player.play();
      state.tocando = true;
    },
    prevSong(state) {
      let index = state.index;
      index = index - 1;

      if (state.mode == "shuffle") {
        index = index < 0 ? state.shufflePlaylist.length - 1 : index;
        state.musica.titulo = state.shufflePlaylist[index].titulo;
        state.musica.cantor = state.shufflePlaylist[index].cantor;
        state.musica.id = state.shufflePlaylist[index].id;
        state.player.src = state.shufflePlaylist[index].src;
      } else {
        index = index < 0 ? state.playlist.length - 1 : index;
        state.musica.titulo = state.playlist[index].titulo;
        state.musica.cantor = state.playlist[index].cantor;
        state.musica.id = state.playlist[index].id;
        state.player.src = state.playlist[index].src;
      }
      state.index = index;
      state.player.play();
      state.tocando = true;
    },
    changeVolume(state, newVol) {
      state.player.volume = newVol;
    },
    changeTime(state, newTime) {
      clearInterval(state.updateTime);
      state.player.currentTime = newTime;
      state.updateTime = setInterval(() => {
        state.currentTime = state.player.currentTime;
        state.duration = state.player.duration;
      }, 100);
    },
    mute(state) {
      if (!state.mutado.status) {
        state.mutado.status = true;
        state.mutado.oldVol = state.player.volume;
        state.player.volume = 0;
      } else {
        state.mutado.status = false;
        state.player.volume = state.mutado.oldVol;
      }
    },
    changeMode(state, newMode) {
      state.mode = newMode == state.mode ? "normal" : newMode;
      console.log(state.index);

      if (state.mode == "shuffle") {
        shuffleArray(state.shufflePlaylist);
      } else {
        state.index = state.playlist.indexOf(
          state.shufflePlaylist[state.index]
        );
      }
      console.log(state.playlist, state.mode);
      console.log(state.index);
    },
  },
  getters: {
    musicaAtual(state) {
      return state.musica;
    },
    estaTocando(state) {
      return state.tocando;
    },
    getPlaylist(state) {
      return state.playlist;
    },
    getVolume(state) {
      return state.player.volume;
    },
    getDuration(state) {
      return state.duration;
    },
    getCurrentTime(state) {
      return state.currentTime;
    },
    getPlayer(state) {
      return state.player;
    },
    getMode(state) {
      return state.mode;
    },
    getPhoto(state) {
      if (!state.index) return null;

      if (state.mode == "shuffle") {
        return state.shufflePlaylist[state.index].image;
      } else {
        return state.playlist[state.index].image;
      }
    },
  },
  actions: {},
  modules: {},
});
