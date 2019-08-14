<template>
<div class="vcard">
  <section>
    <div v-for="(property, index) in nameProperties" :key="keyForProperty(property)">
      <Property v-bind:value='nameProperties[index].slice()' v-on:input="updateProperty(keyForProperty(property), $event)" />
      <button type="button" name="button" @click="rmProperty(property)">&minus;</button>
    </div>
  </section>

  <section>
    <div v-for="(property, index) in phoneProperties" :key="keyForProperty(property)">
      <Property v-bind:value='phoneProperties[index].slice()' v-on:input="updateProperty(keyForProperty(property), $event)" />
      <button type="button" name="button" @click="rmProperty(property)">&minus;</button>
    </div>
    <span class="labelspacer"></span>
    <button type="button" name="button" class="add" @click="pushProperty(['tel', {type:'HOME'}, 'text', ''])">Add a phone</button>
  </section>

  <section>
    <div v-for="(property, index) in emailProperties" :key="keyForProperty(property)">
      <Property v-bind:value='emailProperties[index].slice()' v-on:input="updateProperty(keyForProperty(property), $event)" />
      <button type="button" name="button" @click="rmProperty(property)">&minus;</button>
    </div>
    <span class="labelspacer"></span>
    <button type="button" name="button" class="add" @click="pushProperty(['email', {type:'HOME'}, 'text', ''])">Add an email address</button>
  </section>

  <section>
    <div v-for="(property, index) in otherProperties" :key="keyForProperty(property)">
      <Property v-bind:value='otherProperties[index].slice()' v-on:input="updateProperty(keyForProperty(property), $event)" />
      <button type="button" name="button" @click="rmProperty(property)">&minus;</button>
    </div>
  </section>
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
    nameProperties: function() {
      return this.displayedProperties.filter(function(property) {
        return ['n', 'fn'].includes(property[0]);
      });
    },
    phoneProperties: function() {
      return this.displayedProperties.filter(function(property) {
        return property[0] == 'tel'
      });
    },
    emailProperties: function() {
      return this.displayedProperties.filter(function(property) {
        return property[0] == 'email'
      });
    },
    otherProperties: function() {
      return this.displayedProperties.filter(function(property) {
        return !['fn', 'n', 'tel', 'email'].includes(property[0].toLowerCase());
      });
    }
  },
  watch: {
    jcard: function(newval) {
      this.$emit('input', new ICAL.Component(newval).toString());
    },
  },
  methods: {
    updateProperty: function(key, newValue) {
      console.log("updating property " + key + " to " + newValue)
      const keyForPropertyFn = this.keyForProperty;
      const i = this.jcard[1].findIndex(function(element) {
        return key == keyForPropertyFn(element);
      });

      this.jcard[1].splice(i, 1, newValue);
    },
    pushProperty: function(property) {
      this.jcard[1].push(property);
    },
    newProperty: function(lookalike) {
      this.pushProperty(this.clearedClone(lookalike));
    },
    rmProperty: function(property) {
      let i = this.jcard[1].findIndex(function(prop) {
        return prop[0] == property[0] &&
               prop[1] == property[1] &&
               prop[2] == property[2] &&
               prop[3] == property[3];
      });
      this.jcard[1].splice(i, 1)
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
section {
  margin-bottom: 1em;
}
.labelspacer {
  display: inline-block;
  width: 8em;
}
</style>
