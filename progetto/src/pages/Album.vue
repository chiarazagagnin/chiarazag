<template>
  <div>
    <md-list class="md-double-line">
      <span class="md-text">
        <b>Top tracks for "{{album}}"</b>
      </span>
      <br>
      <md-divider></md-divider>
      <div v-for="song in songs" :key="song.name">
        <md-list-item>
          <div class="md-list-item-text">
            <span>{{song.name}}</span>
          </div>
        </md-list-item>
        <md-divider></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
import DataService from "../dataservice";
export default {
  data: function() {
    return {
      album: this.$route.params.name,
      songs: []
    };
  },
  created: function() {
    DataService.getAlbumInfo(this.album).then(data => {
      this.songs.push(data.data.tracks);
    });
  }
};
</script>

<style>
</style>
