let fieldStateDefinition = {
  fieldState: {
    dimensions: {
      x: 52,
      y: 26
    },
    zones: [
      {
        id: 0,
        name: 'half_field',
        isAllied: true,
        size: {x: 26, y: 26},
        position: {x: 0,y: 0}
      },
      {
        id: 1,
        name: 'initiation_line',
        isAllied: false,
        size: {x: 2, y: 26},
        position: {x: 41, y: 0}
      },
      {
        id: 2,
        name: 'sector',
        isAllied: true,
        size: {x: 10, y: 26},
        position: {x: 42, y: 0}
      },
      {
        id: 3,
        name: 'loading_zone',
        isAllied: true,
        size: {x: 0, y: 0},
        position: {x: 0, y: 0},
        points: [
          {x: 49, y: 10},
          {x: 52, y: 7.5},
          {x: 52, y: 12.5}
        ]
      },
      {
        id: 4,
        name: 'scoring_zone',
        isAllied: true,
        size: {x: 0, y: 0},
        position: {x: 0, y: 0},
        points: [
          {x: 3, y: 8},
          {x: 0, y: 10},
          {x: 0, y: 6}
        ]
      },
      {
        id: 5,
        name: 'trench',
        isAllied: true,
        size: {x: 8, y: 7},
        position: {x: 26, y: 0}
      },
      {
        id: 6,
        name: 'ren_zone',
        isAllied: true,
        size: {x: 0, y: 0},
        position: {x: 0, y: 0},
        points: [
          {x: 29, y: 5},
          {x: 18, y: 9},
          {x: 20, y: 15},
          {x: 31, y: 11}
        ]
      }
    ]
  },
  drawnElements: [
    {
      id: 0,
      name: 'half_field',
      isAllied: true,
      size: {x: 26, y: 26},
      position: {x: 0,y: 0},
      text: '',
      style: {
        palette: 'field',
        fill: 'Transparent',
        outline: 'Transparent',
        text: 'Black'
      }
    },
    {
      id: 1,
      name: 'initiation_line',
      isAllied: true,
      size: {x: 0, y: 26},
      position: {x: 42, y: 0},
      text: '',
      style: {
        palette: 'red',
        fill: 'Transparent',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 2,
      name: 'loading_zone',
      isAllied: true,
      size: {x: 0, y: 0},
      position: {x: 0, y: 0},
      points: [
        {x: 49, y: 10},
        {x: 52, y: 7.5},
        {x: 52, y: 12.5}
      ],
      text: '',
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 3,
      name: 'scoring_zone',
      isAllied: true,
      size: {x: 0, y: 0},
      position: {x: 0, y: 0},
      points: [
        {x: 3, y: 8},
        {x: 0, y: 10},
        {x: 0, y: 6}
      ],
      text: '',
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 4,
      name: 'trench',
      isAllied: true,
      size: {x: 18, y: 5},
      position: {x: 17, y: 0},
      text: '',
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 5,
      name: 'ren_zone',
      isAllied: true,
      size: {x: 0, y: 0},
      position: {x: 0, y: 0},
      points: [
        {x: 29.5, y: 5},
        {x: 18.5, y: 9},
        {x: 20.5, y: 15},
        {x: 31.5, y: 11}
      ],
      text: '',
      style: {
        palette: 'red',
        fill: 'Light Team Color',
        outline: 'Dark Team Color',
        text: 'Black'
      }
    },
    {
      id: 6,
      name: 'control_panel',
      isAllied: true,
      size: {x: 4, y: 5},
      position: {x: 28, y: 0},
      text: '',
      style: {
        palette: 'field',
        fill: 'Dark Grey',
        outline: 'Black',
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
    '  currZone.position.y = fS.dimensions.y - (fS.zones[i].size.y + fS.zones[i].position.y);' +
    '  currZone.position.x = fS.dimensions.x - (fS.zones[i].size.x + fS.zones[i].position.x);' +
    '  currZone.id = i + fS.zones.length;' +
    '  currZone.isAllied = !fS.zones[i].isAllied;' +
    '  if(typeof currZone.points != \'undefined\') {' +
    '    currZone.points = fS.zones[i].points.slice();' +
    '    for(var j = 0;j < currZone.points.length;j++) {' +
    '      currZone.points[j] = Object.assign({}, fS.zones[i].points[j]);' +
    '      currZone.points[j].y = fS.dimensions.y - fS.zones[i].points[j].y;' +
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
    '  currDrawnElement.position.y = fS.dimensions.y - (dE[i].size.y + dE[i].position.y);' +
    '  currDrawnElement.position.x = fS.dimensions.x - (dE[i].size.x + dE[i].position.x);' +
    '  currDrawnElement.id = i + dE.length;' +
    '  currDrawnElement.isAllied = !dE[i].isAllied;' +
    '  if(typeof currDrawnElement.points != \'undefined\') {' +
    '    currDrawnElement.points = dE[i].points.slice();' +
    '    for(var j = 0;j < currDrawnElement.points.length;j++) {' +
    '      currDrawnElement.points[j] = Object.assign({}, dE[i].points[j]);' +
    '      currDrawnElement.points[j].y = fS.dimensions.y - dE[i].points[j].y;' +
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
