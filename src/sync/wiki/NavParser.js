import Config from 'config/Config';

const store = require('store');
const axios = require('axios');
const deepCompare = require('deep-compare');

const parseLine = (line) => {
  let res = ['', ''];
  res[0] = line.substring(line.indexOf('[')+1,line.indexOf(']'));
  res[1] = line.substring(line.indexOf('(')+1,line.indexOf(')'));
  return res;
};

export const parseNav = async () => {
  let nav = null;
  try {
    nav = (await axios(Config.wikiUrl + 'navigation.md')).data;
  }
  catch(err) {
    console.info('[Wiki] Could not connect to wiki');
    return null;
  }
  let arr = [];
  let res = [];
  nav = nav.substring(nav.indexOf('# KSS Wiki\n')+12,nav.indexOf('\n[Edit]'));
  arr = nav.split('\n');
  let currScope = '';
  let currScopeCount = 0;
  for(let i = 0;i < arr.length;i++) {
    if(arr[i].trim().length !== 0 && !arr[i].includes('#')) {
      let nestedCount = arr[i].indexOf('*') < 0 ? 0 : Math.floor(arr[i].indexOf('*') / 2);
      let parsed = parseLine(arr[i]);
      if(nestedCount === currScopeCount) {
        currScope = currScope.substring(0,currScope.lastIndexOf('/')) + '/' + parsed[0];
      }
      else if(nestedCount > currScopeCount) {
        currScope = currScope + '/' + parsed[0];
        currScopeCount++;
      }
      else {
        for(let j = 0;j <= currScopeCount - nestedCount;j++) {
          currScope = currScope.substring(0,currScope.lastIndexOf('/'));
        }
        currScope = currScope + '/' + parsed[0];
        currScopeCount = nestedCount;
      }
      res.push({
        path: currScope.substring(1),
        url: parsed[1]
      });
    }
  }
  for(let i = 0;i < res.length;i++) { // eslint-disable-line no-redeclare
    if(res[i].url.length > 0) {
      res[i].md = (await axios(Config.wikiUrl + res[i].url)).data;
    }
    else {
      res[i].md = '';
    }
  }
  if(!deepCompare(res, store.get('wiki/data'))) {
    store.set('wiki/data', res);
  }
  store.set('wiki/lastUpdate', Date.now());
  console.info('[Wiki] Updated with latest wiki');
}
