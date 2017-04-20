<template>
  <div id="app">
    <nav class="nav main-nav">
      <div class="nav-left">
        <router-link to="/" class="nav-item title is-3">MY CMS</router-link>
      </div>
      <div class="nav-right">
        <router-link v-if="getLoginStatus == false" to="/register" class="nav-item">Register</router-link>
        <router-link v-if="getLoginStatus == false" to="/login" class="nav-item">Login</router-link>
        <router-link v-if="getLoginStatus" :to="{name: 'Profile', params :{username: getUserNow}}" class="nav-item">Profile</router-link>
        <router-link v-if="getLoginStatus" to="/" @click="" class="nav-item">Logout</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'getLoginStatus',
      'getUserNow'
    ])
  },
  methods: {
    ...mapActions([
      'ifLogin'
    ]),
    logout() {
      localStorage.removeItem('token')
      window.location.reload()
    }
  },
  mounted() {
    this.ifLogin()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main-nav {
  padding: 2em;
}
</style>
