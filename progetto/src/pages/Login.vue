<template>
  <div class="md-layout md-alignment-center-center">
    <md-card class="md-layout-item md-size-30 md-xsmall-size-100 md-medium-size-50">
      <md-card-header>
        <span class="md-title">Login</span>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Username</label>
          <md-input v-model="username"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button
          class="md-primary md-raised"
          :disabled="!username || !password"
          @click="login()"
        >Entra</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import DataService from "../dataservice";
export default {
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      DataService.login(this.username, this.password);
      if (!localStorage.getItem("username")) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.push({ path: "/signin" });
      }
    }
  }
};
</script>


<style>
</style>