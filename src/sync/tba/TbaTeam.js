import * as Interface from 'db/Interface';
import Config from 'config/Config';
import * as TbaKey from 'sync/tba/TbaKey';

const store = require('store');
const axios = require('axios');

export const update = async () => {
  try {
    let tbaKey = TbaKey.getKey();
    let validResponse = true;
    let index = 0;
    let validData = [];
    while(validResponse) {
      let lastModified = store.get('tba/team/' + store.get('settings/currentYear') + '/' + index + '/lastModified');
      let requestConfig = {
        url: '/teams/' + store.get('settings/currentYear') + '/' + index,
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
    for(let i = 0;i < validData.length;i++) { // eslint-disable-line no-redeclare
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
    let tbaKey = TbaKey.getKey();
    let requestConfig = {
      url: '/team/' + key + '/media/' + store.get('settings/currentYear'),
      baseURL: Config.tbaUrl,
      headers: {
        'X-TBA-Auth-Key': tbaKey
      }
    };
    let response = (await axios.request(requestConfig));
    let data = response.data;
    let avatarBaseSrc = null;
    let mediaUrls = [];
    for(let i = 0;i < data.length;i++) {
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
    throw new Error('Unable to contact TBA, cannot get media');
  }
}
