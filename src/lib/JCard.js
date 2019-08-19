import ICAL from 'ical.js';

function revisionTimestamp(date) {
  return (new Date(date)).toISOString();
}

export function updateTimestamp(jcard) {
  let newComponent = new ICAL.Component(jcard);
  const revTimestamp = revisionTimestamp(Date.now());
  // Component.updatePropertyWithValue doesn't work
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
