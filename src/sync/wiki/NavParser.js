import Config from 'config/Config';

var axios = require('axios');

const parseLine = (line) => {
  var res = ['', ''];
  res[0] = line.substring(line.indexOf('[')+1,line.indexOf(']'));
  res[1] = line.substring(line.indexOf('(')+1,line.indexOf(')'));
  return res;
};

export const parseNav = async () => {
  var nav = (await axios(Config.wikiUrl + 'navigation.md')).data;
  var arr = [];
  var res = [];
  nav = nav.substring(nav.indexOf('# KSS Wiki\n')+12,nav.indexOf('\n[Edit]'));
  arr = nav.split('\n');
  var currScope = '';
  for(var i = 0;i < arr.length;i++) {
    if(arr[i] !== '' && !arr[i].includes('#')) {
      var nestedCount = arr[i].indexOf('*') < 0 ? 0 : Math.floor(arr[i].indexOf('*') / 2);
      console.log(arr[i])
      console.log(parseLine(arr[i]));
      if(nestedCount === 0) {
        var parsed = parseLine(arr[i]);
        currScope = parsed[0]
        res.push({
          path: parsed[0],
          value: parsed[1]
        });
      }
      else {
        var currArr = arr[i].split('\');
      }
    }
  }
}
