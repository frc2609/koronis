let fieldStateDefinition = {
  init: function() {
    var results = [];
    for(var i = 0;i < this.zoneElements.length;i++) {
      var curr = Object.assign({}, this.zoneElements[i]);
      curr.name += "_a";
      results.push(curr);
    }
    for(var i = 0;i < this.zoneElements.length;i++) {
      var curr = Object.assign({}, this.zoneElements[i]);
      curr.name += "_o";
      curr.position.x = this.dimensions-this.zoneElements[i].position.x-this.zoneElements[i].size.x;
      curr.position.y = this.dimensions-this.zoneElements[i].position.y-this.zoneElements[i].size.y;
      results.push(curr);
    }
    return {
      invertedX: false,
      invertedY: false,
      isTeamRed: true,
      elements: results
    };
  },
  draw: function(fieldState, colorPalette) {
    ar results = [];
    for(var i = 0;i < this.drawnElements.length;i++) {
      var curr = Object.assign({}, this.zoneElements[i]);
      curr.name += "_a";
      results.push(curr);
    }
    for(var i = 0;i < this.drawnElements.length;i++) {
      var curr = Object.assign({}, this.zoneElements[i]);
      curr.name += "_o";
      curr.position.x = this.dimensions-this.zoneElements[i].position.x-this.zoneElements[i].size.x;
      curr.position.y = this.dimensions-this.zoneElements[i].position.y-this.zoneElements[i].size.y;
      results.push(curr);
    }
    return {
      invertedX: false,
      invertedY: false,
      isTeamRed: true,
      elements: results
    };
  }
  dimensions: {
    x: 54,
    y: 27
  },
  zoneElements: [
    {
      name: 'field',
      size: {x: 27,y: 27},
      position: {x: 0,y: 0}
    },
    {
      name: 'habzone',
      size: {x: 8,y: 27},
      position: {x: 0,y: 0}
    },
    {
      name: 'cargohold',
      size: {x: 4,y: 15},
      position: {x: 0,y: 6}
    },
    {
      name: 'hab1',
      size: {x: 4,y: 13},
      position: {x: 4,y: 7}
    },
    {
      name: 'hab2',
      size: {x: 4,y: 11},
      position: {x: 0,y: 8}
    },
    {
      name: 'hab3',
      size: {x: 4,y: 5},
      position: {x: 0,y: 11}
    },
    {
      name: 'rocketzone1',
      size: {x: 9,y: 5},
      position: {x: 15,y: 0}
    },
    {
      name: 'rocketzone2',
      size: {x: 9,y: 5},
      position: {x: 15,y: 22}
    },
    {
      name: 'cargozone',
      size: {x: 11,y: 11},
      position: {x: 17,y: 8}
    }
  ],
  drawnElements: [
    {
      name: 'field',
      size: {x: 27,y: 27},
      position: {x: 0,y: 0},
      color: {fill: Light Grey,outline: Light Grey}
    },
    {
      name: 'habzone',
      size: {x: 8,y: 27},
      position: {x: 0,y: 0},
      color: {fill: Light Grey,outline: Dark Team Color}
    },
    {
      name: 'midzone',
      size: {x: 18,y: 27},
      position: {x: 8,y: 0},
      color: {fill: Light Grey,outline: Dark Team Color}
    },
    {
      name: 'cargohold',
      size: {x: 4,y: 15},
      position: {x: 0,y: 6},
      color: {fill: Transparent,outline: Dark Team Color}
    },
    {
      name: 'hab1',
      size: {x: 4,y: 13},
      position: {x: 4,y: 7},
      color: {fill: Dark Team Color,outline: Dark Grey}
    },
    {
      name: 'hab2',
      size: {x: 4,y: 11},
      position: {x: 0,y: 8},
      color: {fill: Dark Team Color,outline: Dark Grey}
    },
    {
      name: 'hab3',
      size: {x: 4,y: 5},
      position: {x: 0,y: 11},
      color: {fill: Dark Team Color,outline: Dark Grey}
    },
    {
      name: 'rocket1',
      size: {x: 3,y: 2},
      position: {x: 18,y: 0},
      color: {fill: Dark Team Color,outline: Dark Grey}
    },
    {
      name: 'rocket2',
      size: {x: 3,y: 2},
      position: {x: 18,y: 25},
      color: {fill: Dark Team Color,outline: Dark Grey}
    },
    {
      name: 'cargoship1',
      size: {x: 5,y: 2},
      position: {x: 22,y: 11},
      color: {fill: Dark Team Color,outline: Dark Grey}
    },
    {
      name: 'cargoship2',
      size: {x: 2,y: 5},
      position: {x: 20,y: 11},
      color: {fill: Dark Team Color,outline: Dark Grey}
    },
    {
      name: 'cargoship3',
      size: {x: 5,y: 2},
      position: {x: 22,y: 14},
      color: {fill: Dark Team Color,outline: Dark Grey}
    }
  ]
};

export default fieldStateDefinition;
