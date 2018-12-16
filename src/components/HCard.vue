<template>
<div class="vcard">
  <template v-for="property in jcardObj">
    <label :for="property.name">{{property.name}}</label>
    <input :id="property.name" v-model="property.value">
  </template>
</div>
</template>

<script>
import ICAL from 'ical.js';

export default {
  name: 'HCard',
  props: {
    value: String
  },
  data: function() {
    return {
      updatedVcard: this.value,
    }
  },
  computed: {
    cardComponent: function() {
      return new ICAL.Component(ICAL.parse(this.updatedVcard));
    },
    jcard: function() {
      return ICAL.parse(this.updatedVcard)[1];
    },
    jcardObj: function() {
      return this.jcard.map(function(prop) {
        return ({
          name: prop[0],
          params: prop[1],
          type: prop[2],
          value: prop[3]
        });
      });
    },
  },
}
</script>

<style scoped>
.vcard {
  display: grid;
  grid-template-columns: [labels] 8em [values] auto;
}

label {
  grid-column: labels / span 1;
}
input {
  grid-column: values / span 1;
}
</style>
