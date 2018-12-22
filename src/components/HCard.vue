<template>
<div class="vcard">
  <template v-for="(property, index) in jcard[1]">
    <label :for="property[0]">{{property[0]}}</label>
    <input :id="property[0]" :name="property[0]" v-model="property[3]">
  </template>
  <pre>
    {{ jcard}}
  </pre>
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
