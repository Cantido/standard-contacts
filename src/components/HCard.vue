<template>
<div class="vcard">
  <div v-for="(property, index) in displayedProperties" v-if="property[0] != 'prodid' && property[0] != 'version'">
    <Property v-model='displayedProperties[index]' :key="propertyKeys[index]" />
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
        'prodid',
        'version'
      ]
    };
  },
  computed: {
    displayedProperties: function() {
      let hiddenProperties = this.hiddenProperties;
      return this.jcard[1].filter(function(property) {
        return !hiddenProperties.includes(property[0])
      });
    },
    propertyKeys: function() {
      return this.displayedProperties.map(function(prop) {
        if (prop[1].type) {
          prop[0] + '-' + prop[1].type
        } else {
          prop[0]
        }
      })
    }
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
