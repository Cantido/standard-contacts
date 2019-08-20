import ICAL from 'ical.js';
import VCard from 'ical.js';

export function hasPid(prop) {
  return !!prop[1].pid;
}

export function canHavePid (prop) {
  // Any property with a maximum cardinality of 1 may not have a PID
  return ![
    'anniversary',
    'bday',
    'clientpidmap',
    'gender',
    'kind',
    'n',
    'prodid',
    'rev',
    'uid',
    'version'
  ].includes(prop[0]);
}

export function addPids(props) {
  const allPids = getAllPids(props);
  let nextPid = 1;
  return props.map(function(prop) {
    if(canHavePid(prop) && !(hasPid(prop))) {
      while(allPids.includes(nextPid.toString())) {
        nextPid++;
      }
      prop[1].pid = nextPid.toString();
      nextPid++;
    }
    return prop;
  });
}

export function getAllPids(props) {
  return props.flatMap(function(prop) {
    if(!prop || !prop[1]) {
      return [];
    }
    const pid = prop[1].pid;
    if(Array.isArray(pid)) {
      const pids = pid.map((p) => { return p.toString() });
      return pids
    } else if(typeof pid === 'number' || typeof pid === 'string') {
      return [pid.toString()];
    } else {
      return [];
    }
  });
}

export function updateTimestamp(jcard, time) {
  let newComponent = new ICAL.Component(jcard);

  newComponent.updatePropertyWithValue("rev", VCard.Time.fromJSDate(time, true));
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
