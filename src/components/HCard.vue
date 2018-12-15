<template>
<div class="h-card">
  <input v-model="fnVal" class="p-name">
  <!-- <h3>Email</h3>
  <span v-for="emailProperty in emailProperties" class="p-email">
    {{ emailProperty.getFirstValue() }}
  </span> -->
</div>
</template>

<script>
import ICAL from 'ical.js';

function componentProperty(name) {
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
    fnVal: componentProperty.bind(this, "fn")(),
  },
}
</script>

<style scoped>
.p-tel,
.p-email {
  display: block;
}
</style>
