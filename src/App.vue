<template>
  <div id="app">
    <div>
      <h2>Contact</h2>
      Name: {{ fn }}
    </div>
    <div class="vcard">
      <h2>VCARD</h2>
      <span v-for="line in vlines">
        {{ line }}<br />
      </span>
    </div>
    <div class="">
      <h2>JCARD</h2>
      {{ jcard }}
    </div>
  </div>
</template>

<script>
import ICAL from 'ical.js';

export default {
  name: 'app',
  data: () => {
    let v = `
BEGIN:VCARD\n
VERSION:3.0\n
PRODID:ez-vcard 0.10.4\n
N:Anderson;Thomas\n
FN:Thomas Anderson\n
TEL;TYPE=CELL:+1 (555) 555-5555\n
EMAIL;TYPE=HOME:neo@example.com\n
END:VCARD\n
`;

      let j = ICAL.parse(v)
      let jcomp = new ICAL.Component(j);



    return {
      vcard: v,
      vlines: v.split('\n'),
      jcard: j,
      fn: jcomp.getFirstPropertyValue("fn")
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 30%;
}
.vcard {
  text-align: left;
}
</style>
