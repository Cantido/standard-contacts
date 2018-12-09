<template>
  <div class="hcard">
      <h2>Contact</h2>
      Name: {{ formalName }}
  </div>
</template>

<script>
import ICAL from 'ical.js';
export default {
  name: 'HCard',
  props: {
    vcard: String
  },
  computed: {
  	jcal: function() {
    	return ICAL.parse(this.vcard);
    },
    jcomp: function() {
    	return new ICAL.Component(this.jcal);
    },
    formalName: function() {
    	return this.jcomp.getFirstPropertyValue("fn");
    },
	},
}
</script>

<style scoped>

</style>
