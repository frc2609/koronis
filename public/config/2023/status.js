let statusUpdateDefinition = {
  update:
    'return [' +
    '{title: (\'Cube: \' + bS.cube), style: {palette: \'button\', fill: \'White\', outline: \'Purple\', text: \'Black\'}},' +
    '{title: (\'Cone: \' + bS.cone), style: {palette: \'button\', fill: \'White\', outline: \'Dark Yellow\', text: \'Black\'}},' +
    '{title: (\'(\' + bS.position.x + \',\' + bS.position.y + \')\'), style: {palette: \'button\', fill: \'White\', outline: \'Dark Yellow\', text: \'Black\'}}' +
    '];'
};

export default statusUpdateDefinition;
