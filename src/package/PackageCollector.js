import axios from 'axios';
import { packageUrl } from 'Config';
var store = require('store');
var initialized = false;

var geval = eval;
var botStateDefinition = {};

export const init = async () => {
  try {
    var aY = (await axios.get(packageUrl + 'index.json')).data.replace(/'/g,'\"');
    var availableYears = JSON.parse(aY).availableYears;
    store.set('package/availableYears', availableYears);
    for(var i = 0;i < availableYears.length;i++) {
      var bSD = (await axios.get(packageUrl + availableYears[i] + '/bot.js')).data.replace(/[\r\n]/g,'').replace(/\s+/g,' ').replace(/'/g,'\"');
      //.replace(//g,'')
      //eval(bSD)
      //eval("var botStateDefinition = { pos: { x: 0, y: 0, t: 0 }, currentZones: [], previousZones: [], cargo: false, hatch: false}")
      console.log(String(bSD))
      console.log(botStateDefinition);
      var cP = (await axios.get(packageUrl + availableYears[i] + '/color.json')).data.replace(/'/g,'\"');
      var colorPalette = JSON.parse(cP).colorPalette;
      store.set('package/' + availableYears[i] + 'colorPalette', colorPalette);
    }
  }
  catch(err) {
    console.log('[Package] cannot get latest packages');
  }
  initialized = true;
}

export const get = async () => {
  if(!initialized) {
    await init();
  }
  var result = {};
  result.availableYears = store.get('package/availableYears');
  for(var i = 0;i < result.availableYears.length;i++) {
    var currYear = result.availableYears[i];
    result[currYear] = {};
    result[currYear].colorPalette =  store.get('package/' + currYear + 'colorPalette');
  }
  return result;
}
