import * as Interface from 'db/Interface';
import * as TbaKey from 'sync/tba/TbaKey';

var store = require('store');
var axios = require('axios');

export const update = async () => {
  try {
    var tbaKey = TbaKey.getKey();
    var validResponse = true;
    var index = 0;
    while(validResponse) {
      var lastModified = store.get('tba/team/' + index + '/lastModified');
      var requestConfig = {
        url: '/teams/' + index,
        baseURL: 'https://www.thebluealliance.com/api/v3/',
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
            await Interface.insertTbaTeam(response.data[i]);
          }
          store.set('tba/team/' + index + '/lastModified', response.headers['last-modified']);
          index++;
        }
        else {
          validResponse = false;
        }
      }
      else if(response.status === 304) {
        //Check if actually online
        validResponse = window.navigator.onLine;
        index++;
      }
      else {
        validResponse = false;
      }
    }
    console.info('[TBA] Finished updating teams');
  }
  catch(err) {
    console.info('[TBA] Cannot get latest teams');
    console.error(err);
  }
}
