let buttonDefinitions = [
  {
    id: 0,
    name: 'mock_event_0',
    title: 'Mock Event 0',
    group: 'mock_event_0',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  },
  {
    id: 1,
    name: 'mock_event_1',
    title: 'Mock Event 1',
    group: 'mock_event_1_2',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue'},
      depressed: {palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue'}
    }
  },
  {
    id: 2,
    name: 'mock_event_2',
    title: 'Mock Event 2',
    group: 'mock_event_1_2',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Very Light Blue', outline: 'Blue', text: 'Blue'},
      depressed: {palette: 'button', fill: 'Light Blue', outline: 'Blue', text: 'Blue'}
    }
  },
  {
    id: 3,
    name: 'mock_event_3',
    title: 'Mock Event 3',
    group: 'mock_event_3',
    horizontalWeight: 1,
    verticalWeight: 1.25,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 4,
    name: 'mock_event_4',
    title: 'Mock Event 4',
    group: 'mock_event_4_5',
    horizontalWeight: 0.66,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Very Light Red', outline: 'Red', text: 'Red'},
      depressed: {palette: 'button', fill: 'Light Red', outline: 'Red', text: 'Red'}
    }
  },
  {
    id: 5,
    name: 'mock_event_5',
    title: 'Mock Event 5',
    group: 'mock_event_4_5',
    horizontalWeight: 0.34,
    verticalWeight: 1,
    watcher: 'return true;',
    style: {
      released: {palette: 'button', fill: 'Very Light Red', outline: 'Red', text: 'Red'},
      depressed: {palette: 'button', fill: 'Light Red', outline: 'Red', text: 'Red'}
    }
  },
  {
    id: 6,
    name: 'pickup_mock_game_element',
    title: 'Pickup Mock Game Element',
    group: 'mock_game_element',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return (bS.mockGameElement < 3);',
    style: {
      released: {palette: 'button', fill: 'Light Green', outline: 'Dark Green', text: 'Dark Green'},
      depressed: {palette: 'button', fill: 'Green', outline: 'Dark Green', text: 'Dark Green'}
    }
  },
  {
    id: 7,
    name: 'drop_mock_game_element',
    title: 'Drop Mock Game Element',
    group: 'mock_game_element',
    horizontalWeight: 0.5,
    verticalWeight: 1,
    watcher: 'return (bS.mockGameElement > 0);',
    style: {
      released: {palette: 'button', fill: 'Light Red', outline: 'Dark Red', text: 'Dark Red'},
      depressed: {palette: 'button', fill: 'Red', outline: 'Dark Red', text: 'Dark Red'}
    }
  },
  {
    id: 8,
    name: 'score_mock_game_element',
    title: 'Score Mock Game Element',
    group: 'score_mock_game_element',
    horizontalWeight: 1,
    verticalWeight: 1,
    watcher: 'return (bS.mockGameElement > 0 && bS.currentZones.findIndex((e) => {return (e.name == \'mock_scoring_zone\' && e.isAllied);}) != -1);',
    style: {
      released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
      depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
    }
  }
];

export default buttonDefinitions;
