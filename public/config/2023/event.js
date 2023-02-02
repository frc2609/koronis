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
    name: 'drop_cube',
    title: 'Dropped Cube',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'drop_cube\')}) != -1);',
    emitter: 'bS.cube--; return {};'
  },
  {
    id: 2,
    name: 'pickup_cone',
    title: 'Picked Up Cone',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'pickup_cone\')}) != -1);',
    emitter: 'bS.cone++; return {};'
  },
  {
    id: 3,
    name: 'drop_cone',
    title: 'Dropped Cone',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'drop_cone\')}) != -1);',
    emitter: 'bS.cone--; return {};'
  },
  {
    id: 7,
    name: 'start_pin',
    title: 'Pinning another Robot',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'start_pin\')}) != -1);',
    emitter: 'bS.contact = true; bS.lastContact = bS.position.t; return {};'
  },
  {
    id: 8,
    name: 'receive_pin',
    title: 'Pinned by another Robot',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'receive_pin\')}) != -1);',
    emitter: 'bS.contact = true; bS.lastContact = bS.position.t; return {};'
  },
  {
    id: 9,
    name: 'stop_pin',
    title: 'Pin Stopped',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'stop_pin\')}) != -1) ||' +
      '(bS.contact && bS.lastContact + 5 < bS.position.t);',
    emitter: 'bS.contact = false; bS.lastContact = 0; return {};'
  },
  {
    id: 10,
    name: 'engaging',
    title: 'started endgame charge',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'engaging\')}) != -1)',
    emitter: 'bS.engaging = true; return {};'
  },
  {
    id: 11,
    name: 'stop_engaging',
    title: 'stop endgame charge',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'stop_engaging\')}) != -1);',
    emitter: 'bS.engaging = false; return {};'
  },
  {
    id: 12,
    name: 'balanced',
    title: 'endgame balanced',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'balance\')}) != -1)',
    emitter: 'bS.balanced = true; return {};'
  },
  {
    id: 13,
    name: 'stop_balancing',
    title: 'stop balancing',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'stop_balancing\')}) != -1)',
    emitter: 'bS.balanced = false; return {};'
  },
  {
    id: 14,
    name: 'left_charge_station',
    title: 'left charge station',
    variables: {},
    watcher: 'return (bS.previousZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1 && ' +
      'bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) == -1);',
    emitter: 'bS.engaging = false; bS.balanced = false; return {};'
  },
  {
    id: 15,
    name: 'scoring_cube',
    title: 'scoring cube',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'scoring_cube\')}) != -1)',
    emitter: 'bS.scoringCube = true; return {};'
  },
  {
    id: 16,
    name: 'scoring_cone',
    title: 'scoring cone',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'scoring_cone\')}) != -1)',
    emitter: 'bS.scoringCone = true; return {};'
  },
  {
    id: 17,
    name: 'cancel_score',
    title: 'cancel score',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'cancel_score\')}) != -1)',
    emitter: 'bS.scoringCube = false; bS.scoringCone = false; bS.gridSelected = false; return {};'
  },
  {
    id: 18,
    name: 'grid_selected',
    title: 'grid selected',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'grid_rail\')}) != -1) || ' +
      '(btnS.findIndex((e) => {return e.name.includes(\'grid_community\')}) != -1) || ' +
      '(btnS.findIndex((e) => {return e.name.includes(\'grid_loading_zone\')}) != -1)',
    emitter: 'bS.gridSelected = true; return {};'
  },
  {
    id: 19,
    name: 'scored',
    title: 'scored',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'l_top\')}) != -1) || ' +
      '(btnS.findIndex((e) => {return e.name.includes(\'m_top\')}) != -1) || ' +
      '(btnS.findIndex((e) => {return e.name.includes(\'r_top\')}) != -1) || ' +
      '(btnS.findIndex((e) => {return e.name.includes(\'l_mid\')}) != -1) || ' +
      '(btnS.findIndex((e) => {return e.name.includes(\'m_mid\')}) != -1) || ' +
      '(btnS.findIndex((e) => {return e.name.includes(\'r_mid\')}) != -1) || ' +
      '(btnS.findIndex((e) => {return e.name.includes(\'l_low\')}) != -1) || ' +
      '(btnS.findIndex((e) => {return e.name.includes(\'m_low\')}) != -1) || ' +
      '(btnS.findIndex((e) => {return e.name.includes(\'r_low\')}) != -1)',
    emitter: 'bS.scoringCube = false; bS.scoringCone = false; bS.gridSelected = false; return {};'
  },
  // 'bS.previousZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1 && ' +
  // 'bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) == -1);',
];

export default eventDefinitions;
