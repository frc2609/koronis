import * as Package from 'sync/package/PackageCollector';
import * as Process from 'sync/process/ProcessCollector';
import * as TbaTeam from 'sync/tba/TbaTeam';
import * as TbaEvent from 'sync/tba/TbaEvent';

var syncStartEvent = new Event('syncstart');
var syncStatusEvent = new Event('syncstatus');
var syncEndEvent = new Event('syncend');
var syncing = false;
window.syncStatus = '';

export const update = () => {
  try {
    if(window.navigator.onLine) {
      var asyncUpdate = async () => {
        syncing = true;
        window.syncStatus = 'Packages';
        window.dispatchEvent(syncStartEvent);
        await Package.get();

        window.syncStatus = 'Process';
        window.dispatchEvent(syncStatusEvent);
        await Process.update();

        window.syncStatus = 'TBA';
        window.dispatchEvent(syncStatusEvent);
        await Promise.all([
          TbaTeam.update(),
          TbaEvent.update()
        ]);

        syncing = false;
        window.syncStatus = '';
        window.dispatchEvent(syncEndEvent);
      }
      asyncUpdate();
    }
  }
  catch(err) {}
}

export const init = () => {
  window.addEventListener('online', update);
  window.setInterval(update, 10*60*1000); //Update every 10 miniutes
  update();
}

export const getStatus = () => {
  return syncing;
}
