import eruda from 'eruda';
import copy from 'copy-to-clipboard';
import 'clientjs';

export const init = () => {
  var store = require('store');
  if(store.get('settings/eruda/enable') === 'true') {eruda.init();}

  var client = new ClientJS(); // eslint-disable-line no-undef
  window.d = () => {
    var debugData = client.getBrowserData();
    console.log('=======DEBUG DATA=======');
    console.table(debugData);
    console.log(JSON.stringify(debugData));
    console.log('=======DEBUG DATA=======');
    copy(JSON.stringify(debugData));
    return null;
  }
}