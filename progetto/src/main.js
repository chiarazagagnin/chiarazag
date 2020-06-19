import Vue from "vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import VueRouter from "vue-router";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

//import DataService from "./dataservice";

import Signin from "./pages/Signin";
import Login from "./pages/Login";
import TopArtists from "./pages/TopArtists";
import Tag from "./pages/Tag";
import NewReleases from "./pages/NewReleases";
import Artist from "./pages/Artist";
import Album from "./pages/Album";

Vue.use(VueMaterial);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  routes: [
    { name: "Login", path: "/login", component: Login },
    { name: "Signin", path: "/signin", component: Signin },
    { name: "TopArtists", path: "/topartists", component: TopArtists },
    { name: "Tag", path: "/tag/:name", component: Tag },
    { name: "NewReleases", path: "/", component: NewReleases },
    { name: "Artist", path: "/artist/:name", component: Artist },
    { name: "Album", path: "/album/:name", component: Album }
  ]
});

/*router.beforeEach((to, from, next) => {
  if (from.name === "Login") {
    next();
  } else if (to.name !== "Login" && !DataService.isAuthenticated()) {
    next({ name: "Signin" });
  } else {
    next();
  }
});*/

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
