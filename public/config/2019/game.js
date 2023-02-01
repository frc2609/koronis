let gameStateDefinition = {
  gameState: {
    year: 2019,
    name: "FIRST Robotics Competition - Destination: Deep Space",
    nickname: "Deep Space",
    isRed: true,
    versionNumber: 0
  },
  drawnElements: [
    {
      id: 0,
      name: 'full_field',
      size: {x: 54, y: 27},
      position: {x: 0,y: 0},
      style: {
        palette: 'field',
        fill: 'Light Grey',
        outline: 'Dark Grey'
      }
    }
  ],
  init: (gS, dE) => {return [gS, dE];},
  draw: (gS, dE) => {return [gS, dE];}
};

export default gameStateDefinition;
