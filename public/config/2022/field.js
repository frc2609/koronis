let fieldStateDefinition = {
  fieldState: {
    dimensions: {
      x: 54,
      y: 27
    },
    zones: [
      {
        id: 0,
        name: 'half_field',
        isAllied: true,
        size: {x: 0, y: 0},
        position: {x: 0, y: 0},
        points: [
          {x:0,y:0},
          {x:21,y:0},
          {x:33,y:27},
          {x:6,y:27},
          {x:0,y:21}
        ]
      },
      {
        id: 1,
        name: 'hangar_zone',
        isAllied: true,
        size: {x: 11, y: 10},
        position: {x: 0, y: 0}
      },
      {
        id: 2,
        name: 'climb_zone',
        isAllied: true,
        size: {x: 13, y: 12},
        position: {x: 0, y: 0}
      },
      {
        id: 3,
        name: 'tarmac',
        isAllied: true,
        size: {x: 0, y: 0},
        position: {x: 0, y: 0},
        points: [
          {x:22.5,y:5.5},
          {x:25,y:11},
          {x:23.5,y:14.5},
          {x:18,y:17},
          {x:18,y:10}
        ]
      },
      {
        id: 4,
        name: 'tarmac',
        isAllied: true,
        size: {x: 0, y: 0},
        position: {x: 0, y: 0},
        points: [
          {x:18.5,y:18},
          {x:24,y:15.5},
          {x:27.5,y:17},
          {x:30,y:22.5},
          {x:23.5,y:22.5}
        ]
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
      name: 'terminal',
      isAllied: true,
      size: {x: 0, y: 0},
      position: {x: 0, y: 0},
      points: [
        {x:6,y:27},
        {x:0,y:21},
        {x:0,y:27}
      ],
      style: {
        palette: 'red',
        fill: 'Dark Team Color',
        outline: 'Dark Grey'
      }
    },
    {
      id: 1,
      name: 'half_field',
      isAllied: true,
      size: {x: 0, y: 0},
      position: {x: 0, y: 0},
      points: [
        {x:0,y:0},
        {x:21,y:0},
        {x:33,y:27},
        {x:6,y:27},
        {x:0,y:21}
      ],
      style: {
        palette: 'field',
        fill: 'Light Grey',
        outline: 'Dark Grey'
      }
    },
    {
      id: 2,
      name: 'hangar_zone_shadow',
      isAllied: true,
      size: {x: 7.5, y: 10},
      position: {x: 0, y: 0},
      style: {
        palette: 'red',
        fill: 'Transparent',
        outline: 'Black'
      }
    },
    {
      id: 3,
      name: 'hangar_zone',
      isAllied: true,
      size: {x: 11, y: 10},
      position: {x: 0, y: 0},
      style: {
        palette: 'red',
        fill: 'Transparent',
        outline: 'Dark Team Color'
      }
    },
    {
      id: 4,
      name: 'tarmac',
      isAllied: true,
      size: {x: 0, y: 0},
      position: {x: 0, y: 0},
      points: [
        {x:22.5,y:5.5},
        {x:25,y:11},
        {x:23.5,y:14.5},
        {x:18,y:17},
        {x:18,y:10}
      ],
      style: {
        palette: 'red',
        fill: 'Light Grey',
        outline: 'Dark Team Color'
      }
    },
    {
      id: 5,
      name: 'tarmac',
      isAllied: true,
      size: {x: 0, y: 0},
      position: {x: 0, y: 0},
      points: [
        {x:18.5,y:18},
        {x:24,y:15.5},
        {x:27.5,y:17},
        {x:30,y:22.5},
        {x:23.5,y:22.5}
      ],
      style: {
        palette: 'red',
        fill: 'Light Grey',
        outline: 'Dark Team Color'
      }
    },
    {
      id: 6,
      name: 'hub',
      isAllied: true,
      size: {x: 0, y: 0},
      position: {x: 0, y: 0},
      points: [
        {x:25,y:11},
        {x:23.5,y:14.5},
        {x:24,y:15.5},
        {x:27.5,y:17},
        {x:54-25,y:27-11},
        {x:54-23.5,y:27-14.5},
        {x:54-24,y:27-15.5},
        {x:54-27.5,y:27-17},
      ],
      style: {
        palette: 'field',
        fill: 'White',
        outline: 'Dark Grey'
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
