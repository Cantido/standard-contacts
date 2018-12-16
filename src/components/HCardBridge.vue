<template>
<div id="hcard-bridge">
  <!-- If we used the vcard property as the bind value,
      then we could just use v-model.
      However, then we would be triggering a loop of updates.
      So, we will always display the note from the bridge,
      and pass updates back to the bridge. -->
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
import ICAL from 'ical.js';
import HCard from './HCard.vue'
import BridgeManager from '../lib/BridgeManager.js';

export default {
  name: 'HCardBridge',
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
    const comp = new ICAL.Component(ICAL.parse(newVcard));
      BridgeManager.get().updateNote({
        text: newVcard,
        title: comp.getFirstPropertyValue("fn").substring(0, 80),
        preview_text: comp.getFirstPropertyValue("tel"),
        preview_html: comp.getFirstPropertyValue("tel"),
      })
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

</style>
