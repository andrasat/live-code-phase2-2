<template>
  <div id="app">
    <nav class="nav main-nav">
      <div class="nav-left">
        <router-link to="/" class="nav-item title is-3">MY CMS</router-link>
      </div>
      <div class="nav-right">
        <router-link to="/register" class="nav-item">Register</router-link>
        <router-link to="/login" class="nav-item">Login</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
