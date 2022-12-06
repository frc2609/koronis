import Config from 'config/Config';
import * as PackageInjector from 'sync/package/PackageInjector';

const axios = require('axios').default;
const store = require('store');
const deepcopy = require('deep-copy');

let initialized = false;

async function perYearInit(year) {
  //Get bot definition
  let bSD = await eval('import(\"' + Config.packageUrl + year + '/bot.js\")'); // eslint-disable-line no-eval, no-useless-escape
  let botStateDefinition = deepcopy(bSD.default);
  store.set('package/' + year + '/botStateDefinition', botStateDefinition);

  //Get button definitions
  let bD = await eval('import(\"' + Config.packageUrl + year + '/button.js\")'); // eslint-disable-line no-eval, no-useless-escape
  let buttonDefinitions = deepcopy(bD.default);
  store.set('package/' + year + '/buttonDefinitions', buttonDefinitions);

  //Get event definitions
  let eD = await eval('import(\"' + Config.packageUrl + year + '/event.js\")'); // eslint-disable-line no-eval, no-useless-escape
  let eventDefinitions = deepcopy(eD.default);
  store.set('package/' + year + '/eventDefinitions', eventDefinitions);

  //Get field definition
  let fD = await eval('import(\"' + Config.packageUrl + year + '/field.js\")'); // eslint-disable-line no-eval, no-useless-escape
  let fieldStateDefinition = deepcopy(fD.default);
  store.set('package/' + year + '/fieldStateDefinition', fieldStateDefinition);

  //Get game definition
  let gD = await eval('import(\"' + Config.packageUrl + year + '/game.js\")'); // eslint-disable-line no-eval, no-useless-escape
  let gameStateDefinition = deepcopy(gD.default);
  store.set('package/' + year + '/gameStateDefinition', gameStateDefinition);

  //Get status definition
  let sD = await eval('import(\"' + Config.packageUrl + year + '/status.js\")'); // eslint-disable-line no-eval, no-useless-escape
  let statusUpdateDefinition = deepcopy(sD.default);
  store.set('package/' + year + '/statusUpdateDefinition', statusUpdateDefinition);

  //Get color palette
  let colorPalette = (await axios.get(Config.packageUrl + year + '/color.json', {responseType: 'json'})).data;
  store.set('package/' + year + '/colorPalette', colorPalette);

  //Done loading
  console.info('[Package] Packages for ' + year + ' loaded');
  return null;
}

export const init = async () => {
  try {
    //Check version number of repo and local
    let repoIndex = (await axios.get(Config.packageUrl + 'index.json')).data;
    let availableYears = repoIndex.availableYears;
    store.set('package/availableYears', availableYears);
    let versionNumberRepo = repoIndex.versionNumber;
    let versionNumberLocal = store.get('package/versionNumber');
    //Inject test package
    if(Config.environmentConfig === 'development') {
      PackageInjector.inject(1);
      availableYears.push(1);
      versionNumberLocal = -1;
    }
    if(versionNumberLocal !== versionNumberRepo) {
      //Get all avaiable years
      for(let i = 0;i < availableYears.length;i++) {
        if(availableYears[i] !== 1) {
          await perYearInit(availableYears[i]);
        }
      }

      //Set default year
      let biggestYear = 0;
      for(let i = 0;i < availableYears.length;i++) { // eslint-disable-line no-redeclare
        let currYear = store.get('package/' + availableYears[i] + '/gameStateDefinition').gameState.year;
        if(currYear > biggestYear) {biggestYear = currYear;}
      }
      if(typeof store.get('settings/checkedYear') === 'undefined' || store.get('settings/checkedYear') < biggestYear) {
        store.set('settings/checkedYear', biggestYear);
        store.set('settings/currentYear', biggestYear);
      }
      if(typeof store.get('settings/currentYear') === 'undefined') {
        store.set('settings/currentYear', biggestYear);
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
  return null;
}

export const get = async () => {
  if(!initialized) {
    await init();
  }
  let result = {};
  result.availableYears = store.get('package/availableYears');
  for(let i = 0;i < result.availableYears.length;i++) {
    let currYear = result.availableYears[i];
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
  let result = {};
  let availableYears = store.get('package/availableYears');
  for(let i = 0;i < availableYears.length;i++) {
    let currYear = availableYears[i];
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
  let result = [];
  let availableYears = store.get('package/availableYears');
  for(let i = 0;i < availableYears.length;i++) {
    let currYear = availableYears[i];
    result.push(store.get('package/' + currYear + '/gameStateDefinition').gameState.year);
  }
  return result;
}

export const getGameStates = async () => {
  if(!initialized) {
    await init();
  }
  let result = [];
  let availableYears = store.get('package/availableYears');
  for(let i = 0;i < availableYears.length;i++) {
    let currYear = availableYears[i];
    result.push(deepcopy(store.get('package/' + currYear + '/gameStateDefinition').gameState));
  }
  return result;
}
