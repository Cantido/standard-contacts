<template lang="html">
<span :class="['property', uglyPropertyName]">
  <label :for="uglyPropertyName">
    <span class="property-name">{{fancyPropertyName}}</span>
    <span class="type" v-if="jCardPropType">
      (<input type="text" name="" value="" v-model="jCardPropType">)
    </span>
  </label>
  <input class="value" :id="uglyPropertyName" :name="uglyPropertyName" v-model="jCardPropValue">
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
      uglyPropertyName: this.value[0],
      jCardPropParams: this.value[1],
      jCardPropType: this.value[1].type,
      jCardPropValueType: this.value[2],
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
    jCardPropType: function(newPropType) {
      console.log("emitting change to jprop type to " + JSON.stringify(newPropType));
      this.$emit('input', [uglyPropertyName, {...jCardPropParams, type: newPropType}, jCardPropValueType, jCardPropValue]);
    },
    jCardPropValue: function(newValue) {
      console.log("emitting change to jprop value to " + JSON.stringify(newValue));
      this.$emit('input', [uglyPropertyName, jCardPropParams, jCardPropValueType, newValue]);
    }
  },
  computed: {

    fancyPropertyName: function() {
      return this.fancyNames[this.uglyPropertyName] || this.uglyPropertyName;
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
