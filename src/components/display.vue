<template>
  <v-row no-gutters align="center" style="height: 100%">
    <v-col cols="12" class="text-center">
      <v-img :aspect-ratio="1 / 1" class="mx-auto img" :src="foto"></v-img>
      <span class="text-h3">{{ getMusicaAtual.titulo }}</span> <br />
      <span class="text-h6">{{ getMusicaAtual.cantor }}</span>
    </v-col>
    <v-spacer></v-spacer>
    <v-col class="">
      <v-divider class="mb-3"></v-divider>
      <v-slider
        @change="changeTime"
        v-model="track"
        :max="duration"
        track-color="#336988"
        color="#ffffff"
      ></v-slider>
      <v-row align="center" justify="space-around" no-gutters>
        <v-avatar
          color="primary"
          :size="size.sm"
          @click="$store.commit('changeMode', 'shuffle')"
        >
          <v-icon
            dark
            :size="size.sm - size.dif"
            class="avatar"
            :class="{ ativo: getMode == 'shuffle' }"
          >
            mdi-shuffle-variant
          </v-icon>
        </v-avatar>

        <v-avatar
          color="primary"
          :size="size.sm"
          @click="$store.commit('changeMode', 'repeat')"
        >
          <v-icon
            dark
            :size="size.sm - size.dif"
            class="avatar"
            :class="{ ativo: getMode == 'repeat' }"
          >
            mdi-repeat-once
          </v-icon>
        </v-avatar>

        <v-avatar
          color="primary"
          :size="size.md"
          @click="$store.commit('prevSong')"
        >
          <v-icon dark :size="size.md - size.dif" class="avatar">
            mdi-skip-backward
          </v-icon>
        </v-avatar>

        <v-avatar
          v-if="tocando"
          :size="size.lg"
          @click="$store.commit('pauseSong')"
        >
          <v-icon class="avatar" :size="size.lg - size.dif"> mdi-pause </v-icon>
        </v-avatar>
        <v-avatar v-else :size="size.lg" @click="$store.commit('playSong')">
          <v-icon :size="size.lg - size.dif" class="avatar"> mdi-play </v-icon>
        </v-avatar>

        <v-avatar
          color="primary"
          :size="size.md"
          @click="$store.commit('nextSong')"
        >
          <v-icon dark :size="size.md - size.dif" class="avatar">
            mdi-skip-forward
          </v-icon>
        </v-avatar>

        <div class="volume">
          <v-slider
            v-model="volume"
            max="100"
            track-color="#336988"
            color="#ffffff"
            dense
            class="pt-4"
          >
            <template v-slot:prepend class="">
              <v-avatar size="25" class="avatar">
                <v-icon size="20" @click="mute">
                  {{ mutado ? "mdi-volume-off" : "mdi-volume-high" }}
                </v-icon>
              </v-avatar>
            </template>
          </v-slider>
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      volume: 0,
      mutado: false,

      size: {
        lg: 100,
        md: 70,
        sm: 40,
        dif: 10,
      },
    };
  },
  methods: {
    changeTime(newVal) {
      this.$store.commit("changeTime", newVal);
    },
    mute() {
      console.log("SA");
      this.$store.commit("mute");
      this.mutado = !this.mutado;
      this.volume = this.getPlayer.volume * 100;
    },

    sizeIcons() {
      console.log("A");
      this.size =
        window.innerWidth < 600
          ? { lg: 50, md: 35, sm: 25, dif: 5 }
          : { lg: 100, md: 70, sm: 40, dif: 10 };
    },
  },
  computed: {
    ...mapGetters({
      getMusicaAtual: "musicaAtual",
      getTocando: "estaTocando",
      getVolume: "getVolume",
      getDuration: "getDuration",
      getCurrentTime: "getCurrentTime",
      getPlayer: "getPlayer",
      getMode: "getMode",
      getPhoto: "getPhoto",
    }),
    tocando() {
      return this.getTocando;
    },
    track: {
      get: function () {
        return this.getCurrentTime ? this.getCurrentTime : 0;
      },
      set: function () {},
    },
    duration() {
      return this.getDuration ? this.getDuration : 100;
    },
    foto() {
      let src = this.getPhoto;
      return src ? src : "https://picsum.photos/id/15/500/300.jpg";
    },
  },
  watch: {
    volume: function (newVal) {
      this.$store.commit("changeVolume", newVal / 100);
    },
  },
  created() {
    this.volume = this.getVolume * 100;

    this.width = window.innerWidth;
    window.addEventListener("resize", this.sizeIcons);
  },
  destroyed() {
    window.removeEventListener("resize", this.sizeIcons);
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  cursor: pointer;
  transition: background-color 0.5s, color 0.5s !important;
  background-color: rgb(255, 255, 255) !important;
  color: black !important;

  .v-icon {
    color: black !important;
  }
}

.avatar:hover {
  background-color: #3178a1 !important;
  color: white !important;

  .v-icon {
    color: white !important;
  }
}

.ativo {
  background-color: #215370 !important;
  color: rgb(255, 255, 255) !important;
}

.volume {
  width: 130px;
}

.img {
  width: 40%;
}
</style>