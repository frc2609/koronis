import Config from 'config/Config';
import * as Interface from 'db/Interface';

const axios = require('axios').default;
const store = require('store');

export const update = async () => {
  try {
    //Check version number of repo and local
    let repoIndex = (await axios.get(Config.processUrl + 'index.json')).data;
    let versionNumberRepo = repoIndex.versionNumber;
    let versionNumberLocal = store.get('processes/versionNumber');
    if(versionNumberRepo !== versionNumberLocal) {
      //Get available years
      let availableYears = repoIndex.availableYears;
      for(let i = 0;i < availableYears.length;i++) {
        //Get current year index
        let currRepoIndex = (await axios.get(Config.processUrl + availableYears[i] + '/index.json')).data;
        let currVersionNumberRepo = currRepoIndex.versionNumber;
        let currVersionNumberLocal = store.get('processes/' + availableYears[i] + '/versionNumber');
        if(currVersionNumberRepo !== currVersionNumberLocal) {
          //Get current year
          let availableProcesses = currRepoIndex.availableProcesses;
          for(let j = 0;j < availableProcesses.length;j++) {
            let currProcess = (await axios.get(Config.processUrl + availableYears[i] + '/' + availableProcesses[j])).data;
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
