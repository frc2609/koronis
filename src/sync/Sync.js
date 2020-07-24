import * as Package from 'sync/package/PackageCollector';
import * as Process from 'sync/process/ProcessCollector';
import * as TbaTeam from 'sync/tba/TbaTeam';
import * as TbaEvent from 'sync/tba/TbaEvent';

var syncStartEvent = new Event('syncstart');
var syncEndEvent = new Event('syncend');

export const update = () => {
  try {
    if(window.navigator.onLine) {
      var asyncUpdate = async () => {
        window.dispatchEvent(syncStartEvent);
        await Package.get();
        await Process.update();
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
  window.addEventListener('offline', () => {window.dispatchEvent(syncEndEvent)});
  window.setInterval(update, 5*60*1000); //Update every 5 miniutes
  update();
}
