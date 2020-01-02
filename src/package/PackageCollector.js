import { packageUrl } from 'Config';
var axios = require('axios');
var store = require('store');
var deepcopy = require('deep-copy');

var Package = {initialized: false};

async function perYearInit(year) {
  //Get bot definition
  var bSD = await eval('import(\"' + packageUrl + year + '/bot.js\")');
  var botStateDefinition = deepcopy(bSD.default);
  store.set('package/' + year + '/botStateDefinition', botStateDefinition);
  
  //Get button definitions
  var bD = await eval('import(\"' + packageUrl + year + '/button.js\")')
  var buttonDefinitions = deepcopy(bD.default);
  store.set('package/' + year + '/buttonDefinitions', buttonDefinitions);
  
  //Get event definitions
  var eD = await eval('import(\"' + packageUrl + year + '/event.js\")')
  var eventDefinitions = deepcopy(eD.default);
  store.set('package/' + year + '/eventDefinitions', eventDefinitions);
  
  //Get field definition
  var fD = await eval('import(\"' + packageUrl + year + '/field.js\")')
  var fieldStateDefinition = deepcopy(fD.default);
  store.set('package/' + year + '/fieldStateDefinition', fieldStateDefinition);
  
  //Get game definition
  var gD = await eval('import(\"' + packageUrl + year + '/game.js\")')
  var gameStateDefinition = deepcopy(gD.default);
  store.set('package/' + year + '/gameStateDefinition', gameStateDefinition);
  
  //Get status definition
  var sD = await eval('import(\"' + packageUrl + year + '/status.js\")')
  var statusUpdateDefinition = deepcopy(sD.default);
  store.set('package/' + year + '/statusUpdateDefinition', statusUpdateDefinition);

  //Get color palette
  var colorPalette = (await axios.get(packageUrl + year + '/color.json', {responseType: 'json'})).data;
  store.set('package/' + year + '/colorPalette', colorPalette);
  
  //Done loading
  console.log('[Package] Packages for ' + year + ' loaded');
}

export const init = async () => {
  try {
    //Check version number of repo and local
    var repoIndex = (await axios.get(packageUrl + 'index.json')).data;
    var versionNumberRepo = repoIndex.versionNumber;
    var versionNumberLocal = store.get('package/versionNumber');
    if(versionNumberLocal != versionNumberRepo) {
      //Get all avaiable years
      var availableYears = repoIndex.availableYears;
      store.set('package/availableYears', availableYears);
    
      for(var i = 0;i < availableYears.length;i++) {
        await perYearInit(availableYears[i]);
      }
      //Store new versionNumber to local store
      Package.initialized = true;
      store.set('package/versionNumber', versionNumberRepo);
      console.log('[Package] Packages updated');
    }
    else {
      console.log('[Package] No new packages to update');
    }
  }
  catch(err) {
    console.log('[Package] Cannot get latest packages');
    console.log(err);
  }
}

export const get = async () => {
  if(!Package.initialized) {
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
    result[currYear].fieldStateDefinition = store.get('package/' + currYear + '/fieldStateDefinition');
    result[currYear].gameStateDefinition = store.get('package/' + currYear + '/gameStateDefinition');
    result[currYear].statusUpdateDefinition = store.get('package/' + currYear + '/statusUpdateDefinition');
  }
  return result;
}

export const getByYear = async (inYear) => {
  if(!Package.initialized) {
    await init();
  }
  var result = {};
  var availableYears = store.get('package/availableYears');
  for(var i = 0;i < availableYears.length;i++) {
    var currYear = availableYears[i];
    if(store.get('package/' + currYear + '/gameStateDefinition').gameState.year == inYear) {
      result.botStateDefinition = store.get('package/' + currYear + '/botStateDefinition');
      result.buttonDefinitions = store.get('package/' + currYear + '/buttonDefinitions');
      result.colorPalette = store.get('package/' + currYear + '/colorPalette');
      result.eventDefinitions = store.get('package/' + currYear + '/eventDefinitions');
      result.fieldStateDefinition = store.get('package/' + currYear + '/fieldStateDefinition');
      result.gameStateDefinition = store.get('package/' + currYear + '/gameStateDefinition');
      result.statusUpdateDefinition = store.get('package/' + currYear + '/statusUpdateDefinition');
    }
  }
  return result;
}

export const getYears = async () => {
  if(!Package.initialized) {
    await init();
  }
  var result = [];
  var availableYears = store.get('package/availableYears');
  for(var i = 0;i < availableYears.length;i++) {
    var currYear = availableYears[i];
    result.push(store.get('package/' + currYear + '/gameStateDefinition').year);
  }
  return result;
}

export const getGameStates = async () => {
  if(!Package.initialized) {
    await init();
  }
  var result = [];
  var availableYears = store.get('package/availableYears');
  for(var i = 0;i < availableYears.length;i++) {
    var currYear = availableYears[i];
    result.push(deepcopy(store.get('package/' + currYear + '/gameStateDefinition').gameState));
  }
  return result;
}
