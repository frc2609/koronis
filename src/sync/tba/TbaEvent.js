import * as Interface from 'db/Interface';
import Config from 'config/Config';
import * as TbaKey from 'sync/tba/TbaKey';

var store = require('store');
var axios = require('axios');

export const update = async () => {
  try {
    var tbaKey = TbaKey.getKey();
    var validData = [];
    var lastModified = store.get('tba/events/' + store.get('settings/currentYear') + '/lastModified');
    var requestConfig = {
      url: '/events/' + store.get('settings/currentYear'),
      baseURL: Config.tbaUrl,
      headers: {
        'X-TBA-Auth-Key': tbaKey
      }
    };
    if(typeof lastModified !== 'undefined') {
      requestConfig.headers['If-Modified-Since'] = lastModified;
    }
    var response = {
      status: 304
    };
    try {
      response = (await axios.request(requestConfig));
    }
    catch(err) {}
    if(response.status === 200) {
      if(response.data.length > 0) {
        for(var i = 0;i < response.data.length;i++) {
          validData.push(response.data[i]);
        }
        store.set('tba/events/' + store.get('settings/currentYear') + '/lastModified', response.headers['last-modified']);
      }
    }
    for(var i = 0;i < validData.length;i++) { // eslint-disable-line no-redeclare
      await Interface.insertTbaEvent(validData[i]);
    }
    console.info('[TBA] Finished updating events');
  }
  catch(err) {
    console.info('[TBA] Cannot get latest events');
    console.error(err);
  }
  return null;
}
