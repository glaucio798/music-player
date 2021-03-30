<template>
  <v-container fluid class="body">
    <v-row>
      <v-col cols="12" md="6">
        <display />
      </v-col>
      <v-col class="col-playlist">
        <v-list class="py-0">
          <music
            v-for="(musica, index) in getPlaylist"
            :key="index"
            :musica="musica"
            @play="tocar(index)"
          />
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import music from "@/components/music";
import display from "@/components/display";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { music, display },
  data() {
    return {
      musicas: [
        {
          id: 0,
          titulo: "Baianinho",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/01-Baianinho.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 1,
          titulo: "Princesa",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/02-Princesa.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 2,
          titulo: "Balanço da Cama",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/03-BalancodaCama.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 3,
          titulo: "Minha Grande Amiga",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/04-MinhaGrandeAmiga.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 4,
          titulo: "Eu, a Viola e Ela",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/05-EuaViolaeEla.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 5,
          titulo: "Circuito do Amor",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/06-CircuitodoAmor.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 6,
          titulo: "Paixão Mineira",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/07-PaixaoMineira.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 7,
          titulo: "Final dos Tempos",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/08-FinaldosTempos.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 8,
          titulo: "Carreador",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/09-Carreador.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 9,
          titulo: "O Fogo e a Brasa",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/10-OFogoeaBrasa.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 10,
          titulo: "Uma Noite nao e Nada",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/11-UmaNoitenaoeNada.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 11,
          titulo: "O Mesmo Castigo",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/12-OMesmoCastigo.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 12,
          titulo: "Guerreiro do Asfalto",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/13-GuerreirodoAsfalto.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
        {
          id: 13,
          titulo: "Pais Maravilha",
          cantor: "Tião Carreiro",
          src: require("../assets/songs/14-PaisMaravilha.mp3"),
          image: require("../assets/songs/tiaocarreiro.jpg"),
        },
      ],
    };
  },
  methods: {
    tocar(index) {
      if (this.getPlaylist[index].titulo != this.getMusicaAtual.titulo)
        this.$store.commit("changeSong", index);
      this.$store.commit("playSong");
    },
  },
  created() {
    this.$store.commit("initialize");
    this.$store.commit("initializePlaylist", this.musicas);
  },
  computed: {
    ...mapGetters({
      getMusicaAtual: "musicaAtual",
      getTocando: "estaTocando",
      getPlaylist: "getPlaylist",
    }),
  },
};
</script>

<style lang="scss" scoped>
.body {
  min-height: 100vh;

  overflow: hidden;
  background-color: #65c6ff;
}

.col-playlist {
  height: 100vh;

  .v-list {
    overflow-y: auto;
    scroll-behavior: smooth;
    scrollbar-color: #ccecff #3380ac;
    scrollbar-width: thin;
    height: 100%;
    background-color: #38b3fa;
    -webkit-box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.75) !important;
    -moz-box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.75) !important;
    box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.75) !important;
  }
}
</style>
