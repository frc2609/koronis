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
  var currScopeCount = 0;
  for(var i = 0;i < arr.length;i++) {
    if(arr[i].trim().length !== 0 && !arr[i].includes('#')) {
      var nestedCount = arr[i].indexOf('*') < 0 ? 0 : Math.floor(arr[i].indexOf('*') / 2);
      var parsed = parseLine(arr[i]);
      if(nestedCount === currScopeCount) {
        currScope = currScope.substring(0,currScope.lastIndexOf('/')) + '/' + parsed[0];
      }
      else if(nestedCount > currScopeCount) {
        currScope = currScope + '/' + parsed[0];
        currScopeCount++;
      }
      else {
        for(var j = 0;j <= currScopeCount - nestedCount;j++) {
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
  for(var i = 0;i < res.length;i++) {
    res[i].md = (await axios(Config.wikiUrl + res[i].url)).data;
  }
  console.log(res);
}
