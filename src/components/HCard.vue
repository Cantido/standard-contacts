<template>
<div class="h-card">
  <label>Formatted name</label>
  <input v-model="fnVal" class="fn">

  <label>Full name</label>
  <input v-model="name" class="n">

  <label>Phone</label>
  <input v-model="tel" class="tel">

  <label>Email</label>
  <input v-model="email" class="email">
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
label {
  display: block;
}
</style>
