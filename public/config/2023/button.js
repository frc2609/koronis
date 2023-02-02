let buttonDefinitions = [
  {
    id: 0,
    name: 'pickup_cube',
    title: 'Pickup',
    group: 'piece_cube',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return (!bS.scoringCube && !bS.scoringCone);',
    style: {
      released: { palette: 'button', fill: 'Light Purple', outline: 'Dark Purple', text: 'Dark Purple' },
      depressed: { palette: 'button', fill: 'Purple', outline: 'Dark Purple', text: 'Dark Purple' }
    }
  },
  {
    id: 1,
    name: 'scoring_cube',
    title: 'score',
    group: 'piece_cube',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return (!bS.scoringCube && !bS.scoringCone);',
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
    watcher: 'return (!bS.scoringCube && !bS.scoringCone);',
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
    watcher: 'return (!bS.scoringCube && !bS.scoringCone);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 4,
    name: 'scoring_cone',
    title: 'score',
    group: 'piece_cone',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return (!bS.scoringCube && !bS.scoringCone);',
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
    watcher: 'return (!bS.scoringCube && !bS.scoringCone);',
    style: {
      released: { palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red' },
      depressed: { palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red' }
    }
  },
  {
    id: 6,
    name: 'engaging',
    title: 'engaging',
    group: 'engage',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return !bS.scoringCube && !bS.scoringCone && !bS.engaging && (bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Green', outline: 'Dark Green', text: 'Dark Green' },
      depressed: { palette: 'button', fill: 'Green', outline: 'Dark Green', text: 'Dark Green' }
    }
  },
  {
    id: 7,
    name: 'balance',
    title: 'balance',
    group: 'engage',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.engaging && !bS.balanced && !bS.scoringCube && !bS.scoringCone);',
    style: {
      released: { palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue' },
      depressed: { palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue' }
    }
  },
  {
    id: 8,
    name: 'stop_engaging',
    title: 'X',
    group: 'engage',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return !bS.scoringCube && !bS.scoringCone && (bS.engaging && !bS.balanced);',
    style: {
      released: { palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red' },
      depressed: { palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red' }
    }
  },
  {
    id: 9,
    name: 'balanced',
    title: 'balanced',
    group: 'engage',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return !bS.scoringCube && !bS.scoringCone && (bS.balanced);',
    style: {
      released: { palette: 'button', fill: 'Light Green', outline: 'Green', text: 'Green' },
      depressed: { palette: 'button', fill: 'Light Green', outline: 'Green', text: 'Green' }
    }
  },
  {
    id: 10,
    name: 'stop_balancing',
    title: 'X',
    group: 'engage',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return !bS.scoringCube && !bS.scoringCone && (bS.balanced);',
    style: {
      released: { palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red' },
      depressed: { palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red' }
    }
  },
  {
    id: 11,
    name: 'grid_loading_zone',
    title: '↑',
    group: 'grid_loading_zone',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.scoringCube || bS.scoringCone) && !fS.flip && !bS.gridSelected;',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 12,
    name: 'grid_rail',
    title: '▼',
    group: 'grid_rail',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.scoringCube || bS.scoringCone) && fS.flip && !bS.gridSelected;',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 13,
    name: 'grid_community',
    title: '♦',
    group: 'grid_community',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.scoringCube || bS.scoringCone) && !bS.gridSelected;',
    style: {
      released: { palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue' },
      depressed: { palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue' }
    }
  },
  {
    id: 14,
    name: 'grid_rail',
    title: '▲',
    group: 'grid_rail',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.scoringCube || bS.scoringCone) && !fS.flip && !bS.gridSelected;',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 15,
    name: 'grid_loading_zone',
    title: '↓',
    group: 'grid_loading_zone',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.scoringCube || bS.scoringCone) && fS.flip && !bS.gridSelected;',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 16,
    name: 'l_top',
    title: 'top cone',
    group: 'grid_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected && bS.scoringCone;',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 161,
    name: 'disabled',
    title: 'top cone',
    group: 'grid_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected && !bS.scoringCone;',
    style: {
      released: { palette: 'button', fill: 'Light Grey', outline: 'Grey', text: 'Grey' },
      depressed: { palette: 'button', fill: 'Light Grey', outline: 'Grey', text: 'Grey' }
    }
  },
  {
    id: 17,
    name: 'm_top',
    title: 'top cube',
    group: 'grid_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected && bS.scoringCube;',
    style: {
      released: { palette: 'button', fill: 'Light Purple', outline: 'Dark Purple', text: 'Dark Purple' },
      depressed: { palette: 'button', fill: 'Purple', outline: 'Dark Purple', text: 'Dark Purple' }
    }
  },
  {
    id: 171,
    name: 'disabled',
    title: 'top cube',
    group: 'grid_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected && !bS.scoringCube;',
    style: {
      released: { palette: 'button', fill: 'Light Grey', outline: 'Grey', text: 'Grey' },
      depressed: { palette: 'button', fill: 'Light Grey', outline: 'Grey', text: 'Grey' }
    }
  },
  {
    id: 18,
    name: 'r_top',
    title: 'top cone',
    group: 'grid_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected && bS.scoringCone;',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 181,
    name: 'disabled',
    title: 'top cone',
    group: 'grid_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected && !bS.scoringCone;',
    style: {
      released: { palette: 'button', fill: 'Light Grey', outline: 'Grey', text: 'Grey' },
      depressed: { palette: 'button', fill: 'Light Grey', outline: 'Grey', text: 'Grey' }
    }
  },
  {
    id: 19,
    name: 'l_mid',
    title: 'mid cone',
    group: 'grid_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected && bS.scoringCone;',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 191,
    name: 'disabled',
    title: 'mid cone',
    group: 'grid_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected && !bS.scoringCone;',
    style: {
      released: { palette: 'button', fill: 'Light Grey', outline: 'Grey', text: 'Grey' },
      depressed: { palette: 'button', fill: 'Light Grey', outline: 'Grey', text: 'Grey' }
    }
  },
  {
    id: 20,
    name: 'm_mid',
    title: 'mid cube',
    group: 'grid_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected && bS.scoringCube;',
    style: {
      released: { palette: 'button', fill: 'Light Purple', outline: 'Dark Purple', text: 'Dark Purple' },
      depressed: { palette: 'button', fill: 'Purple', outline: 'Dark Purple', text: 'Dark Purple' }
    }
  },
  {
    id: 201,
    name: 'disabled',
    title: 'mid cube',
    group: 'grid_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected && !bS.scoringCube;',
    style: {
      released: { palette: 'button', fill: 'Light Grey', outline: 'Grey', text: 'Grey' },
      depressed: { palette: 'button', fill: 'Light Grey', outline: 'Grey', text: 'Grey' }
    }
  },
  {
    id: 21,
    name: 'r_mid',
    title: 'mid cone',
    group: 'grid_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected && bS.scoringCone;',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 211,
    name: 'disabled',
    title: 'mid cone',
    group: 'grid_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected && !bS.scoringCone;',
    style: {
      released: { palette: 'button', fill: 'Light Grey', outline: 'Grey', text: 'Grey' },
      depressed: { palette: 'button', fill: 'Light Grey', outline: 'Grey', text: 'Grey' }
    }
  },
  {
    id: 22,
    name: 'l_low',
    title: 'low goal',
    group: 'grid_low',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected;',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 23,
    name: 'm_low',
    title: 'low goal',
    group: 'grid_low',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected;',
    style: {
      released: { palette: 'button', fill: 'Very Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 24,
    name: 'r_low',
    title: 'low goal',
    group: 'grid_low',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return bS.gridSelected;',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 25,
    name: 'cancel_score',
    title: 'Cancel',
    group: 'cancel_score',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.scoringCube || bS.scoringCone);',
    style: {
      released: { palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red' },
      depressed: { palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red' }
    }
  },
  {
    id: 100,
    name: 'start_pin',
    title: 'Start Pin',
    group: 'pin',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return !bS.scoringCube && !bS.scoringCone && (!bS.contact) && !(bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1);',
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
    watcher: 'return !bS.scoringCube && !bS.scoringCone && (!bS.contact) && !(bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1);',
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
    watcher: 'return (bS.contact && !bS.scoringCube && !bS.scoringCone);',
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
