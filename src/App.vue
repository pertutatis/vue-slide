<template>
  <div id="app">
    <DomestikCarousel :carousels="carousels" :fade="true"/>
  </div>
</template>

<script>
import DomestikCarousel from './components/DomestikCarousel.vue'

export default {
  name: 'App',
  components: {
    DomestikCarousel
  },
  data() {
    return {
      carousels: [
          {
            img: 'https://picsum.photos/900/506?image=1081',
          },
          {
            img: 'https://picsum.photos/900/506?image=1068',
          },
          {
            img: 'https://picsum.photos/900/506?image=989',
          }
        ]
    }
  },
}
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  height: 100vh;
  overflow-y: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
