let buttonDefinitions = [
  {
    id: 0,
    name: 'pickup_cube',
    title: 'Pickup Cube',
    group: 'piece_cube',
    horizontalWeight: 0.66,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: { palette: 'button', fill: 'Light Purple', outline: 'Dark Purple', text: 'Dark Purple' },
      depressed: { palette: 'button', fill: 'Purple', outline: 'Dark Purple', text: 'Dark Purple' }
    }
  },
  {
    id: 1,
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
    id: 2,
    name: 'pickup_cone',
    title: 'Pickup Cone',
    group: 'piece_cone',
    horizontalWeight: 0.66,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 3,
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
    id: 4,
    name: 'lt_cone',
    title: 'top cone',
    group: 'grid_1_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_1\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 5,
    name: 't_cube',
    title: 'top cube',
    group: 'grid_1_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_1\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Purple', outline: 'Dark Purple', text: 'Dark Purple' },
      depressed: { palette: 'button', fill: 'Purple', outline: 'Dark Purple', text: 'Dark Purple' }
    }
  },
  {
    id: 6,
    name: 'rt_cone',
    title: 'top cone',
    group: 'grid_1_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_1\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 7,
    name: 'lm_cone',
    title: 'mid cone',
    group: 'grid_1_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_1\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 8,
    name: 'm_cube',
    title: 'mid cube',
    group: 'grid_1_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_1\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Purple', outline: 'Dark Purple', text: 'Dark Purple' },
      depressed: { palette: 'button', fill: 'Purple', outline: 'Dark Purple', text: 'Dark Purple' }
    }
  },
  {
    id: 9,
    name: 'rm_cone',
    title: 'mid cone',
    group: 'grid_1_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_1\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  ,
  {
    id: 10,
    name: 'l_low',
    title: 'low goal',
    group: 'grid_1_low',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_1\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 11,
    name: 'm_low',
    title: 'low goal',
    group: 'grid_1_low',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_1\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Very Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 12,
    name: 'r_low',
    title: 'low goal',
    group: 'grid_1_low',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_1\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 13,
    name: 'lt_cone',
    title: 'top cone',
    group: 'coop_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_coop\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Light Grey', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Light Grey', text: 'Dark Yellow' }
    }
  },
  {
    id: 14,
    name: 't_cube',
    title: 'top cube',
    group: 'coop_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_coop\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Purple', outline: 'Light Grey', text: 'Dark Purple' },
      depressed: { palette: 'button', fill: 'Purple', outline: 'Light Grey', text: 'Dark Purple' }
    }
  },
  {
    id: 15,
    name: 'rt_cone',
    title: 'top cone',
    group: 'coop_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_coop\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Light Grey', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Light Grey', text: 'Dark Yellow' }
    }
  },
  {
    id: 16,
    name: 'lm_cone',
    title: 'mid cone',
    group: 'coop_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_coop\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Light Grey', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Light Grey', text: 'Dark Yellow' }
    }
  },
  {
    id: 17,
    name: 'm_cube',
    title: 'mid cube',
    group: 'coop_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_coop\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Purple', outline: 'Light Grey', text: 'Dark Purple' },
      depressed: { palette: 'button', fill: 'Purple', outline: 'Light Grey', text: 'Dark Purple' }
    }
  },
  {
    id: 18,
    name: 'rm_cone',
    title: 'mid cone',
    group: 'coop_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_coop\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Light Grey', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Light Grey', text: 'Dark Yellow' }
    }
  },
  {
    id: 19,
    name: 'l_low',
    title: 'low goal',
    group: 'coop_low',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_coop\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Light Grey', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Light Grey', text: 'Dark Blue' }
    }
  },
  {
    id: 20,
    name: 'm_low',
    title: 'low goal',
    group: 'coop_low',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_coop\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Very Light Blue', outline: 'Light Grey', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Light Blue', outline: 'Light Grey', text: 'Dark Blue' }
    }
  },
  {
    id: 21,
    name: 'r_low',
    title: 'low goal',
    group: 'coop_low',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_coop\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Light Grey', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Light Grey', text: 'Dark Blue' }
    }
  },
  {
    id: 22,
    name: 'lt_cone',
    title: 'top cone',
    group: 'grid_2_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_2\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 23,
    name: 't_cube',
    title: 'top cube',
    group: 'grid_2_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_2\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Purple', outline: 'Dark Purple', text: 'Dark Purple' },
      depressed: { palette: 'button', fill: 'Purple', outline: 'Dark Purple', text: 'Dark Purple' }
    }
  },
  {
    id: 24,
    name: 'rt_cone',
    title: 'top cone',
    group: 'grid_2_top',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_2\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 25,
    name: 'lm_cone',
    title: 'mid cone',
    group: 'grid_2_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_2\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  {
    id: 26,
    name: 'm_cube',
    title: 'mid cube',
    group: 'grid_2_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_2\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Purple', outline: 'Dark Purple', text: 'Dark Purple' },
      depressed: { palette: 'button', fill: 'Purple', outline: 'Dark Purple', text: 'Dark Purple' }
    }
  },
  {
    id: 27,
    name: 'rm_cone',
    title: 'mid cone',
    group: 'grid_2_mid',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_2\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' },
      depressed: { palette: 'button', fill: 'Yellow', outline: 'Dark Yellow', text: 'Dark Yellow' }
    }
  },
  ,
  {
    id: 28,
    name: 'l_low',
    title: 'low goal',
    group: 'grid_2_low',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_2\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 29,
    name: 'm_low',
    title: 'low goal',
    group: 'grid_2_low',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_2\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Very Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 30,
    name: 'r_low',
    title: 'low goal',
    group: 'grid_2_low',
    horizontalWeight: 0.33,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'grid_2\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 31,
    name: 'docked',
    title: 'docked',
    group: 'dock',
    horizontalWeight: .66,
    verticalWeight: 1,
    watcher: 'return bS.charging;',
    style: {
      released: { palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue' },
      depressed: { palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue' }
    }
  },
  {
    id: 32,
    name: 'failed_docked',
    title: 'failed',
    group: 'dock',
    horizontalWeight: .33,
    verticalWeight: 1,
    watcher: 'return bS.charging;',
    style: {
      released: { palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red' },
      depressed: { palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red' }
    }
  },
  {
    id: 33,
    name: 'engaged',
    title: 'engaged',
    group: 'engage',
    horizontalWeight: .66,
    verticalWeight: 1,
    watcher: 'return bS.charging;',
    style: {
      released: { palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue' },
      depressed: { palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue' }
    }
  },
  {
    id: 34,
    name: 'failed_engaged',
    title: 'failed',
    group: 'engage',
    horizontalWeight: .33,
    verticalWeight: 1,
    watcher: 'return bS.charging;',
    style: {
      released: { palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red' },
      depressed: { palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red' }
    }
  },
  {
    id: 35,
    name: 'engaging',
    title: 'engaging',
    group: 'engage',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return !bS.charging && (bS.currentZones.findIndex((e) => {return (e.name == \'charge_station\' && e.isAllied);}) != -1);',
    style: {
      released: { palette: 'button', fill: 'Light Green', outline: 'Dark Green', text: 'Dark Green' },
      depressed: { palette: 'button', fill: 'Green', outline: 'Dark Green', text: 'Dark Green' }
    }
  },
  {
    id: 36,
    name: 'stop_engaging',
    title: 'engaging Stopped',
    group: 'stop_engage',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.charging);',
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
    watcher: 'return (!bS.contact) && !(bS.currentZones.findIndex((e) => {return (e.name == \'community_zone\' && e.isAllied);}) != -1);',
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
    watcher: 'return (!bS.contact) && !(bS.currentZones.findIndex((e) => {return (e.name == \'community_zone\' && e.isAllied);}) != -1);',
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
