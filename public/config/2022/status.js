let statusUpdateDefinition = {
  update: 'let climbLevel = bS.climbed === 0 ? \'Started\' : bS.climbed === 1 ? \'Low\' : bS.climbed === 2 ? \'Mid\' : bS.climbed === 3 ? \'High\' : bS.climbed === 4 ? \'Traversal\' : \'None\';' +
  'return [' +
    '{title: (\'Cargo: \' + bS.cargo), style: {palette: \'button\', fill: \'White\', outline: \'Green\', text: \'Black\'}},' +
    '{title: (\'Climb Level: \' + climbLevel), style: {palette: \'button\', fill: \'White\', outline: \'Green\', text: \'Black\'}}' +
  '];'
};

export default statusUpdateDefinition;
