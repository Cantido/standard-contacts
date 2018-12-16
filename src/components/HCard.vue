<template>
<div class="vcard">
  <label for="fn">Formatted name</label>
  <input id="fn" v-model="fnVal" class="fn">

  <label for="n">Full name</label>
  <input id="n" v-model="name" class="n">

  <label for="tel">Phone</label>
  <input id="tel" v-model="tel" class="tel">

  <label for="email">Email</label>
  <input id="email" v-model="email" class="email">
</div>
</template>

<script>
import ICAL from 'ical.js';

function firstPropertyValue(name) {
  return {
    get: function() {
      return this.cardComponent.getFirstPropertyValue(name);
    },
    set: function(newValue) {
      this.cardComponent.updatePropertyWithValue(name, newValue);
      this.$emit('input', this.cardComponent.toString());
    }
  }
}

export default {
  name: 'HCard',
  props: {
    value: String
  },
  data: function() {
    return {
      updatedVcard: this.value
    }
  },
  computed: {
    cardComponent: function() {
      return new ICAL.Component(ICAL.parse(this.updatedVcard));
    },
    fnVal: firstPropertyValue.bind(this, "fn")(),
    tel: firstPropertyValue.bind(this, "tel")(),
    email: firstPropertyValue.bind(this, "email")(),
    name: firstPropertyValue.bind(this, "n")(),
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
