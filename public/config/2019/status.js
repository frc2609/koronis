let statusUpdateDefinition = {
  statusState: [
    {
      title: 'Game Elements: 0',
      style: {
        palette: 'button',
        fill: 'White',
        outline: 'Green',
        text: 'Black'
      }
    }
  ],
  update: 'return [' +
    '{title: (\'Game Elements: \' + bS.mockGameElement), style: {palette: \'button\', fill: \'White\', outline: \'Green\', text: \'Black\'}}' +
  '];'
};

export default statusUpdateDefinition;
