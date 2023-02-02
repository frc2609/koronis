let botStateDefinition = {
  botState: {
    position: {
      x: 1,
      y: 13.5,
      t: 0
    },
    currentZones: [],
    previousZones: [],
    cube: 0,
    cone: 0,
    taxi: false,
    engaging: false,
    balanced: false,
    contact: false,
    lastContact: 0,
    scoringCube: false,
    scoringCone: false,
    gridSelected: false,
  },
  drawnElements: [],
  init: '',
  update: ''
};

export default botStateDefinition;
