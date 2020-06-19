import axios from "axios";
import firebase from "@firebase/app";
import "@firebase/firestore";
import qs from "qs";

const firebaseConfig = {
  apiKey: "AIzaSyC_So5d6NKc6mokkomMNUSPe-A3gwQSRKM",
  authDomain: "progetto-68f3a.firebaseapp.com",
  databaseURL: "https://progetto-68f3a.firebaseio.com",
  projectId: "progetto-68f3a",
  storageBucket: "progetto-68f3a.appspot.com",
  messagingSenderId: "1063968207746",
  appId: "1:1063968207746:web:b6efee73d5bd7b67c7559b"
};

!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();

var db = firebase.firestore();
var token = "";

export default {
  isAuthenticated() {
    return !!localStorage.getItem("username"); // !! è uguale a true, converte il valore in booleano
  },
  signin(username, password) {
    localStorage.setItem("username", username);
    return db
      .collection("users")
      .doc()
      .set({
        name: localStorage.getItem("username"),
        password: password
      });
  },
  login(username, password) {
    return db
      .collection("users")
      .where("name", "==", username)
      .get()
      .then(data => {
        if (data.password === password) {
          localStorage.setItem("username", username);
        }
      });
  },
  logout() {
    localStorage.removeItem("username");
  },

  //SPOTIFY
  getToken() {
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      auth: {
        username: "6bb54f617c0241e991ed3d929c7b7a16",
        password: "740ed28a7859407cbeb0ab30af365177"
      }
    };
    const data = {
      grant_type: "client_credentials"
    };
    return axios
      .post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(data),
        headers
      )
      .then(function(response) {
        token = response.data.access_token;
      });
  },
  getNewReleases() {
    this.getToken();
    return axios.get("https://api.spotify.com/v1/browse/new-releases", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });
  },

  //LAST.FM
  getTags(tag) {
    return axios.get(
      "https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" +
        tag +
        "&api_key=db1d45df3e100daaf5b1ab588d17e38a&format=json"
    );
  },
  getTopArtists() {
    return axios.get(
      "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=db1d45df3e100daaf5b1ab588d17e38a&format=json"
    );
  },
  getArtistInfo(name) {
    return axios.get(
      "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
        name +
        "&api_key=db1d45df3e100daaf5b1ab588d17e38a&format=json&format=json"
    );
  },
  getTopAlbums(artist) {
    return axios.get(
      "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" +
        artist +
        "&api_key=db1d45df3e100daaf5b1ab588d17e38a&format=json&limit=12"
    );
  },
  getAlbumInfo(artist, album) {
    return axios.get(
      " https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=db1d45df3e100daaf5b1ab588d17e38a&artist=" +
        artist +
        "&album=" +
        album +
        "&format=json"
    );
  },
  getTopTracks(artist) {
    return axios.get(
      "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" +
        artist +
        "&api_key=db1d45df3e100daaf5b1ab588d17e38a&format=json&limit=5"
    );
  }
};
