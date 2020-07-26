import Config from 'config/Config';

var axios = require('axios');

export const parseNav = async () => {
  var nav = (await axios(Config.wikiUrl + 'navigation.md')).data;
  var arr = [];
  var res = {};
  nav = nav.substring(nav.indexOf('# KSS Wiki\n')+12,nav.indexOf('\n[Edit]'));
  arr = nav.split('\n');
  var currScope = '';
  for(var i = 0;i < arr.length;i++) {
    if(arr[i] !== '') {
      var nestedCount = arr[i].indexOf('*') < 0 ? 0 : Math.floor(arr[i].indexOf('*') / 2);
      if(nestedCount === 0) {
        currScope = arr[i];
      }
    }
  }
}
