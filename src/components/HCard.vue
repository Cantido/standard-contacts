<template>
<div class="h-card">
  <h2 class="p-name">{{ nameValue }}</h2>
  <h3>Phone</h3>
  <span v-for="telProperty in telProperties" class="p-tel">
    <!-- {{ telProperty.getParameter("type") }}
    {{ telProperty.getFirstValue() }} -->
  </span>
  <h3>Email</h3>
  <span v-for="emailProperty in emailProperties" class="p-email">
    {{ emailProperty.getParameter("type") }}
    {{ emailProperty.getFirstValue() }}
  </span>
</div>
</template>

<script>
import ICAL from 'ical.js';

export default {
  name: 'HCard',
  props: {
    vcard: String
  },
  computed: {
    cardComponent: function() {
      return new ICAL.Component(ICAL.parse(this.vcard));
    },
    nameValue: function() {
      return this.cardComponent.getFirstPropertyValue("fn");
    },
    telProperties: function() {
      return this.cardComponent.getAllProperties("tel")
    },
    emailProperties: function() {
      return this.cardComponent.getAllProperties("email")
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
