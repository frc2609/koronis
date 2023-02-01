let gameStateDefinition = {
  gameState: {
    year: 0,
    name: "Template Game",
    nickname: "Template",
    gameLength: 150,
    versionNumber: 0
  },
  drawnElements: [
    {
      id: 0,
      name: 'full_field',
      text: '',
      size: {x: 54, y: 27},
      position: {x: 0, y: 0},
      style: {
        palette: 'field',
        fill: 'Light Grey',
        outline: 'Dark Grey',
        text: 'Black'
      }
    }
  ],
  init: '',
  update: ''
};

export default gameStateDefinition;
