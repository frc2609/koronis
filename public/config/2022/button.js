let buttonDefinitions = [
  {
    id: 0,
    name: 'pickup_cargo',
    title: 'Pickup Cargo',
    group: 'power_cargo',
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
    name: 'drop_cargo',
    title: 'Drop',
    group: 'power_cargo',
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
    name: 'score_upper_hub',
    title: 'Upper Hub',
    group: 'upper_hub',
    horizontalWeight: 0.7,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue'},
      depressed: {palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue'}
    }
  },
  {
    id: 3,
    name: 'fail_upper_hub',
    title: 'Fail',
    group: 'upper_hub',
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
    name: 'score_lower_hub',
    title: 'Lower Hub',
    group: 'lower_hub',
    horizontalWeight: 0.7,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 5,
    name: 'fail_lower_hub',
    title: 'Fail',
    group: 'lower_hub',
    horizontalWeight: 0.3,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 6,
    name: 'start_climb',
    title: 'Start Climb',
    group: 'climb1',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.climbed < 0 && bS.currentZones.findIndex((e) => {return (e.name == \'climb_zone\' && e.isAllied);}) != -1);',
    style: {
      released: {palette: 'button', fill: 'Light Green', outline: 'Dark Green', text: 'Dark Green'},
      depressed: {palette: 'button', fill: 'Green', outline: 'Dark Green', text: 'Dark Green'}
    }
  },
  {
    id: 7,
    name: 'low_climb',
    title: 'Low',
    group: 'climb1',
    horizontalWeight: 0.3,
    verticalWeight: 1,
    watcher: 'return (bS.climbed >= 0);',
    style: {
      released: {palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue'},
      depressed: {palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue'}
    }
  },
  {
    id: 8,
    name: 'mid_climb',
    title: 'Mid',
    group: 'climb1',
    horizontalWeight: 0.3,
    verticalWeight: 1,
    watcher: 'return (bS.climbed >= 0);',
    style: {
      released: {palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue'},
      depressed: {palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue'}
    }
  },
  {
    id: 9,
    name: 'high_climb',
    title: 'High',
    group: 'climb1',
    horizontalWeight: 0.3,
    verticalWeight: 1,
    watcher: 'return (bS.climbed >= 0);',
    style: {
      released: {palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue'},
      depressed: {palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue'}
    }
  },
  {
    id: 10,
    name: 'traversal_climb',
    title: 'Traversal',
    group: 'climb2',
    horizontalWeight: 0.7,
    verticalWeight: 1,
    watcher: 'return (bS.climbed >= 0);',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 11,
    name: 'fail_climb',
    title: 'Fail',
    group: 'climb2',
    horizontalWeight: 0.3,
    verticalWeight: 1,
    watcher: 'return (bS.climbed >= 0);',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 12,
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
    id: 13,
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
    id: 14,
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
