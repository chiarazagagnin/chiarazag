<template>
  <div>
    <h1>{{name}}</h1>
    <md-chip
      class="md-primary"
      md-clickable
      v-for="tag in tags"
      :key="tag.name"
      @click="tagInfo(tag.name)"
    >{{tag.name}}</md-chip>
    <br>
    <br>
    <md-list>
      <span class="md-text">
        <b>Top tracks</b>
      </span>
      <br>
      <md-divider></md-divider>

      <div v-for="track in tracks" :key="track.name">
        <md-list-item>
          <span class="md-list-item-text">{{track.name}}</span>
        </md-list-item>
      </div>
      <md-divider></md-divider>
    </md-list>
    <br>
    <span class="md-text">
      <b>Top albums</b>
    </span>
    <br>
    <br>
    <div class="md-layout md-gutter">
      <div
        class="md-layout-item md-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        v-for="album in albums"
        :key="album"
        @click="albumInfo(album)"
      >
        <md-card md-with-hover>
          <md-card-header>
            <md-card-header-text class="card-text">
              <div class="md-title">{{album}}</div>
            </md-card-header-text>
          </md-card-header>
          <md-card-actions>
            <md-button class="md-icon-button">
              <md-icon>favorite</md-icon>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>bookmark</md-icon>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>share</md-icon>
            </md-button>
          </md-card-actions>
        </md-card>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../dataservice";
export default {
  data: function() {
    return {
      name: this.$route.params.name,
      infos: "",
      tags: [],
      albums: [],
      tracks: []
    };
  },
  created: function() {
    DataService.getArtistInfo(this.name).then(data => {
      this.infos = data.data.artist;
      console.log(data);
      this.infos.tags.tag.forEach(element => {
        this.tags.push(element);
      });
    });
    DataService.getTopAlbums(this.name).then(alb => {
      //console.log(el)
      alb.data.topalbums.album.forEach(album => {
        this.albums.push(album.name);
      });
    });
    DataService.getTopTracks(this.name).then(tr => {
      this.tracks = tr.data.toptracks.track;
      //console.log(this.tracks);
    });
  },
  methods: {
    tagInfo(name) {
      this.$router.push("/tag/" + name);
    },
    albumInfo(name) {
      this.$router.push("/album/" + name);
    }
  }
};
</script>

<style>
.card-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
