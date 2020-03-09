var store = require('store');

//Currently not being used
export const inject = (inYear) => {
  if(process.env.REACT_APP_ENV === 'development') {
    var botStateDefinition = {
      botState: {
        pos: {
          x: 0,
          y: 13.5,
          t: 0
        },
        currentZones: [],
        previousZones: [],
        mockGameElement: 0
      },
      drawnElements: [],
      init: '',
      update: ''
    };
    var buttonDefinitions = [
      {
        id: 0,
        name: 'trigger_mock_event_0',
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
        name: 'trigger_mock_event_1',
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
        name: 'trigger_mock_event_2',
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
        watcher: 'return bS.mockGameElement < 3;',
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
        watcher: 'return bS.mockGameElement > 0;',
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
        watcher: 'return (bS.mockGameElement > 0 && bS.currentZones.findIndex((e) => {return (e.name === \'mock_scoring_zone\' && e.isAllied);}) !== -1);',
        style: {
          released: {palette: 'button', fill: 'Light Blue', outline: 'Dark Blue', text: 'Dark Blue'},
          depressed: {palette: 'button', fill: 'Blue', outline: 'Dark Blue', text: 'Dark Blue'}
        }
      }
    ];
    var colorPalette = {
      "field": [
        {"name":"Light Grey","hex":"#cdcdcd"},
        {"name":"Dark Grey","hex":"#363636"},
        {"name":"Transparent","hex":"rgba(0,0,0,0)"}
      ],
      "button": [
        {"name":"Very Light Blue","hex":"#b3e0ff"},
        {"name":"Light Blue","hex":"#4db8ff"},
        {"name":"Blue","hex":"#008ae6"},
        {"name":"Dark Blue","hex":"#004d80"},
        {"name":"Very Light Red","hex":"#f4bec3"},
        {"name":"Light Red","hex":"#e46774"},
        {"name":"Red","hex":"#dc3545"},
        {"name":"Dark Red","hex":"#981b27"},
        {"name":"Very Light Green","hex":"#9fdf9f"},
        {"name":"Light Green","hex":"#53c653"},
        {"name":"Green","hex":"#339933"},
        {"name":"Dark Green","hex":"#194d19"},
        {"name":"White","hex":"#ffffff"},
        {"name":"Black","hex":"#000000"}
      ],
      "red": [
        {"name":"Light Team Color","hex":"#f6acac"},
        {"name":"Dark Team Color","hex":"#d63333"}
      ],
      "blue": [
        {"name":"Light Team Color","hex":"#acacf6"},
        {"name":"Dark Team Color","hex":"#3333d6"}
      ]
    };
    var eventDefinitions = [
      {
        id: 0,
        name: 'mock_event',
        title: 'Mock Event',
        variables: {
          value: 0
        },
        watcher: 'return (btnS.includes(0) ||' +
        'btnS.includes(1) ||' +
        'btnS.includes(2) ||' +
        'btnS.includes(3) ||' +
        'btnS.includes(4) ||' +
        'btnS.includes(5));',
        emitter: 'if(btnS.includes(0)){return {number: 0};}' +
        'if(btnS.includes(1)){return {value: 1};}' +
        'if(btnS.includes(2)){return {value: 2};}' +
        'if(btnS.includes(3)){return {value: 3};}' +
        'if(btnS.includes(4)){return {value: 4};}' +
        'if(btnS.includes(5)){return {value: 5};}'
      },
      {
        id: 1,
        name: 'pickup_mock_game_element',
        title: 'Picked Up Mock Game Element',
        variables: {},
        watcher: 'return btnS.includes(6);',
        emitter: 'return {}'
      },
      {
        id: 2,
        name: 'drop_mock_game_element',
        title: 'Dropped Mock Game Element',
        variables: {},
        watcher: 'return btnS.includes(7);',
        emitter: 'return {}'
      },
      {
        id: 3,
        name: 'score_mock_game_element',
        title: 'Scored Mock Game Element',
        variables: {},
        watcher: 'return btnS.includes(8);',
        emitter: 'return {}'
      }
    ];
    var fieldStateDefinition = {
      fieldState: {
        dimensions: {
          x: 54,
          y: 27
        },
        zones: [
          {
            id: 0,
            name: 'field',
            isAllied: true,
            size: {x: 27, y: 27},
            position: {x: 0,y: 0}
          },
          {
            id: 1,
            name: 'mock_scoring_zone',
            isAllied: true,
            size: {x: 7, y: 7},
            position: {x: 20, y: 10}
          }
        ],
        inverted: {
          x: false,
          y: false
        }
      },
      drawnElements: [
        {
          id: 0,
          name: 'field',
          isAllied: true,
          size: {x: 27, y: 27},
          position: {x: 0, y: 0},
          style: {
            palette: 'field',
            fill: 'Light Grey',
            outline: 'Dark Grey'
          }
        },
        {
          id: 1,
          name: 'mock_scoring_zone',
          isAllied: true,
          size: {x: 5, y: 5},
          position: {x: 22, y: 11},
          style: {
            palette: 'red',
            fill: 'Light Team Color',
            outline: 'Dark Team Color'
          }
        }
      ],
      init: ( //Mirror both zones and drawn elements across the y axis in the middle
        'var newZones = [];' +
        'var len = fS.zones.length;' +
        'for(var i = 0;i < len;i++) {' +
        '  var currZone = Object.assign({},fS.zones[i]);' +
        '  currZone.position.x = fS.dimensions.x - (fS.zones[i].size.x + fS.zones[i].position.x);' +
        '  currZone.id = i + fS.zones.length;' +
        '  currZone.isAllied = !currZone.isAllied;' +
        '  newZones.push(currZone);' +
        '}' +
        'for(var i = 0;i < newZones.length;i++) { fs.zones.push(newZones[i]) }' +
        'var newDrawnElements = [];' +
        'len = dE.length;' +
        'for(var i = 0;i < len;i++) {' +
        '  var currDrawnElement = Object.assign({}, dE[i]);' +
        '  currDrawnElement.position.x = dE.x - (dE[i].size.x + dE[i].position.x);' +
        '  currDrawnElement.id = i + dE.length;' +
        '  currDrawnElement.isAllied = !currDrawnElement.isAllied;' +
        '  if(currDrawnElement.style.palette === \'red\') {currDrawn.style.palette = \'blue\';}' +
        '  newDrawnElements.push(currDrawnElement);' +
        '}' +
        'for(var i = 0;i < newDrawnElements.length;i++) { dE.push(newDrawnElements[i]) }'
      ),
      update: ''
    };
    var gameStateDefinition = {
      gameState: {
        year: 0,
        name: "Template Game",
        nickname: "Template",
        gameLength: 150,
        versionNumber: 0
      },
      drawnElements: [
        {
          id: 0,
          name: 'full_field',
          size: {x: 54, y: 27},
          position: {x: 0, y: 0},
          style: {
            palette: 'field',
            fill: 'Light Grey',
            outline: 'Dark Grey'
          }
        }
      ],
      init: '',
      update: ''
    };
    var statusUpdateDefinition = {
      update: 'return [' +
        '{title: (\'Game Elements: \' + bS.mockGameElement), style: {palette: \'button\', fill: \'White\', outline: \'Green\', text: \'Black\'}}' +
      '];'
    };
    var availableYears = store.get('package/availableYears');
    if(typeof availableYears !== 'null' || typeof availableYears !== 'undefined') {
      if(!availableYears.includes(inYear)) {
        availableYears.push(inYear);
        store.set('package/availableYears', availableYears);
      }
    }
    store.set('package/' + inYear + '/botStateDefinition', botStateDefinition);
    store.set('package/' + inYear + '/buttonDefinitions', buttonDefinitions);
    store.set('package/' + inYear + '/colorPalette', colorPalette);
    store.set('package/' + inYear + '/eventDefinitions', eventDefinitions);
    store.set('package/' + inYear + '/fieldStateDefinition', fieldStateDefinition);
    store.set('package/' + inYear + '/gameStateDefinition', gameStateDefinition);
    store.set('package/' + inYear + '/statusUpdateDefinition', statusUpdateDefinition);
  }
};
