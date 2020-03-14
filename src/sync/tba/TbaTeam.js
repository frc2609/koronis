import * as Interface from 'db/Interface';
import Config from 'config/Config';
import * as TbaKey from 'sync/tba/TbaKey';

var store = require('store');
var axios = require('axios');

export const update = async () => {
  try {
    var tbaKey = TbaKey.getKey();
    var validResponse = true;
    var index = 0;
    var validData = [];
    while(validResponse) {
      var lastModified = store.get('tba/team/' + store.get('settings/currentYear') + '/' + index + '/lastModified');
      var requestConfig = {
        url: '/teams/' + store.get('settings/currentYear') + '/' + index,
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
          store.set('tba/team/' + store.get('settings/currentYear') + '/' + index + '/lastModified', response.headers['last-modified']);
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
    for(var i = 0;i < validData.length;i++) {
      await Interface.insertTbaTeam(validData[i]);
    }
    console.info('[TBA] Finished updating teams');
  }
  catch(err) {
    console.info('[TBA] Cannot get latest teams');
    console.error(err);
  }
  return null;
}

export const getMedia = async (key) => {
  try {
    var tbaKey = TbaKey.getKey();
    var requestConfig = {
      url: '/team/' + key + '/media/' + store.get('settings/currentYear'),
      baseURL: Config.tbaUrl,
      headers: {
        'X-TBA-Auth-Key': tbaKey
      }
    };
    var response = (await axios.request(requestConfig));
    var data = response.data;
    var avatarBaseSrc = null;
    var mediaUrls = [];
    for(var i = 0;i < data.length;i++) {
      if(data[i].type === 'avatar') {
        avatarBaseSrc = ('data:image/png;base64,' + data[i].details.base64Image);
      }
      if(
        data[i].type === 'imgur' ||
        data[i].type === 'instagram-image'
      ) {
        mediaUrls.push(data[i].direct_url);
      }
    }
    console.info('[TBA] Returning media for team ' + key);
    return {
      avatarBaseSrc: avatarBaseSrc,
      mediaUrls: mediaUrls
    };
  }
  catch(err) {
    console.info('[TBA] Cannot get media for team ' + key);
    console.error(err);
    return {};
  }
}
