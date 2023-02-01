let eventDefinitions = [
  {
    id: 0,
    name: 'auto_line_success',
    title: 'Crossed Hab Line in Auto',
    variables: {},
    watcher: 'if(!bS.habline) {' +
    '  var prev = (bS.previousZones.findIndex((e) => {return e.name == \'hab_zone\';}) != -1);' +
    '  var curr = (bS.currentZones.findIndex((e) => {e.name == \'hab_zone\';}) != -1);' +
    '  return (bS.pos.t <= 15) && !prev && curr' +
    '} return false;',
    emitter: 'bS.line = true; return {};'
  },
  {
    id: 1,
    name: 'auto_line_fail',
    title: 'Crossed Hab Line not in Auto',
    variables: {},
    watcher: 'if(!bS.habline) {' +
    '  var prev = (bS.previousZones.findIndex((e) => {return e.name == \'hab_zone\';}) != -1);' +
    '  var curr = (bS.currentZones.findIndex((e) => {e.name == \'hab_zone\';}) != -1);' +
    '  return (bS.pos.t > 15) && !prev && curr' +
    '} return false;',
    emitter: 'bS.line = true; return {};'
  },
  {
    id: 2,
    name: 'cargo_up',
    title: 'Picked up Cargo',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {e.name == \'cargo_pickup\';}) != -1);',
    emitter: 'bs.cargo = true; bs.hatch = false; return {};'
  },
  {
    id: 3,
    name: 'cargo_drop',
    title: 'Dropped Cargo',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {e.name == \'cargo_drop\';}) != -1);',
    emitter: 'bs.cargo = false; bs.hatch = false; return {};'
  },
  {
    id: 4,
    name: 'hatch_up',
    title: 'Picked up Hatch',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {e.name == \'hatch_pickup\';}) != -1);',
    emitter: 'bs.cargo = false; bs.hatch = true; return {};'
  },
  {
    id: 5,
    name: 'hatch_drop',
    title: 'Dropped Hatch',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {e.name == \'hatch_drop\';}) != -1);',
    emitter: 'bs.cargo = false; bs.hatch = false; return {};'
  },
  {
    id: 6,
    name: 'cargoship_success',
    title: 'Scored on Cargo Ship',
    variables: {
      hatch: false,
      cargo: false
    },
    watcher: 'return (btnS.findIndex((e) => {e.name == \'cargoship_success\';}) != -1);',
    emitter: 'var res = {hatch: !!(bs.hatch), cargo: !!(bs.cargo)}; bs.cargo = false; bs.hatch = false; return res;'
  },
  {
    id: 7,
    name: 'cargoship_fail',
    title: 'Failed to score on Cargo Ship',
    variables: {
      hatch: false,
      cargo: false
    },
    watcher: 'return (bS.currentZones.findIndex((e) => {return e.name == \'cargo_zone\' && e.isAllied;}) != -1) && (' +
    '(btnS.findIndex((e) => {e.name == \'hatch_drop\';}) != -1) ||' +
    '(btnS.findIndex((e) => {e.name == \'cargo_drop\';}) != -1)' +
    ');',
    emitter: 'var res = {hatch: !!(bs.hatch), cargo: !!(bs.cargo)}; bs.cargo = false; bs.hatch = false; return res;'
  },
  {
    id: 8,
    name: 'rocket_success',
    title: 'Scored on Rocket',
    variables: {
      hatch: false,
      cargo: false,
      level: 1
    },
    watcher: 'return (btnS.findIndex((e) => {e.name == \'cargoship_success\';}) != -1);',
    emitter: 'var res = {hatch: !!(bs.hatch), cargo: !!(bs.cargo)}; bs.cargo = false; bs.hatch = false; return res;'
  },
  {
    id: 9,
    name: 'rocket_fail',
    title: 'Failed to score on Rocket,
    variables: {
      hatch: false,
      cargo: false,
      level: 2
    },
    watcher: 'return (bS.currentZones.findIndex((e) => {return e.name == \'cargo_zone\' && e.isAllied;}) != -1) && (' +
    '(btnS.findIndex((e) => {e.name == \'hatch_drop\';}) != -1) ||' +
    '(btnS.findIndex((e) => {e.name == \'cargo_drop\';}) != -1)' +
    ');',
    emitter: 'var res = {hatch: !!(bs.hatch), cargo: !!(bs.cargo)}; bs.cargo = false; bs.hatch = false; return res;'
  },





  {
    id: 18,
    name: 'hab_climb_1',
    title: 'Hab Climb Lvl 1',
    variables: {},
    watcher: 'return bS.currentZones.includes(\'hab1_a\') && !bS.previousZones.includes(\'hab1_a\');',
    emitter: 'return {};'
  },
  {
    id: 19,
    name: 'hab_climb_2',
    title: 'Hab Climb Lvl 2',
    variables: {},
    watcher: 'return (bS.currentZones.includes(\'hab2_a\') && !bS.currentZones.includes(\'hab3_a\')) && !bS.previousZones.includes(\'hab2_a\');',
    emitter: 'return {};'
  },
  {
    id: 20,
    name: 'hab_climb_3',
    title: 'Hab Climb Lvl 3',
    variables: {},
    watcher: 'return bS.currentZones.includes(\'hab3_a\') && !bS.previousZones.includes(\'hab3_a\');',
    emitter: 'return {};'
  },
  {
    id: 21,
    name: 'hab_climb_fail',
    title: 'Failed Hab Climb',
    variables: {},
    watcher: 'var results = bS.previousZones.includes(\'hab1_a\') || bS.previousZones.includes(\'hab2_a\') || bS.previousZones.includes(\'hab3_a\');' +
      'results = results && (!bS.currentZones.includes(\'hab1_a\') && !bS.currentZones.includes(\'hab2_a\') && !bS.currentZones.includes(\'hab3_a\'));' +
      'return results;',
    emitter: 'return {};'
  },
  {
    id: 22,
    name: 'defend',
    title: 'Played Defense',
    variables: {},
    watcher: 'return true;',
    emitter: 'return {};'
  },
  {
    id: 23,
    name: 'cross_field',
    title: 'Crossed Field',
    variables: {},
    watcher: 'return (bS.previousZones.includes(\'field_a\') && !bS.currentZones.includes(\'field_a\'))',
    emitter: 'return {};'
  }
];

export default eventDefinitions;
