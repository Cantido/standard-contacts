<template>
<div id="app">
  <HCardBridge />
</div>
</template>

<script>
import HCardBridge from './components/HCardBridge.vue'
export default {
  name: 'app',
  components: {
    HCardBridge
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
