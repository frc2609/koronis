import Config from 'config/Config';
var axios = require('axios');
var store = require('store');
var deepcopy = require('deep-copy');

var initialized = false;

async function perYearInit(year) {
  //Get bot definition
  var bSD = await eval('import(\"' + Config.packageUrl + year + '/bot.js\")'); // eslint-disable-line no-eval, no-useless-escape
  var botStateDefinition = deepcopy(bSD.default);
  store.set('package/' + year + '/botStateDefinition', botStateDefinition);

  //Get button definitions
  var bD = await eval('import(\"' + Config.packageUrl + year + '/button.js\")'); // eslint-disable-line no-eval, no-useless-escape
  var buttonDefinitions = deepcopy(bD.default);
  store.set('package/' + year + '/buttonDefinitions', buttonDefinitions);

  //Get event definitions
  var eD = await eval('import(\"' + Config.packageUrl + year + '/event.js\")'); // eslint-disable-line no-eval, no-useless-escape
  var eventDefinitions = deepcopy(eD.default);
  store.set('package/' + year + '/eventDefinitions', eventDefinitions);

  //Get field definition
  var fD = await eval('import(\"' + Config.packageUrl + year + '/field.js\")'); // eslint-disable-line no-eval, no-useless-escape
  var fieldStateDefinition = deepcopy(fD.default);
  store.set('package/' + year + '/fieldStateDefinition', fieldStateDefinition);

  //Get game definition
  var gD = await eval('import(\"' + Config.packageUrl + year + '/game.js\")'); // eslint-disable-line no-eval, no-useless-escape
  var gameStateDefinition = deepcopy(gD.default);
  store.set('package/' + year + '/gameStateDefinition', gameStateDefinition);

  //Get status definition
  var sD = await eval('import(\"' + Config.packageUrl + year + '/status.js\")'); // eslint-disable-line no-eval, no-useless-escape
  var statusUpdateDefinition = deepcopy(sD.default);
  store.set('package/' + year + '/statusUpdateDefinition', statusUpdateDefinition);

  //Get color palette
  var colorPalette = (await axios.get(Config.packageUrl + year + '/color.json', {responseType: 'json'})).data;
  store.set('package/' + year + '/colorPalette', colorPalette);

  //Done loading
  console.info('[Package] Packages for ' + year + ' loaded');
}

export const init = async () => {
  try {
    //Check version number of repo and local
    var repoIndex = (await axios.get(Config.packageUrl + 'index.json')).data;
    var versionNumberRepo = repoIndex.versionNumber;
    var versionNumberLocal = store.get('package/versionNumber');
    if(versionNumberLocal !== versionNumberRepo) {
      //Get all avaiable years
      var availableYears = repoIndex.availableYears;
      store.set('package/availableYears', availableYears);

      for(var i = 0;i < availableYears.length;i++) {
        await perYearInit(availableYears[i]);
      }

      //Set default year
      if(availableYears.length > 0) {
        var gS = store.get('package/' + availableYears[0] + '/gameStateDefinition');
        if(typeof store.get('settings/currentYear') === 'undefined') {
          store.set('settings/currentYear', gS.gameState.year);
        }
      }
      //Store new versionNumber to local store
      initialized = true;
      store.set('package/versionNumber', versionNumberRepo);
      console.info('[Package] Packages updated');
    }
    else {
      console.info('[Package] No new packages to update');
    }
  }
  catch(err) {
    console.info('[Package] Cannot get latest packages');
    console.error(err);
  }
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
    result[currYear].fieldStateDefinition = store.get('package/' + currYear + '/fieldStateDefinition');
    result[currYear].gameStateDefinition = store.get('package/' + currYear + '/gameStateDefinition');
    result[currYear].statusUpdateDefinition = store.get('package/' + currYear + '/statusUpdateDefinition');
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
    if(store.get('package/' + currYear + '/gameStateDefinition').gameState.year === inYear) {
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
  if(!initialized) {
    await init();
  }
  var result = [];
  var availableYears = store.get('package/availableYears');
  for(var i = 0;i < availableYears.length;i++) {
    var currYear = availableYears[i];
    result.push(store.get('package/' + currYear + '/gameStateDefinition').gameState.year);
  }
  return result;
}

export const getGameStates = async () => {
  if(!initialized) {
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
