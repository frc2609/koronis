let eventDefinitions = [
  {
    id: 0,
    name: 'pickup_power_cell',
    title: 'Picked Up Power Cell',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'pickup_power_cell\')}) != -1);',
    emitter: 'bS.powerCells++; return {};'
  },
  {
    id: 1,
    name: 'drop_power_cell',
    title: 'Dropped Power Cell',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'drop_power_cell\')}) != -1);',
    emitter: 'bS.powerCells--; return {};'
  },
  {
    id: 2,
    name: 'score_port',
    title: 'Scored Power Cell',
    variables: {
      port: 'bottom' //bottom, outer, or inner
    },
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'score\') && e.name.includes(\'port\');}) != -1);',
    emitter: 'bS.powerCells--;' + 
    'if((btnS.findIndex((e) => {return e.name.includes(\'score_bottom_port\')}) != -1)){return {port: \'bottom\'};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'score_outer_port\')}) != -1)){return {port: \'outer\'};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'score_inner_port\')}) != -1)){return {port: \'inner\'};}'
  },
  {
    id: 3,
    name: 'fail_port',
    title: 'Failed to score Power Cell',
    variables: {
      port: 'bottom' //bottom, outer, or inner
    },
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'fail\') && e.name.includes(\'port\');}) != -1);',
    emitter: 'bS.powerCells--;' + 
    'if((btnS.findIndex((e) => {return e.name.includes(\'fail_bottom_port\')}) != -1)){return {port: \'bottom\'};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'fail_top_port\')}) != -1)){return {port: \'top\'};}'
  },
  {
    id: 4,
    name: 'start_rotation_control',
    title: 'Rotation Control Started',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'start_rotation_control\')}) != -1);',
    emitter: 'bS.rotation = true; return {};'
  },
  {
    id: 5,
    name: 'score_rotation_control',
    title: 'Rotation Control Success',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'score_rotation_control\')}) != -1);',
    emitter: 'bS.rotation = false; return {};'
  },
  {
    id: 6,
    name: 'fail_rotation_control',
    title: 'Rotation Control Fail',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'fail_rotation_control\')}) != -1);',
    emitter: 'bS.rotation = false; return {};'
  },
  {
    id: 7,
    name: 'start_position_control',
    title: 'Position Control Started',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'start_position_control\')}) != -1);',
    emitter: 'bS.positionControl = true; return {};'
  },
  {
    id: 8,
    name: 'score_position_control',
    title: 'Position Control Success',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'score_position_control\')}) != -1);',
    emitter: 'bS.positionControl = false; return {};'
  },
  {
    id: 9,
    name: 'fail_position_control',
    title: 'Position Control Fail',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'fail_position_control\')}) != -1);',
    emitter: 'bS.positionControl = false; return {};'
  },
  {
    id: 10,
    name: 'start_climb',
    title: 'Climb Started',
    variables: {},
    watcher: 'return !bS.parked && (btnS.findIndex((e) => {return e.name.includes(\'start_climb\')}) != -1);',
    emitter: 'bS.climbed = 0; return {};'
  },
  {
    id: 11,
    name: 'score_climb',
    title: 'Climb Success',
    variables: {},
    watcher: 'return !bS.parked && (btnS.findIndex((e) => {return e.name.includes(\'score_climb\')}) != -1);',
    emitter: 'bS.climbed = 1; return {};'
  },
  {
    id: 12,
    name: 'fail_climb',
    title: 'Climb Fail',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'fail_climb\')}) != -1) || bS.parked;',
    emitter: 'bS.climbed = -1; return {};'
  },
  {
    id: 13,
    name: 'score_balance',
    title: 'Balance Success',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'score_balance\')}) != -1);',
    emitter: 'bS.balanced = 1; return {};'
  },
  {
    id: 14,
    name: 'fail_balance',
    title: 'Balance Fail',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'fail_balance\')}) != -1);',
    emitter: 'bS.balanced = 0; return {};'
  },
  {
    id: 15,
    name: 'no_balance',
    title: 'Balance Not Possible',
    variables: {},
    watcher: 'return bS.balanced != -1 && bS.climbed == -1;',
    emitter: 'bS.balanced = -1; return {};'
  },
  {
    id: 16,
    name: 'start_pin',
    title: 'Pinning another Robot',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'start_pin\')}) != -1);',
    emitter: 'bS.contact = true; bS.lastContact = bS.position.t; return {};'
  },
  {
    id: 17,
    name: 'receive_pin',
    title: 'Pinned by another Robot',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'receive_pin\')}) != -1);',
    emitter: 'bS.contact = true; bS.lastContact = bS.position.t; return {};'
  },
  {
    id: 18,
    name: 'stop_pin',
    title: 'Pin Stopped',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'stop_pin\')}) != -1) ||' +
    '(bS.contact && bS.lastContact + 5 < bS.position.t);',
    emitter: 'bS.contact = false; bS.lastContact = 0; return {};'
  },
  {
    id: 19,
    name: 'auto_line',
    title: 'Moved off Auto Line',
    variables: {
      inAuto: false //true if moved off auto line during auto
    },
    watcher: 'return (!bS.autoLine && ' + 
    'bS.previousZones.findIndex((e) => {return (e.name == \'initiation_line\' && e.isAllied);}) != -1 && ' +
    'bS.currentZones.findIndex((e) => {return (e.name == \'initiation_line\' && e.isAllied);}) == -1 && ' +
    'bS.position.t > 0);',
    emitter: 'bS.autoLine = true; return { inAuto: (bS.position.t <= 15) };'
  },
  {
    id: 20,
    name: 'parked',
    title: 'Parked',
    variables: {},
    watcher: 'return (!bS.parked && bS.climbed != 1 && ' + 
    'bS.currentZones.findIndex((e) => {return (e.name == \'ren_zone\' && e.isAllied);}) != -1 && ' +
    'bS.position.t > gS.gameLength + 5);',
    emitter: 'bS.parked = true; return {};'
  }
];

export default eventDefinitions;
