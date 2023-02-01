let botStateDefinition = {
  botState: {
    position: {
        x: 1,
        y: 13.5,
        t: 0
    },
    currentZones: [],
    previousZones: [],
    cargo: false,
    hatch: false,
    habline: false,
    contact: false,
    lastContact: 0
  },
  drawnElements: [],
  init: '',
  update: ''
};

export default botStateDefinition;
