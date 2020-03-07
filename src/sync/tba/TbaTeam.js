import * as Interface from 'db/Interface';

var store = require('store');
var axios = require('axios');

export const update = async () => {
  try {
    var tbaKey = store.get('tba/key');
    if(typeof tbaKey === 'undefined') {
      tbaKey = 'slb3DLgvOJNW9PuRUpFYlX5kKmfIxxVhOLJd6Lb2cyl6lTaiDZwB8uiPodSlXzw2';
      store.set('tba/key', tbaKey);
    }
    var validResponse = true;
    var index = 0;
    while(validResponse) {
      var lastModified = store.get('tba/team/' + index + '/lastModified');
      var requestConfig = {
        url: '/' + index,
        baseURL: 'https://www.thebluealliance.com/api/v3/teams/',
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
      console.debug(response);
      if(response.status === 200) {
        if(response.data.length > 0) {
          store.set('tba/team/' + index + '/lastModified', response.headers['last-modified']);
          for(var i = 0;i < response.data.length;i++) {
            await Interface.insertTbaTeam(response.data[i]);
          }
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
