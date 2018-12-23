<template>
<div class="vcard">
  <Property
    v-for="(property, index) in jcard[1]"
    v-model='jcard[1][index]'
    :key="property[0] + '-' + property[3].type"/>

  <h2>parsed JSON:</h2>
  <pre>
    {{ jcard }}
  </pre>
</div>
</template>

<script>
import ICAL from 'ical.js';
import Property from './Property.vue';

export default {
  name: 'HCard',
  components: {
    Property
  },
  props: {
    value: String
  },
  data: function() {
    return {
      jcard: ICAL.parse(this.value),
    };
  },
  watch: {
    jcard: function(newval) {
      this.$emit('input', new ICAL.Component(newval).toString());
    },
  },
}
</script>

<style>

</style>
