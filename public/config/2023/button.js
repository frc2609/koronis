let buttonDefinitions = [
  {
    id: 0,
    name: 'pickup_cube',
    title: 'Pickup',
    group: 'piece_cube',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: { palette: 'button', fill: 'Light Purple', outline: 'Dark Purple', text: 'Dark Purple' },
      depressed: { palette: 'button', fill: 'Purple', outline: 'Dark Purple', text: 'Dark Purple' }
    }
  },
  {
    id: 1,
    name: 'score_cube',
    title: 'Score',
    group: 'piece_cube',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: { palette: 'button', fill: 'Light Green', outline: 'Dark Green', text: 'Dark Green' },
      depressed: { palette: 'button', fill: 'Green', outline: 'Dark Green', text: 'Dark Green' }
    }
  },
  {
    id: 2,
    name: 'drop_cube',
    title: 'Drop',
    group: 'piece_cube',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: { palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red' },
      depressed: { palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red' }
    }
  },
  {
    id: 3,
    name: 'pickup_cone',
    title: 'Pickup',
    group: 'piece_cone',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 4,
    name: 'score_cone',
    title: 'Score',
    group: 'piece_cone',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: { palette: 'button', fill: 'Light Green', outline: 'Dark Green', text: 'Dark Green' },
      depressed: { palette: 'button', fill: 'Green', outline: 'Dark Green', text: 'Dark Green' }
    }
  },
  {
    id: 5,
    name: 'drop_cone',
    title: 'Drop',
    group: 'piece_cone',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: { palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red' },
      depressed: { palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red' }
    }
  },
  {
    id: 6,
    name: 'docking',
    title: 'Docked',
    group: 'engage',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return !bS.docking && (bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue' },
      depressed: { palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue' }
    }
  },
  {
    id: 61,
    name: 'stop_docking',
    title: 'Docked',
    group: 'engage',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return  (bS.docking) && (bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Green', outline: 'Green', text: 'Green' },
      depressed: { palette: 'button', fill: 'Light Green', outline: 'Green', text: 'Green' }
    }
  },
  {
    id: 7,
    name: 'balancing',
    title: 'Balanced',
    group: 'engage',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (!bS.balanced) && (bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue' },
      depressed: { palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue' }
    }
  },
  {
    id: 71,
    name: 'stop_balancing',
    title: 'Balanced',
    group: 'engage',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.balanced) && (bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Green', outline: 'Green', text: 'Green' },
      depressed: { palette: 'button', fill: 'Light Green', outline: 'Green', text: 'Green' }
    }
  },
  {
    id: 100,
    name: 'start_pin',
    title: 'Start Pin',
    group: 'pin',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return (!bS.contact) && !(bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue' },
      depressed: { palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue' }
    }
  },
  {
    id: 101,
    name: 'receive_pin',
    title: 'Received Pin',
    group: 'pin',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return (!bS.contact) && !(bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 102,
    name: 'stop_pin',
    title: 'Pin Stopped',
    group: 'pin',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.contact);',
    style: {
      released: { palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red' },
      depressed: { palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red' }
    }
  },
  {
    id: 103,
    name: 'tipped',
    title: 'tipped',
    group: 'dead',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 104,
    name: 'died',
    title: 'died',
    group: 'dead',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: { palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red' },
      depressed: { palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red' }
    }
  }
];

export default buttonDefinitions;
