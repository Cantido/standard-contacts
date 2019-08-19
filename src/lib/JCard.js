import ICAL from 'ical.js';
import VCard from 'ical.js';

export function updateTimestamp(jcard, time) {
  let newComponent = new ICAL.Component(jcard);

  newComponent.updatePropertyWithValue("rev", VCard.Time.fromJSDate(time, true));
  console.log(newComponent.toString());

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
