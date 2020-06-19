<template>
  <div class="md-layout md-gutter">
    <div>
      <span class="md-title">New Releases</span>
    </div>
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-xsmall-size-100"
      v-for="album in albums"
      :key="album.id"
    >
      <md-card md-with-hover>
        <md-card-header>
          <div class="md-title">{{album.name}}</div>
        </md-card-header>
        <md-card-media>
          <img :src="album.images[0].url">
        </md-card-media>
        <md-card-content>{{album.description}}</md-card-content>
      </md-card>
      <br>
    </div>
  </div>
</template>

<script>
import DataService from "../dataservice";

export default {
  data: function() {
    return {
      token: "",
      albums: []
    };
  },
  created: function() {
    DataService.getNewReleases().then(data => {
      this.albums = data.data.albums.items;
      console.log(data); 
    });
  }
};
</script>

<style>
</style>
