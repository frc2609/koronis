let buttonDefinitions = [
  {
    id: 0,
    name: 'cargo_pickup',
    title: 'Pick up Cargo',
    group: 'cargo_manipulate',
    horizontalWeight: 0.6,
    verticalWeight: 1,
    watcher: 'return !(bS.cargo);',
    style: {
      released: {palette: 'button', fill: 'Light Green', outline: 'Dark Green', text: 'Dark Green'},
      depressed: {palette: 'button', fill: 'Green', outline: 'Dark Green', text: 'Dark Green'}
    }
  },
  {
    id: 1,
    name: 'cargo_drop',
    title: 'Drop Cargo',
    group: 'cargo_manipulate',
    horizontalWeight: 0.4,
    verticalWeight: 1,
    watcher: 'return (bS.cargo);',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 2,
    name: 'hatch_pickup',
    title: 'Pick up Hatch',
    group: 'hatch_manipulate',
    horizontalWeight: 0.6,
    verticalWeight: 1,
    watcher: 'return !(bS.hatch);',
    style: {
      released: {palette: 'button', fill: 'Light Green', outline: 'Dark Green', text: 'Dark Green'},
      depressed: {palette: 'button', fill: 'Green', outline: 'Dark Green', text: 'Dark Green'}
    }
  },
  {
    id: 3,
    name: 'hatch_drop',
    title: 'Drop Hatch',
    group: 'hatch_manipulate',
    horizontalWeight: 0.4,
    verticalWeight: 1,
    watcher: 'return (bS.hatch) && !(' +
    '(bS.currentZones.findIndex((e) => {return e.name == \'cargo_zone\' && e.isAllied;}) != -1) || ' +
    '(bS.currentZones.findIndex((e) => {return (e.name == \'rocket_top_zone\' || e.name == \'rocket_bottom_zone\') && e.isAllied;}) != -1)' +
    ');',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 4,
    name: 'cargoship_success',
    title: 'Score Cargoship',
    group: 'cargoship',
    horizontalWeight: 0.6,
    verticalWeight: 1,
    watcher: 'return (bS.currentZones.findIndex((e) => {return e.name == \'cargo_zone\' && e.isAllied;}) != -1) && (bS.cargo || bS.hatch);',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 5,
    name: 'cargoship_fail',
    title: 'Fail',
    group: 'cargoship',
    horizontalWeight: 0.4,
    verticalWeight: 1,
    watcher: 'return (bS.currentZones.findIndex((e) => {return e.name == \'cargo_zone\' && e.isAllied;}) != -1) && (bS.cargo || bS.hatch);',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 6,
    name: 'rocket_1_success',
    title: 'Score Rocket Lvl 1',
    group: 'rocket_1',
    horizontalWeight: 0.6,
    verticalWeight: 1,
    watcher: 'return (bS.currentZones.findIndex((e) => {return (e.name == \'rocket_top_zone\' || e.name == \'rocket_bottom_zone\') && e.isAllied;}) != -1) && (bS.cargo || bS.hatch);',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 7,
    name: 'rocket_1_fail',
    title: 'Fail',
    group: 'rocket_1',
    horizontalWeight: 0.4,
    verticalWeight: 1,
    watcher: 'return (bS.currentZones.findIndex((e) => {return (e.name == \'rocket_top_zone\' || e.name == \'rocket_bottom_zone\') && e.isAllied;}) != -1) && (bS.cargo || bS.hatch);',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 8,
    name: 'rocket_2_success',
    title: 'Score Rocket Lvl 2',
    group: 'rocket_2',
    horizontalWeight: 0.6,
    verticalWeight: 1,
    watcher: 'return (bS.currentZones.findIndex((e) => {return (e.name == \'rocket_top_zone\' || e.name == \'rocket_bottom_zone\') && e.isAllied;}) != -1) && (bS.cargo || bS.hatch);',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 9,
    name: 'rocket_2_fail',
    title: 'Fail',
    group: 'rocket_2',
    horizontalWeight: 0.4,
    verticalWeight: 1,
    watcher: 'return (bS.currentZones.findIndex((e) => {return (e.name == \'rocket_top_zone\' || e.name == \'rocket_bottom_zone\') && e.isAllied;}) != -1) && (bS.cargo || bS.hatch);',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 10,
    name: 'rocket_3_success',
    title: 'Score Rocket Lvl 3',
    group: 'rocket_3',
    horizontalWeight: 0.6,
    verticalWeight: 1,
    watcher: 'return (bS.currentZones.findIndex((e) => {return (e.name == \'rocket_top_zone\' || e.name == \'rocket_bottom_zone\') && e.isAllied;}) != -1) && (bS.cargo || bS.hatch);',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 11,
    name: 'rocket_3_fail',
    title: 'Fail',
    group: 'rocket_3',
    horizontalWeight: 0.4,
    verticalWeight: 1,
    watcher: 'return (bS.currentZones.findIndex((e) => {return (e.name == \'rocket_top_zone\' || e.name == \'rocket_bottom_zone\') && e.isAllied;}) != -1) && (bS.cargo || bS.hatch);',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 11,
    name: 'robot_initiate_pin',
    title: 'Pin Opponent',
    group: 'defense',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return !(bS.contact);',
    style: {
      released: {palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow'},
      depressed: {palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow'}
    }
  },
  {
    id: 12,
    name: 'robot_receive_pin',
    title: 'Pinned',
    group: 'defense',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return !(bS.contact);',
    style: {
      released: {palette: 'button', fill: 'Light Orange', outline: 'Dark Orange', text: 'Dark Orange'},
      depressed: {palette: 'button', fill: 'Orange', outline: 'Dark Orange', text: 'Dark Orange'}
    }
  },
  {
    id: 13,
    name: 'robot_release_pin',
    title: 'Release Pin',
    group: 'defense',
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
