let botStateDefinition = {
  botState: {
    position: {
      x: 10,
      y: 13,
      t: 0
    },
    currentZones: [],
    previousZones: [],
    powerCells: 0,
    autoLine: false,
    parked: false,
    rotation: false,
    positionControl: false,
    climbed: -1,
    balanced: -1,
    contact: false,
    lastContact: 0
  },
  drawnElements: [],
  init: '',
  update: ''
};

export default botStateDefinition;
