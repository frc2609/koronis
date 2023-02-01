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
    emitter: 'bS.charging = true; return {};'
  },
  {
    id: 10,
    name: 'stop_engaging',
    title: 'stop endgame charge',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'stop_engaging\')}) != -1) ||' +
      '(btnS.findIndex((e) => {return e.name.includes(\'engaged\')}) != -1) ||' +
      '(btnS.findIndex((e) => {return e.name.includes(\'failed_engaged\')}) != -1) ||' +
      '(btnS.findIndex((e) => {return e.name.includes(\'docked\')}) != -1) ||' +
      '(btnS.findIndex((e) => {return e.name.includes(\'failed_docked\')}) != -1)',
    emitter: 'bS.charging = false; return {};'
  }
];

export default eventDefinitions;
