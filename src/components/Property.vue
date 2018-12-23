<template lang="html">
<span :class="['property', prop[0]]">
  <label :for="prop[0]">
    <span class="property-name">{{fancyName(prop[0])}}</span>
    <span class="type" v-if="prop[1].type">
      (<input type="text" name="" value="" v-model="prop[1].type">)
    </span>
  </label>
  <input class="value" :id="prop[0]" :name="prop[0]" v-model="prop[3]">
</span>
</template>

<script>
export default {
  name: 'Property',
  props: {
    value: Array,
  },
  data: function() {
    return {
      prop: this.value,
      fancyNames: {
        n: 'name details',
        fn: 'name',
        tel: 'phone',
        email: 'email'
      },
    };
  },
  watch: {
    prop: function(newprop) {
      this.$emit('input', newprop);
    },
  },
  methods: {
    fancyName: function(name) {
      return this.fancyNames[name] || name;
    }
  },
}
</script>

<style lang="css">
.property {
  display:inline-block;
}
.type input {
  width: 4em;
}
label {
  display: inline-block;
  width: 8em;
}
.value {
  display: inline-block;
  width: auto;
}


</style>
