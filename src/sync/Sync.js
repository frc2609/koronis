import * as Package from 'sync/package/PackageCollector';
import * as Process from 'sync/process/ProcessCollector';
import * as ProcessVerifier from 'sync/process/ProcessVerifier';
import * as NavParser from 'sync/wiki/NavParser';
import * as TbaTeam from 'sync/tba/TbaTeam';
import * as TbaEvent from 'sync/tba/TbaEvent';

let syncStartEvent = new Event('syncstart');
let syncEndEvent = new Event('syncend');

export const update = () => {
  try {
    if(window.navigator.onLine) {
      let asyncUpdate = async () => {
        window.dispatchEvent(syncStartEvent);
        await Package.get();
        await Process.update();
        await ProcessVerifier.verifyProcesses();
        await NavParser.parseNav();
        await TbaTeam.update();
        await TbaEvent.update();
        window.dispatchEvent(syncEndEvent);
      }
      asyncUpdate();
    }
  }
  catch(err) {}
}

export const init = () => {
  window.addEventListener('online', update);
  window.addEventListener('offline', () => { window.dispatchEvent(syncEndEvent); });
  window.setInterval(update, 10*60*1000); //Update every 10 minutes
  update();
}
