let eventDefinitions = [
  {
    id: 0,
    name: 'pickup_cube',
    title: 'Picked Up Cube',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'pickup_cube\')}) != -1);',
    emitter: 'bS.cube++; return {};'
  },
  {
    id: 1,
    name: 'score_cube',
    title: 'Scored Cube',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'score_cube\')}) != -1);',
    emitter: 'bS.cube--; return {};'
  },
  {
    id: 2,
    name: 'drop_cube',
    title: 'Dropped Cube',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'drop_cube\')}) != -1);',
    emitter: 'bS.cube--; return {};'
  },
  {
    id: 3,
    name: 'pickup_cone',
    title: 'Picked Up Cone',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'pickup_cone\')}) != -1);',
    emitter: 'bS.cone++; return {};'
  },
  {
    id: 4,
    name: 'score_cone',
    title: 'Scored Cone',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'score_cone\')}) != -1);',
    emitter: 'bS.cone--; return {};'
  },
  {
    id: 5,
    name: 'drop_cone',
    title: 'Dropped Cone',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'drop_cone\')}) != -1);',
    emitter: 'bS.cone--; return {};'
  },
  {
    id: 6,
    name: 'docking',
    title: 'started endgame charge',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'docking\')}) != -1)',
    emitter: 'bS.docking = true; return {};'
  },
  {
    id: 7,
    name: 'stop_docking',
    title: 'stop endgame charge',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'stop_docking\')}) != -1);',
    emitter: 'bS.docking = false; bS.balanced = false; return {};'
  },
  {
    id: 8,
    name: 'balanced',
    title: 'endgame balanced',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'balancing\')}) != -1)',
    emitter: 'bS.balanced = true; bS.docking = true; return {};'
  },
  {
    id: 9,
    name: 'stop_balancing',
    title: 'stop balancing',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'stop_balancing\')}) != -1)',
    emitter: 'bS.balanced = false; return {};'
  },
  {
    id: 10,
    name: 'left_charge_station',
    title: 'left charge station',
    variables: {},
    watcher: 'return (bS.previousZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1 && ' +
      'bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) == -1);',
    emitter: 'bS.docking = false; bS.balanced = false; return {};'
  },
  {
    id: 11,
    name: 'mobility',
    title: 'mobility',
    variables: {},
    watcher: 'return (!bS.mobility && ' +
      'bS.previousZones.findIndex((e) => {return (e.name == \'community_zone\' && e.isAllied);}) != -1 && ' +
      'bS.currentZones.findIndex((e) => {return (e.name == \'community_zone\' && e.isAllied);}) == -1 && ' +
      'bS.position.t > 0 && ' +
      'bS.position.t < 16);',
    emitter: 'bS.mobility = true; return {};'
  },
  {
    id: 12,
    name: 'parked',
    title: 'parked',
    variables: {},
    watcher: 'return (bS.currentZones.findIndex((e) => {return (e.name == \'community_zone\' && e.isAllied);}) != -1 && ' +
      'bS.position.t > 30);',
    emitter: 'bS.parked = true; return {};'
  },
  {
    id: 100,
    name: 'start_pin',
    title: 'Pinning another Robot',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'start_pin\')}) != -1);',
    emitter: 'bS.contact = true; bS.lastContact = bS.position.t; return {};'
  },
  {
    id: 101,
    name: 'receive_pin',
    title: 'Pinned by another Robot',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'receive_pin\')}) != -1);',
    emitter: 'bS.contact = true; bS.lastContact = bS.position.t; return {};'
  },
  {
    id: 102,
    name: 'stop_pin',
    title: 'Pin Stopped',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'stop_pin\')}) != -1) ||' +
      '(bS.contact && bS.lastContact + 5 < bS.position.t);',
    emitter: 'bS.contact = false; bS.lastContact = 0; return {};'
  },
  {
    id: 103,
    name: 'died',
    title: 'bot died',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'died\')}) != -1);',
    emitter: 'return {};'
  },
];

export default eventDefinitions;
