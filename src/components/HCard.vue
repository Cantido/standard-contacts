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
    fnVal: {
      get: function() {
        return this.cardComponent.getFirstPropertyValue("fn");
      },
      set: function(newValue) {
        this.cardComponent.updatePropertyWithValue("fn", newValue);
        this.$emit('input', this.cardComponent.toString());
      }
    },
  },
}
</script>

<style scoped>
.p-tel,
.p-email {
  display: block;
}
</style>
