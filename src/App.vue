<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <p>给JS一点中国震撼：{{ cacl() }}</p>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { cacl } from './1'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    cacl() {
      return cacl();
    }
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
