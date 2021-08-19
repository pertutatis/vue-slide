<template>
  <div id="app">
    <DomestikCarousel/>
  </div>
</template>

<script>
import DomestikCarousel from './components/DomestikCarousel.vue'

export default {
  name: 'App',
  components: {
    DomestikCarousel
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
