import * as TbaKey from 'sync/tba/TbaKey';

export const setDefaults = () => {
  //Set defaults if they don't exist already
  const store = require('store');
  let data = [
    {path: 'settings/currentYear', value: 0},
    {path: 'settings/tba/key', value: TbaKey.getKey()},
    {path: 'settings/eruda/enable', value: 'false'},
    {path: 'settings/theme/darkMode', value: 'false'}
  ];
  for(let i = 0;i < data.length;i++) {
    let val = store.get(data[i].path);
    if(typeof val === 'undefined') {
      store.set(data[i].path, data[i].value);
    }
  }
}
