<template>
<div class="vcard">
  <!-- Binding values to the Property components is a little over-complicated,
       because I want to pass Arrays back and forth, but Vue's object-change
       caveats, combined with modifying arrays with multiple references,
       makes that tricky. -->
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
  <pre>{{ jcard }}</pre>
</div>
</template>

<script>
import ICAL from 'ical.js';
import Property from './Property.vue';
import * as JCard from '../lib/JCard.js';

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
      propertyWhitelist: [
        'fn',
        'n',
        'email',
        'tel'
      ]
    };
  },
  computed: {
    exportedJcard: function() {
      return JCard.updateTimestamp(this.jcard);
    },
    displayedProperties: function() {
      return JCard.filterPropertiesByName(this.jcard[1], this.propertyWhitelist);
    },
    nameProperties: function() {
      return JCard.filterPropertiesByName(this.displayedProperties, ['n', 'fn']);
    },
    phoneProperties: function() {
      return JCard.filterPropertiesByName(this.displayedProperties, 'tel');
    },
    emailProperties: function() {
      return JCard.filterPropertiesByName(this.displayedProperties, 'email');
    },
    otherProperties: function() {
      return JCard.rejectPropertiesByName(this.displayedProperties, ['fn', 'n', 'tel', 'email']);
    }
  },
  watch: {
    exportedJcard: function(newval) {
      this.$emit('input', new ICAL.Component(newval).toString());
    },
  },
  methods: {
    revisionTimestamp: function(date) {
      return (new Date(date)).toISOString();
    },
    updateProperty: function(key, newValue) {
      console.log("updating property " + JSON.stringify(key) + " to " + JSON.stringify(newValue))
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
