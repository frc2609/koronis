let fieldStateDefinition = {
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
        name: 'hab_zone',
        isAllied: true,
        size: {x: 8, y: 27},
        position: {x: 0, y: 0}
      },
      {
        id: 2,
        name: 'mid_zone',
        isAllied: true,
        size: {x: 18, y: 27},
        position: {x: 8, y: 0}
      },
      {
        id: 3,
        name: 'hab_level_1',
        isAllied: true,
        size: {x: 4, y: 13},
        position: {x: 4, y: 7}
      },
      {
        id: 4,
        name: 'hab_level_2',
        isAllied: true,
        size: {x: 4, y: 11},
        position: {x: 0, y: 8}
      },
      {
        id: 5,
        name: 'hab_level_3',
        isAllied: true,
        size: {x: 4, y: 5},
        position: {x: 0, y: 11}
      },
      {
        id: 6,
        name: 'rocket_top_zone',
        isAllied: true,
        size: {x: 9, y: 5},
        position: {x: 15, y: 0}
      },
      {
        id: 7,
        name: 'rocket_bottom_zone',
        isAllied: true,
        size: {x: 9, y: 5},
        position: {x: 15, y: 22}
      },
      {
        id: 8,
        name: 'cargo_front_zone',
        isAllied: true,
        size: {x: 5, y: 11},
        position: {x: 17, y: 8}
      },
      {
        id: 9,
        name: 'cargo_top_zone',
        isAllied: true,
        size: {x: 5, y: 5.5},
        position: {x: 22, y: 8}
      },
      {
        id: 10,
        name: 'cargo_bottom_zone',
        isAllied: true,
        size: {x: 5, y: 5.5},
        position: {x: 22, y: 13.5}
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
      text: '',
      size: {x: 27, y: 27},
      position: {x: 0, y: 0},
      style: {
        palette: 'field',
        fill: 'Light Grey',
        outline: 'Dark Grey',
        text: 'Black'
      }
    },
    {
      id: 1,
      name: 'hab_zone',
      isAllied: true,
      text: '',
      size: {x: 8, y: 27},
      position: {x: 0, y: 0},
      style: {
        palette: 'field',
        fill: 'Light Grey',
        outline: 'Dark Grey',
        text: 'Black'
      }
    },
    {
      id: 2,
      name: 'mid_zone',
      isAllied: true,
      text: '',
      size: {x: 18, y: 27},
      position: {x: 8, y: 0},
      style: {
        palette: 'field',
        fill: 'Light Grey',
        outline: 'Dark Grey',
        text: 'Black'
      }
    },
    {
      id: 3,
      name: 'cargo_hold',
      isAllied: true,
      text: '',
      size: {x: 18, y: 27},
      position: {x: 8, y: 0},
      style: {
        palette: 'red',
        fill: 'Transparent',
        outline: 'Light Team Color',
        text: 'Black'
      }
    },
    {
      id: 4,
      name: 'hab_level_1',
      isAllied: true,
      text: '',
      size: {x: 4, y: 13},
      position: {x: 4, y: 7},
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 5,
      name: 'hab_level_2',
      isAllied: true,
      text: '',
      size: {x: 4, y: 11},
      position: {x: 0, y: 8},
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 6,
      name: 'hab_level_3',
      isAllied: true,
      text: '',
      size: {x: 4, y: 5},
      position: {x: 0, y: 11},
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 7,
      name: 'rocket_top',
      isAllied: true,
      text: '',
      size: {x: 3, y: 2},
      position: {x: 18, y: 0},
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 8,
      name: 'rocket_bottom',
      isAllied: true,
      text: '',
      size: {x: 3, y: 2},
      position: {x: 18, y: 25},
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 9,
      name: 'cargo_front',
      isAllied: true,
      text: '',
      size: {x: 2, y: 5},
      position: {x: 20, y: 11},
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 10,
      name: 'cargo_top',
      isAllied: true,
      text: '',
      size: {x: 5, y: 2.5},
      position: {x: 22, y: 11},
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 11,
      name: 'cargo_bottom',
      isAllied: true,
      text: '',
      size: {x: 5, y: 2.5},
      position: {x: 22, y: 13.5},
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    }
  ],
  init: ( //Mirror both zones and drawn elements across the y axis in the middle
    'var newZones = [];' +
    'var len = fS.zones.length;' +
    'for(var i = 0;i < len;i++) {' +
    '  var currZone = Object.assign({},fS.zones[i]);' +
    '  currZone.position = Object.assign({},fS.zones[i].position);' +
    '  currZone.size = Object.assign({},fS.zones[i].size);' +
    '  currZone.style = Object.assign({},fS.zones[i].style);' +
    '  currZone.position.x = fS.dimensions.x - (fS.zones[i].size.x + fS.zones[i].position.x);' +
    '  currZone.id = i + fS.zones.length;' +
    '  currZone.isAllied = !currZone.isAllied;' +
    '  newZones.push(currZone);' +
    '}' +
    'for(var i = 0;i < newZones.length;i++) { fS.zones.push(newZones[i]); }' +
    'var newDrawnElements = [];' +
    'len = dE.length;' +
    'for(var i = 0;i < len;i++) {' +
    '  var currDrawnElement = Object.assign({}, dE[i]);' +
    '  currDrawnElement.position = Object.assign({}, dE[i].position);' +
    '  currDrawnElement.size = Object.assign({}, dE[i].size);' +
    '  currDrawnElement.style = Object.assign({}, dE[i].style);' +
    '  currDrawnElement.position.x = fS.dimensions.x - (dE[i].size.x + dE[i].position.x);' +
    '  currDrawnElement.id = i + dE.length;' +
    '  currDrawnElement.isAllied = !currDrawnElement.isAllied;' +
    '  if(currDrawnElement.style.palette == \'red\') {currDrawnElement.style.palette = \'blue\';}' +
    '  newDrawnElements.push(currDrawnElement);' +
    '}' +
    'for(var i = 0;i < newDrawnElements.length;i++) { dE.push(newDrawnElements[i]) }'
  ),
  update: ''
};

export default fieldStateDefinition;
