let gameStateDefinition = {
  gameState: {
    year: 2023,
    name: "FIRST Robotics Competition - Charged Up",
    nickname: "Charged Up",
    gameLength: 150,
    versionNumber: 0
  },
  drawnElements: [
    {
      id: 0,
      name: 'full_field',
      size: { x: 54, y: 26 },
      position: { x: 0, y: 0 },
      style: {
        palette: 'field',
        fill: 'Light Grey',
        outline: 'Dark Grey'
      }
    }
  ],
  init: '',
  update: ''
};

export default gameStateDefinition;
