<template>
  <div>
    <v-row no-gutters align="center" class="px-5 py-5 body">
      <v-avatar v-if="tocando" @click="$store.commit('pauseSong')" class="mr-3">
        <v-icon class="avatar"> mdi-pause </v-icon>
      </v-avatar>
      <v-avatar v-else @click="$emit('play', musica)" class="mr-3">
        <v-icon class="avatar"> mdi-play </v-icon>
      </v-avatar>
      <v-col>
        <span>{{ musica.titulo }}</span>
        <v-spacer></v-spacer>
        <span>{{ musica.cantor }}</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    musica: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getMusicaAtual: "musicaAtual",
      getTocando: "estaTocando",
    }),
    tocando() {
      return this.getMusicaAtual.id == this.musica.id && this.getTocando;
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  background-color: transparent;
  border-top: 1px solid #46a9e2;
  border-bottom: 1px solid #46a9e2;
}

.body:hover {
  background-color: #4ebeff;
}

.avatar {
  cursor: pointer;
  transition: background-color 0.5s, color 0.5s !important;
  background-color: rgb(255, 255, 255) !important;
  color: black !important;
}

.avatar:hover {
  background-color: rgb(0, 0, 0) !important;
  color: rgb(255, 255, 255) !important;
}
</style>