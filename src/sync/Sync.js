import * as Package from 'sync/package/PackageCollector';
import * as Process from 'sync/process/ProcessCollector';
import * as TbaTeam from 'sync/tba/TbaTeam';

export const update = () => {
  try {
    if(window.navigator.onLine) {
      Package.get();
      Process.update();
      TbaTeam.update();
    }
  }
  catch(err) {}
}

export const init = () => {
  window.addEventListener('online', update);
  window.setInterval(update, 10*60*1000); //Update every 10 miniutes
  update();
}
