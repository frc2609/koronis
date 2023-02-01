let eventDefinitions = [
  {
    id: 0,
    name: 'pickup_cargo',
    title: 'Picked Up Cargo',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'pickup_cargo\')}) != -1);',
    emitter: 'bS.cargo++; return {};'
  },
  {
    id: 1,
    name: 'drop_cargo',
    title: 'Dropped Cargo',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'drop_cargo\')}) != -1);',
    emitter: 'bS.cargo--; return {};'
  },
  {
    id: 2,
    name: 'score_port',
    title: 'Scored Cargo',
    variables: {
      hub: 'lower' //lower or upper
    },
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'score\') && e.name.includes(\'hub\');}) != -1);',
    emitter: 'bS.cargo--;' + 
    'if((btnS.findIndex((e) => {return e.name.includes(\'score_lower_hub\')}) != -1)){return {hub: \'lower\'};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'score_upper_hub\')}) != -1)){return {hub: \'upper\'};}'
  },
  {
    id: 3,
    name: 'fail_port',
    title: 'Failed to score Cargo',
    variables: {
      hub: 'upper' //lower or upper
    },
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'fail\') && e.name.includes(\'hub\');}) != -1);',
    emitter: 'bS.cargo--;' + 
    'if((btnS.findIndex((e) => {return e.name.includes(\'fail_lower_hub\')}) != -1)){return {hub: \'lower\'};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'fail_upper_hub\')}) != -1)){return {hub: \'upper\'};}'
  },
  {
    id: 4,
    name: 'start_climb',
    title: 'Climb Started',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'start_climb\')}) != -1);',
    emitter: 'bS.climbed = 0; return {};'
  },
  {
    id: 5,
    name: 'score_climb',
    title: 'Climb Success',
    variables: {
      rung: 'low' //low, mid, high, or traversal
    },
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'climb\') && !e.name.includes(\'fail\') && !e.name.includes(\'start\');}) != -1);',
    emitter: 'if((btnS.findIndex((e) => {return e.name.includes(\'low_climb\')}) != -1)){bS.climbed = 1; return {rung: \'low\'};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'mid_climb\')}) != -1)){bS.climbed = 2; return {rung: \'mid\'};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'high_climb\')}) != -1)){bS.climbed = 3; return {rung: \'high\'};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'traversal_climb\')}) != -1)){bS.climbed = 4; return {rung: \'traversal\'};}'
  },
  {
    id: 6,
    name: 'fail_climb',
    title: 'Climb Fail',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'fail_climb\')}) != -1);',
    emitter: 'bS.climbed = -1; return {};'
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
    name: 'taxi',
    title: 'Taxied off tarmac',
    variables: {
      inAuto: false //true if moved off auto line during auto
    },
    watcher: 'return (!bS.taxi && ' + 
    'bS.previousZones.findIndex((e) => {return (e.name == \'tarmac\' && e.isAllied);}) != -1 && ' +
    'bS.currentZones.findIndex((e) => {return (e.name == \'tarmac\' && e.isAllied);}) == -1 && ' +
    'bS.position.t > 0);',
    emitter: 'bS.taxi = true; return { inAuto: (bS.position.t <= 15) };'
  }
];

export default eventDefinitions;
