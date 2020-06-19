<template>
  <div>
    <div>
      <md-list class="md-double-line">
        <span class="md-text">
          <b>Top artists</b>
        </span>
        <br>
        <md-divider></md-divider>
        <md-list-item v-for="info in infos" :key="info.name" @click="artista(info.name)">
          <div class="md-list-item-text">
            <span>{{info.name}}</span>
            <span>Tags: {{info.tags.tag[0].name}}, {{info.tags.tag[1].name}}, {{info.tags.tag[2].name}}, {{info.tags.tag[3].name}}</span>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon>favorite</md-icon>
          </md-button>
          <md-divider></md-divider>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
import DataService from "../dataservice";
export default {
  data: function() {
    return {
      artists: [],
      infos: []
    };
  },
  created: function() {
    DataService.getTopArtists().then(data => {
      //console.log(data.data.artists.artist.length);
      data.data.artists.artist.forEach(element => {
        this.artists.push(element.name);
      });
      this.artists.forEach(el => {
        DataService.getArtistInfo(el).then(datas => {
          //console.log(datas);
          this.infos.push(datas.data.artist);
          //console.log(this.infos);
        });
      });
    });
  },
  methods: {
    artista(person) {
      this.$router.push("/artist/" + person);
    }
  }
};
</script>

<style>
</style>
