import eruda from 'eruda';
import copy from 'copy-to-clipboard';
import 'clientjs';

export const init = () => {
  const store = require('store');
  if(store.get('settings/eruda/enable') === 'true') {eruda.init();}

  let client = new ClientJS(); // eslint-disable-line no-undef
  window.d = () => {
    let debugData = client.getBrowserData();
    console.log('=======DEBUG DATA=======');
    console.log(JSON.stringify(debugData));
    console.log('=======DEBUG DATA=======');
    copy(JSON.stringify(debugData));
    return null;
  }
}
