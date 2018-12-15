<template>
<div id="app">

  <HCard
    v-if="vcard"
    v-bind:value="noteFromBridge"
    v-on:input="vcard = $event"
  />

  <div class="" v-else>
    That is not a valid vcard
  </div>
</div>
</template>

<script>
import HCard from './components/HCard.vue'

import BridgeManager from './lib/BridgeManager.js';

export default {
  name: 'app',
  components: {
    HCard
  },
  mounted: function() {
    BridgeManager.get().addUpdateObserver(this.updateNote);
  },
  data: () => {
    return {
      vcard: ''
    };
  },
  computed: {
    noteFromBridge: function() {
      let note = BridgeManager.get().getNote();
      return note.content.text;
    }
  },
  watch: {
    vcard: function(newVcard) {
      BridgeManager.get().setNote(newVcard);
    }
  },
  methods: {
    updateNote: function() {
      let note = BridgeManager.get().getNote();
      this.vcard = note.content.text
    }
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

.vcard {
  text-align: left;
}
</style>
