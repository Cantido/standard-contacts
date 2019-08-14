<template lang="html">
<span :class="['property', jCardProp[0]]">
  <label :for="jCardProp[0]">
    <span class="property-name">{{fancyPropertyName}}</span>
    <span class="type" v-if="jCardProp[1].type">
      (<input type="text" name="" value="" v-model="jCardProp[1].type">)
    </span>
  </label>
  <input class="value" :id="jCardProp[0]" :name="jCardProp[0]" v-model="jCardPropValue">
</span>
</template>

<script>
export default {
  name: 'Property',
  props: {
    name: String,
    params: Object,
    type: String,
    value: [String, Array],
  },
  data: function() {
    return {
      jCardProp: this.value,
      jCardPropValue: this.value[3],
      fancyNames: {
        n: 'name details',
        fn: 'name',
        tel: 'phone',
        email: 'email'
      },
    };
  },
  watch: {
    jCardPropValue: function(newValue) {
      console.log("emitting change to jprop value to " + newValue);
      this.$emit('input', [this.jCardProp[0],this.jCardProp[1], this.jCardProp[2], newValue]);
    }
  },
  computed: {
    fancyPropertyName: function() {
      return this.fancyNames[this.jCardProp[0]] || this.jCardProp[0];
    }
  }
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
