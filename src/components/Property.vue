<template lang="html">
<span class="property">
  <label :for="prop[0]">
    {{prop[0]}}
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
