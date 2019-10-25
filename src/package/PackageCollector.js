import axios from 'axios';
import { packageUrl } from 'Config';
var store = require('store');
var initialized = false;

var geval = eval;
var botStateDefinition = {};
var buttonDefinitions = [];
var eventDefinitions = [];

export const init = async () => {
  try {
    var availableYears = (await axios.get(packageUrl + 'index.json')).data.availableYears;
    store.set('package/availableYears', availableYears);
    for(var i = 0;i < availableYears.length;i++) {
      eval('import(\"' + packageUrl + availableYears[i] + '/bot.js\")').then((bSD) => {
        botStateDefinition = bSD.default;
        store.set('package/' + availableYears[i] + '/botStateDefinition', botStateDefinition);
      });
      eval('import(\"' + packageUrl + availableYears[i] + '/buttons.js\")').then((bD) => {
        buttonDefinitions = bD.default;
        store.set('package/' + availableYears[i] + '/buttonDefinitions', buttonDefinitions);
      });
      var colorPalette = (await axios.get(packageUrl + availableYears[i] + '/color.json',{responseType: 'json'})).data.colorPalette;
      store.set('package/' + availableYears[i] + '/colorPalette', colorPalette);
      eval('import(\"' + packageUrl + availableYears[i] + '/events.js\")').then((eD) => {
        eventDefinitions = eD.default;
        console.log(eventDefinitions);
        store.set('package/' + availableYears[i] + '/eventDefinitions', eventDefinitions);
      });
      var fieldDefinition = (await axios.get(packageUrl + availableYears[i] + '/field.json',{responseType: 'json'})).data;
      store.set('package/' + availableYears[i] + '/fieldDefinition', fieldDefinition);
      var gameDefinition = (await axios.get(packageUrl + availableYears[i] + '/game.json',{responseType: 'json'})).data;
      store.set('package/' + availableYears[i] + '/gameDefinition', gameDefinition);
      console.log('[Package] Packages for ' + availableYears[i] + ' loaded');
    }
  }
  catch(err) {
    console.log('[Package] Cannot get latest packages');
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
    result[currYear].botStateDefinition = store.get('package/' + currYear + '/botStateDefinition');
    result[currYear].buttonDefinitions = store.get('package/' + currYear + '/buttonDefinitions');
    result[currYear].colorPalette = store.get('package/' + currYear + '/colorPalette');
    result[currYear].eventDefinitions = store.get('package/' + currYear + '/eventDefinitions');
    result[currYear].fieldDefinition = store.get('package/' + currYear + '/fieldDefinition');
    result[currYear].gameDefinition = store.get('package/' + currYear + '/gameDefinition');
  }
  return result;
}

export const getByYear = async (inYear) => {
  if(!initialized) {
    await init();
  }
  var result = {};
  var availableYears = store.get('package/availableYears');
  for(var i = 0;i < availableYears.length;i++) {
    var currYear = availableYears[i];
    if(currYear == inYear) {
      result.botStateDefinition = store.get('package/' + currYear + '/botStateDefinition');
      result.buttonDefinitions = store.get('package/' + currYear + '/buttonDefinitions');
      result.colorPalette = store.get('package/' + currYear + '/colorPalette');
      result.eventDefinitions = store.get('package/' + currYear + '/eventDefinitions');
      result.fieldDefinition = store.get('package/' + currYear + '/fieldDefinition');
      result.gameDefinition = store.get('package/' + currYear + '/gameDefinition');
    }
  }
  return result;
}
