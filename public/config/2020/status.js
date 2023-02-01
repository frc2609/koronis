let statusUpdateDefinition = {
  statusState: [
    {
      title: 'Line',
      style: {
        palette: 'button',
        fill: 'White',
        outline: 'Black',
        text: 'Black'
      }
    },
    {
      title: 'Climbed',
      style: {
        palette: 'button',
        fill: 'White',
        outline: 'Green',
        text: 'Dark Green'
      }
    },
    {
      title: 'Balanced',
      style: {
        palette: 'button',
        fill: 'White',
        outline: 'Blue',
        text: 'Dark Blue'
      }
    },
    {
      title: 'Power Cells: 0',
      style: {
        palette: 'button',
        fill: 'White',
        outline: 'Yellow',
        text: 'Dark Yellow'
      }
    }
  ],
  update: 'var tmp = []; ' + 
  'if(!bS.autoLine && bS.currentZones.findIndex((e) => {return (e.name == \'initiation_line\' && e.isAllied);}) != -1) {' +
  '  tmp.push({title: (\'Line\'), style: {palette: \'button\', fill: \'White\', outline: \'Black\', text: \'Black\'}});' +
  '}' + 
  'if(bS.climbed == 1) {' +
  '  tmp.push({title: (\'Climbed\'), style: {palette: \'button\', fill: \'White\', outline: \'Green\', text: \'Dark Green\'}});' +
  '}' + 
  'if(bS.balanced == 1) {' +
  '  tmp.push({title: (\'Balanced\'), style: {palette: \'button\', fill: \'White\', outline: \'Blue\', text: \'Dark Blue\'}});' +
  '}' +
  'tmp.push({title: (\'Cells: \' + bS.powerCells), style: {palette: \'button\', fill: \'White\', outline: \'Dark Green\', text: \'Dark Green\'}});' +
  'return tmp;'
};

export default statusUpdateDefinition;
