let eventDefinitions = [
  {
    id: 0,
    name: 'mock_event',
    title: 'Mock Event',
    variables: {
      value: 0
    },
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'mock_event\');}) != -1);',
    emitter: 'if((btnS.findIndex((e) => {return e.name.includes(\'mock_event_0\')}) != -1)){return {number: 0};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'mock_event_1\')}) != -1)){return {value: 1};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'mock_event_2\')}) != -1)){return {value: 2};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'mock_event_3\')}) != -1)){return {value: 3};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'mock_event_4\')}) != -1)){return {value: 4};}' +
    'if((btnS.findIndex((e) => {return e.name.includes(\'mock_event_5\')}) != -1)){return {value: 5};}'
  },
  {
    id: 1,
    name: 'pickup_mock_game_element',
    title: 'Picked Up Mock Game Element',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'pickup_mock_game_element\')}) != -1);',
    emitter: 'bS.mockGameElement++; return {};'
  },
  {
    id: 2,
    name: 'drop_mock_game_element',
    title: 'Dropped Mock Game Element',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'drop_mock_game_element\')}) != -1);',
    emitter: 'bS.mockGameElement--; return {};'
  },
  {
    id: 3,
    name: 'score_mock_game_element',
    title: 'Scored Mock Game Element',
    variables: {},
    watcher: 'return (btnS.findIndex((e) => {return e.name.includes(\'score_mock_game_element\')}) != -1);',
    emitter: 'bS.mockGameElement--; return {};'
  }
];

export default eventDefinitions;
