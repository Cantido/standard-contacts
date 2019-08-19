<template>
<div class="vcard">
  <!-- Binding values to the Property components is a little over-complicated,
       because I want to pass Arrays back and forth, but Vue's object-change
       caveats, combined with modifying arrays with multiple references,
       makes that tricky. -->
  <section>
    <div v-for="(property, index) in nameProperties" :key="keyForProperty(property)">
      <Property v-bind:value='nameProperties[index].slice()' v-on:input="updatePropertyByName(property[0], $event)" />
      <button type="button" name="button" @click="rmProperty(property)">&minus;</button>
    </div>
  </section>

  <section>
    <div v-for="(property, index) in phoneProperties" :key="keyForProperty(property)">
      <Property v-bind:value='phoneProperties[index].slice()' v-on:input="updatePropertyByPid(property[1].pid, $event)" />
      <button type="button" name="button" @click="rmProperty(property)">&minus;</button>
    </div>
    <span class="labelspacer"></span>
    <button type="button" name="button" class="add" @click="pushProperty(['tel', {type:'HOME'}, 'text', ''])">Add a phone</button>
  </section>

  <section>
    <div v-for="(property, index) in emailProperties" :key="keyForProperty(property)">
      <Property v-bind:value='emailProperties[index].slice()' v-on:input="updatePropertyByPid(property[1].pid, $event)" />
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
      jcard: this.initJcard(this.value),
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
      return JCard.updateTimestamp(this.jcard, new Date());
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
      console.log(new ICAL.Component(newval).toString());
      this.$emit('input', new ICAL.Component(newval).toString());
    },
  },
  methods: {
    initJcard: function(vcard) {
      const jcard = ICAL.parse(vcard);
      const props = jcard[1];
      const allPids = this.getAllPids(jcard[1]);
      let nextPid = 0;
      props.map(function(prop) {
        if(this.canHavePid(prop) && !(this.hasPid(prop))) {
          while(allPids.includes(nextPid.toString())) {
            nextPid++;
          }
          prop[1].pid = nextPid.toString();
          nextPid++;
        }
        return prop;
      }, this);
      jcard[1] = props
      return jcard;
    },
    canHavePid: function(prop) {
      // Any property with a maximum cardinality of 1 may not have a PID
      return ![
        'anniversary',
        'bday',
        'gender',
        'kind',
        'n',
        'prodid',
        'rev',
        'uid',
        'version'
      ].includes(prop[0]);
    },
    hasPid: function(prop) {
      return !!prop[1].pid
    },
    getAllPids: function(props) {
      return props.flatMap(function(prop) {
        if(!prop || !prop[1]) {
          return [];
        }
        const pid = prop[1].pid;
        if(typeof pid === 'object' && Array.isArray(pid)) {
          return pid.map((p) => { p.toString() });
        } else if(typeof pid === 'number' || typeof pid === 'string') {
          return [pid.toString()];
        } else {
          return [];
        }
      });
    },
    revisionTimestamp: function(date) {
      return (new Date(date)).toISOString();
    },
    updatePropertyByName: function(name, newValue) {
      const i = this.jcard[1].findIndex(function(prop) {
        return name === prop[0];
      });
      this.jcard[1].splice(i, 1, newValue);
    },
    updatePropertyByPid: function(pid, newValue) {
      const i = this.jcard[1].findIndex(function(prop) {
        return pid === prop[1].pid;
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
