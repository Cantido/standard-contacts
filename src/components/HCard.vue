<template>
<div class="vcard">
  <div v-for="(property, index) in displayedProperties">
    <Property v-model='displayedProperties[index]' :key="keyForProperty(property)" />
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
      hiddenProperties: [
        'name',
        'profile',
        'source',
        'prodid',
        'version'
      ]
    };
  },
  computed: {
    displayedProperties: function() {
      let hiddenProperties = this.hiddenProperties;
      return this.jcard[1].filter(function(property) {
        return !hiddenProperties.includes(property[0].toLowerCase())
      });
    },
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
    keyForProperty: function(prop) {
      if (prop[1].type) {
        return prop[0] + '-' + prop[1].type;
      } else {
        return prop[0];
      }
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
