<template>
<div class="vcard">
  <div v-for="(property, index) in jcard[1]" v-if="property[0] != 'prodid' && property[0] != 'version'">
    <Property v-model='jcard[1][index]' :key="property[0] + '-' + property[1].type" />
    <button type="button" name="button" @click="newProperty(property)">+</button>
    <button type="button" name="button" @click="rmProperty(index)">&minus;</button>
  </div>

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
  methods: {
    newProperty: function(lookalike) {
      this.jcard[1].push(this.clearedClone(lookalike))
    },
    rmProperty: function(index) {
      this.jcard[1].splice(index, 1)
    },
    clearedClone: function(template) {
      return [
        template[0],
        template[1],
        template[2],
        ''
      ];
    },
  },
}
</script>

<style>

</style>
