import * as TbaKey from 'sync/tba/TbaKey';

export const setDefaults = () => {
  //Set defaults if they don't exist already
  var store = require('store');
  var data = [
    {path: 'settings/currentYear', value: 0},
    {path: 'settins/tba/key', value: TbaKey.getKey()},
    {path: 'settings/eruda/enable', value: 'false'}
  ];
  for(var i = 0;i < data.length;i++) {
    var val = store.get(data[i].path);
    if(typeof val === 'undefined') {
      store.set(data[i].path, data[i].value);
    }
  }
}
