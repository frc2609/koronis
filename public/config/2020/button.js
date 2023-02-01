let buttonDefinitions = [
  {
    id: 0,
    name: 'pickup_power_cell',
    title: 'Pickup Power Cell',
    group: 'power_cell',
    horizontalWeight: 0.7,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Light Green', outline: 'Dark Green', text: 'Dark Green'},
      depressed: {palette: 'button', fill: 'Green', outline: 'Dark Green', text: 'Dark Green'}
    }
  },
  {
    id: 1,
    name: 'drop_power_cell',
    title: 'Drop',
    group: 'power_cell',
    horizontalWeight: 0.3,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 4,
    name: 'score_outer_port',
    title: 'Outer Port',
    group: 'top_port',
    horizontalWeight: 0.35,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue'},
      depressed: {palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue'}
    }
  },
  {
    id: 5,
    name: 'score_inner_port',
    title: 'Inner Port',
    group: 'top_port',
    horizontalWeight: 0.35,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 6,
    name: 'fail_top_port',
    title: 'Fail',
    group: 'top_port',
    horizontalWeight: 0.3,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 2,
    name: 'score_bottom_port',
    title: 'Bottom Port',
    group: 'bottom_port',
    horizontalWeight: 0.7,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 3,
    name: 'fail_bottom_port',
    title: 'Fail',
    group: 'bottom_port',
    horizontalWeight: 0.3,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 7,
    name: 'start_rotation_control',
    title: 'Start Rotation Control x',
    group: 'rotation',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (!bS.rotation && bS.currentZones.findIndex((e) => {return (e.name == \'trench\' && e.isAllied);}) != -1);',
    style: {
      released: {palette: 'button', fill: 'Light Green', outline: 'Dark Green', text: 'Dark Green'},
      depressed: {palette: 'button', fill: 'Green', outline: 'Dark Green', text: 'Dark Green'}
    }
  },
  {
    id: 8,
    name: 'score_rotation_control',
    title: 'Rotation Success',
    group: 'rotation',
    horizontalWeight: 0.6,
    verticalWeight: 1,
    watcher: 'return (bS.rotation);',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 9,
    name: 'fail_rotation_control',
    title: 'Fail',
    group: 'rotation',
    horizontalWeight: 0.4,
    verticalWeight: 1,
    watcher: 'return (bS.rotation);',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 10,
    name: 'start_position_control',
    title: 'Start Position Control y',
    group: 'position',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (!bS.positionControl && bS.currentZones.findIndex((e) => {return (e.name == \'trench\' && e.isAllied);}) != -1);',
    style: {
      released: {palette: 'button', fill: 'Light Green', outline: 'Dark Green', text: 'Dark Green'},
      depressed: {palette: 'button', fill: 'Green', outline: 'Dark Green', text: 'Dark Green'}
    }
  },
  {
    id: 11,
    name: 'score_position_control',
    title: 'Position Success',
    group: 'position',
    horizontalWeight: 0.6,
    verticalWeight: 1,
    watcher: 'return (bS.positionControl);',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 12,
    name: 'fail_position_control',
    title: 'Fail',
    group: 'position',
    horizontalWeight: 0.4,
    verticalWeight: 1,
    watcher: 'return (bS.positionControl);',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 13,
    name: 'start_climb',
    title: 'Start Climb',
    group: 'climb',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.climbed == -1 && bS.currentZones.findIndex((e) => {return (e.name == \'ren_zone\' && e.isAllied);}) != -1);',
    style: {
      released: {palette: 'button', fill: 'Light Green', outline: 'Dark Green', text: 'Dark Green'},
      depressed: {palette: 'button', fill: 'Green', outline: 'Dark Green', text: 'Dark Green'}
    }
  },
  {
    id: 14,
    name: 'score_climb',
    title: 'Climb Success',
    group: 'climb',
    horizontalWeight: 0.6,
    verticalWeight: 1,
    watcher: 'return (bS.climbed == 0);',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 15,
    name: 'fail_climb',
    title: 'Climb Fail',
    group: 'climb',
    horizontalWeight: 0.4,
    verticalWeight: 1,
    watcher: 'return (bS.climbed != -1);',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 16,
    name: 'score_balance',
    title: 'Balanced',
    group: 'balance',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return (bS.climbed == 1 && bS.balanced == -1) || (bS.balanced == 0);',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 17,
    name: 'fail_balance',
    title: 'Not Balanced',
    group: 'balance',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return (bS.climbed == 1 && bS.balanced == -1) || (bS.balanced == 1);',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 18,
    name: 'start_pin',
    title: 'Start Pin',
    group: 'pin',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return (!bS.contact);',
    style: {
      released: {palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue'},
      depressed: {palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue'}
    }
  },
  {
    id: 19,
    name: 'receive_pin',
    title: 'Received Pin',
    group: 'pin',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return (!bS.contact);',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 20,
    name: 'stop_pin',
    title: 'Pin Stopped',
    group: 'pin',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.contact);',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  }
];

export default buttonDefinitions;
