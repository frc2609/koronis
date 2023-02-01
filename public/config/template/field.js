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
      name: 'mock_scoring_zone',
      isAllied: true,
      text: 'M',
      size: {x: 5, y: 5},
      position: {x: 22, y: 11},
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
