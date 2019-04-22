<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <transition v-if="isLoaderShow">
      <hello-world @loaderComplete="loaderComplete"></hello-world>
    </transition>
    <transition>
      <cube-container></cube-container>
    </transition>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import cubeContainer from './pages/test';
export default {
  name: 'app',
  data() {
    return {
      isLoaderShow: true,
      flag: false
    }
  },
  mounted() {
    this.viewSize()
  },
  methods: {
    viewSize() {
      let viewWidth = document.documentElement.clientWidth || document.body.clientWidth
      let html = document.getElementsByTagName('html')[0]
      html.style.fontSize = viewWidth / 10 + 'px'
    },
    loaderComplete() {
      this.isLoaderShow = false
    }
  },
  components: {
    HelloWorld,
    cubeContainer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
