import * as Interface from 'db/Interface';
import Config from 'config/Config';
import * as TbaKey from 'sync/tba/TbaKey';

const axios = require('axios').default;
const store = require('store');

export const update = async () => {
  try {
    let tbaKey = TbaKey.getKey();
    let validData = [];
    let lastModified = store.get('tba/events/' + store.get('settings/currentYear') + '/lastModified');
    let requestConfig = {
      url: '/events/' + store.get('settings/currentYear'),
      baseURL: Config.tbaUrl,
      headers: {
        'X-TBA-Auth-Key': tbaKey
      }
    };
    if(typeof lastModified !== 'undefined') {
      requestConfig.headers['If-Modified-Since'] = lastModified;
    }
    let response = {
      status: 304
    };
    try {
      response = (await axios.request(requestConfig));
    }
    catch(err) {
      response.status = 500;
    }
    if(response.status === 200) {
      if(response.data.length > 0) {
        for(let i = 0;i < response.data.length;i++) {
          validData.push(response.data[i]);
        }
        store.set('tba/events/' + store.get('settings/currentYear') + '/lastModified', response.headers['last-modified']);
      }
    }
    for(let i = 0;i < validData.length;i++) { // eslint-disable-line no-redeclare
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
