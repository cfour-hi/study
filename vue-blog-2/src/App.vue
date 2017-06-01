<template>
  <div id="app">
    <main-header></main-header>
    <main class="main">
      <main-sidebar></main-sidebar>
      <router-view></router-view>
    </main>
    <progress-bar :duration="300" :progress="progress"></progress-bar>
  </div>
</template>

<script>
import MainHeader from './components/MainHeader'
import MainSidebar from './components/MainSidebar'
import ProgressBar from './components/ProgressBar'

export default {
  components: {
    MainHeader,
    MainSidebar,
    ProgressBar
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    progress () {
      return this.$store.state.progress
    }
  }
}
</script>

<style scoped>
.main {
  width: 60em;
  margin: 5.5em auto 1em;
}

.loader {
  position: absolute;
  z-index: 1;
  top: .5em;
  right: 1em;
  font-size: 2em;
}
</style>


<style>
@import './assets/css/base.css';
@import './assets/css/app.css';
</style>
