<template>
  <div>
    <md-list class="md-double-line">
      <span class="md-text">
        <b>Top tracks for "{{tag}}"</b>
      </span>
      <br>
      <md-divider></md-divider>
      <div v-for="song in songs" :key="song.url">
        <md-list-item>
          <div class="md-list-item-text">
            <span>{{song.name}}</span>
            <span>{{song.artist.name}}</span>
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
      tag: this.$route.params.name,
      songs: []
    };
  },
  created: function() {
    DataService.getTags(this.tag).then(data => {
      this.songs = data.data.tracks.track;
      //console.log(data);
    });
  }
};
</script>

<style>
</style>