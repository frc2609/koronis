let botStateDefinition = {
  botState: {
    position: {
      x: 1,
      y: 13.5,
      t: 0
    },
    currentZones: [],
    previousZones: [],
    cargo: 0,
    taxi: false,
    climbed: -1,
    contact: false,
    lastContact: 0  
  },
  drawnElements: [],
  init: '',
  update: ''
};

export default botStateDefinition;
