<template>
  <div id="app">
    <HCard v-bind:vcard="vcard" />
  </div>
</template>

<script>
import HCard from './components/HCard.vue'

export default {
  name: 'app',
  components: {
    HCard
  },
  data: () => {
    return {
      vcard: `
BEGIN:VCARD\n
VERSION:3.0\n
PRODID:ez-vcard 0.10.4\n
N:Anderson;Thomas\n
FN:Thomas Anderson\n
TEL;TYPE=CELL:+1 (555) 555-5555\n
EMAIL;TYPE=HOME:neo@example.com\n
END:VCARD\n`
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 30%;
}
.vcard {
  text-align: left;
}
</style>
