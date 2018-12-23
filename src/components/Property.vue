<template lang="html">
<span class="property" v-if="prop[0] != 'prodid' && prop[0] != 'version'">
  <label :for="prop[0]">
    {{prop[0]}}
    <span class="type" v-if="prop[1].type">
      ({{prop[1].type}})
    </span>
  </label>
  <input :id="prop[0]" :name="prop[0]" v-model="prop[3]">
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
      prop: this.value
    }
  },
  watch: {
    prop: function(newprop) {
      this.$emit('input', newprop);
    },
  },
}
</script>

<style lang="css">
.property {
  display:block;
}
.type {
  text-transform: lowercase;
}
label {
  display: inline-block;
  width: 8em;
}
input {
  display: inline-block;
  width: auto;
}


</style>
