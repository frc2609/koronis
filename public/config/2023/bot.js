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
    charging: false,
    contact: false,
    lastContact: 0
  },
  drawnElements: [],
  init: '',
  update: ''
};

export default botStateDefinition;
