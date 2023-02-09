let fieldStateDefinition = {
  fieldState: {
    dimensions: {
      x: 54,
      y: 26
    },
    zones: [
      {
        id: 0,
        name: 'half_field',
        isAllied: false,
        size: { x: 0, y: 0 },
        position: { x: 0, y: 0 },
        points: [
          { x: 0, y: 0 },
          { x: 0, y: 26 },
          { x: 27, y: 26 },
          { x: 27, y: 0 }
        ]
      },
      {
        id: 1,
        name: 'community_zone',
        isAllied: true,
        size: { x: 0, y: 0 },
        position: { x: 0, y: 0 },
        points: [
          { x: 54, y: 8 },
          { x: 54, y: 26 },
          { x: 38, y: 26 },
          { x: 38, y: 13 },
          { x: 43, y: 13 },
          { x: 43, y: 8 }
        ]
      },
      {
        id: 9,
        name: 'grid_1',
        isAllied: false,
        size: { x: 11, y: 5.75 },
        position: { x: 0, y: 8 }
      },
      {
        id: 10,
        name: 'grid_coop',
        isAllied: false,
        size: { x: 16, y: 5.75 },
        position: { x: 0, y: 13.8 }
      },
      {
        id: 11,
        name: 'grid_2',
        isAllied: false,
        size: { x: 16, y: 6.33 },
        position: { x: 0, y: 19.7 }
      },
      {
        id: 12,
        name: 'charge_station',
        isAllied: false,
        size: { x: 6.25, y: 8 },
        position: { x: 9.5, y: 13.25 }
      },
    ],
    inverted: {
      x: false,
      y: false
    }
  },
  drawnElements: [
    {
      id: 0,
      name: 'half_field',
      isAllied: true,
      size: { x: 27, y: 26 },
      position: { x: 0, y: 0 },
      style: {
        palette: 'field',
        fill: 'Light Grey',
        outline: 'Black'
      }
    },
    {
      id: 1,
      name: 'loading_zone',
      isAllied: true,
      size: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
      points: [
        { x: 0, y: 0 },
        { x: 0, y: 8 },
        { x: 11, y: 8 },
        { x: 11, y: 4 },
        { x: 22, y: 4 },
        { x: 22, y: 0 }
      ],
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 2,
      name: 'community_zone',
      size: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
      points: [
        { x: 0, y: 8 },
        { x: 0, y: 26 },
        { x: 16, y: 26 },
        { x: 16, y: 13 },
        { x: 11, y: 13 },
        { x: 11, y: 8 }
      ],
      style: {
        palette: 'blue',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 3,
      name: 'barrier',
      size: { x: 11, y: .5 },
      position: { x: 0, y: 7.5 },
      style: {
        palette: 'field',
        fill: 'White',
        outline: 'Dark Grey'
      }
    },
    {
      id: 4,
      name: 'charge_station',
      size: { x: 6.25, y: 8 },
      position: { x: 9.5, y: 13.25 },
      style: {
        palette: 'field',
        fill: 'White',
        outline: 'Dark Grey'
      }
    },
    {
      id: 5,
      name: 'staging_mark_1',
      size: { x: 0.33, y: 0.33 },
      position: { x: 23, y: 11 },
      style: {
        palette: 'field',
        fill: 'White',
        outline: 'Black'
      }
    },
    {
      id: 6,
      name: 'staging_mark_2',
      size: { x: 0.33, y: 0.33 },
      position: { x: 23, y: 15 },
      style: {
        palette: 'field',
        fill: 'White',
        outline: 'Black'
      }
    },
    {
      id: 7,
      name: 'staging_mark_3',
      size: { x: 0.33, y: 0.33 },
      position: { x: 23, y: 19 },
      style: {
        palette: 'field',
        fill: 'White',
        outline: 'Black'
      }
    },
    {
      id: 8,
      name: 'staging_mark_4',
      size: { x: 0.33, y: 0.33 },
      position: { x: 23, y: 23 },
      style: {
        palette: 'field',
        fill: 'White',
        outline: 'Black'
      }
    },
    {
      id: 9,
      name: 'grid_1',
      size: { x: 4.5, y: 5.75 },
      position: { x: 0, y: 8 },
      style: {
        palette: 'blue',
        fill: 'Dark Team Color',
        outline: 'Dark Grey',
        text: 'Black'
      }
    },
    {
      id: 10,
      name: 'grid_coop',
      size: { x: 4.5, y: 5.75 },
      position: { x: 0, y: 13.8 },
      style: {
        palette: 'field',
        fill: 'White',
        outline: 'Dark Grey',
        text: 'Black'
      }
    },
    {
      id: 11,
      name: 'grid_2',
      size: { x: 4.5, y: 6.33 },
      position: { x: 0, y: 19.7 },
      style: {
        palette: 'blue',
        fill: 'Dark Team Color',
        outline: 'Dark Grey',
        text: 'Black'
      }
    }
  ],
  init: ( //Mirror both zones and drawn elements across the y and x axis in the middle
    'var newZones = [];' +
    'var len = fS.zones.length;' +
    'for(var i = 0;i < len;i++) {' +
    '  var currZone = Object.assign({},fS.zones[i]);' +
    '  currZone.position = Object.assign({},fS.zones[i].position);' +
    '  currZone.size = Object.assign({},fS.zones[i].size);' +
    '  currZone.style = Object.assign({},fS.zones[i].style);' +
    '  currZone.position.y = fS.zones[i].position.y;' +
    '  currZone.position.x = fS.dimensions.x - (fS.zones[i].size.x + fS.zones[i].position.x);' +
    '  currZone.id = i + fS.zones.length;' +
    '  currZone.isAllied = !fS.zones[i].isAllied;' +
    '  if(typeof currZone.points != \'undefined\') {' +
    '    currZone.points = fS.zones[i].points.slice();' +
    '    for(var j = 0;j < currZone.points.length;j++) {' +
    '      currZone.points[j] = Object.assign({}, fS.zones[i].points[j]);' +
    '      currZone.points[j].y = fS.dimensions.y;' +
    '      currZone.points[j].x = fS.dimensions.x - fS.zones[i].points[j].x;' +
    '    }' +
    '  }' +
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
    '  currDrawnElement.position.y = dE[i].position.y;' +
    '  currDrawnElement.position.x = fS.dimensions.x - (dE[i].size.x + dE[i].position.x);' +
    '  currDrawnElement.id = i + dE.length;' +
    '  currDrawnElement.isAllied = !dE[i].isAllied;' +
    '  if(typeof currDrawnElement.points != \'undefined\') {' +
    '    currDrawnElement.points = dE[i].points.slice();' +
    '    for(var j = 0;j < currDrawnElement.points.length;j++) {' +
    '      currDrawnElement.points[j] = Object.assign({}, dE[i].points[j]);' +
    '      currDrawnElement.points[j].y = dE[i].points[j].y;' +
    '      currDrawnElement.points[j].x = fS.dimensions.x - dE[i].points[j].x;' +
    '    }' +
    '  }' +
    '  if(currDrawnElement.style.palette == \'red\') {currDrawnElement.style.palette = \'blue\';}' +
    '  else if(currDrawnElement.style.palette == \'blue\') {currDrawnElement.style.palette = \'red\';}' +
    '  newDrawnElements.push(currDrawnElement);' +
    '}' +
    'for(var i = 0;i < newDrawnElements.length;i++) { dE.push(newDrawnElements[i]); }'
  ),
  update: ''
};

export default fieldStateDefinition;
