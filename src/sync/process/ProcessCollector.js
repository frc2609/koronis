import Config from 'config/Config';
import * as Interface from 'db/Interface';

var store = require('store');
var axios = require('axios');

export const update = async () => {
  try {
    //Check version number of repo and local
    var repoIndex = (await axios.get(Config.processUrl + 'index.json')).data;
    var versionNumberRepo = repoIndex.versionNumber;
    var versionNumberLocal = store.get('processes/versionNumber');
    if(versionNumberRepo !== versionNumberLocal) {
      //Get available years
      var availableYears = repoIndex.availableYears;
      for(var i = 0;i < availableYears.length;i++) {
        //Get current year index
        var currRepoIndex = (await axios.get(Config.processUrl + availableYears[i] + '/index.json')).data;
        var currVersionNumberRepo = currRepoIndex.versionNumber;
        var currVersionNumberLocal = store.get('processes/' + availableYears[i] + '/versionNumber');
        if(currVersionNumberRepo !== currVersionNumberLocal) {
          //Get current year
          var availableProcesses = currRepoIndex.availableProcesses;
          for(var j = 0;j < availableProcesses.length;j++) {
            var currProcess = (await axios.get(Config.processUrl + availableYears[i] + '/' + availableProcesses[j])).data;
            currProcess.metadata = {
              verified: true,
              unModified: true,
              safe: true
            };
            Interface.insertProcess(currProcess);
          }
          store.set('processes/' + availableYears[i] + '/versionNumber', currVersionNumberRepo);
        }
      }
      store.set('processes/versionNumber', versionNumberRepo);
      console.info('[Processes] Processes updated');
    }
    else {
      console.info('[Processes] No new processes to update');
    }
  }
  catch(err) {
    console.info('[Processes] Cannot get latest processes');
    console.error(err);
  }
  return null;
}
