import ICAL from 'ical.js';

function twoDigitString(n) {
  if(n >= 10) {
    return n.toString();
  } else {
    return "0" + n.toString();
  }
}

function revisionTimestamp(time) {
  const timeObj = new Date(time);
  return timeObj.getUTCFullYear().toString() +
         twoDigitString(timeObj.getUTCMonth() + 1) +
         twoDigitString(timeObj.getUTCDate()) +
         "T" +
         twoDigitString(timeObj.getUTCHours()) +
         twoDigitString(timeObj.getUTCMinutes()) +
         twoDigitString(timeObj.getUTCSeconds()) +
         "Z";
}

export function updateTimestamp(jcard, time) {
  let newComponent = new ICAL.Component(jcard);
  const revTimestamp = revisionTimestamp(time);
  // Component.updatePropertyWithValue doesn't work
  console.log("writing revision timestamp " + revTimestamp);
  newComponent.removeAllProperties("REV");
  newComponent.addPropertyWithValue("REV", revTimestamp);

  return ICAL.parse(newComponent.toString());
}

export function filterPropertiesByName(properties, name) {
  if(typeof name === "string") {
    return properties.filter(function(property) {
      return property[0] == name
    });
  } else {
    // assuming name is an array of names
    return properties.filter(function(property) {
      return name.includes(property[0]);
    });
  }
}

export function rejectPropertiesByName(properties, name) {
  if(typeof name === "string") {
    return properties.filter(function(property) {
      return property[0] != name
    });
  } else {
    // assuming name is an array of names
    const names = name;
    return properties.filter(function(property) {
      return !names.includes(property[0]);
    });
  }
}
