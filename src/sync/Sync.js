import * as Package from 'sync/package/PackageCollector';
import * as Process from 'sync/process/ProcessCollector';
import * as TbaTeam from 'sync/tba/TbaTeam';

export const update = () => {
  try {
    Package.get();
    Process.update();
    TbaTeam.update();
  }
  catch(err) {}
}

export const init = () => {
  window.addEventListener('online', update);
  window.setInterval(update, 5*60*1000); //Update every 5 miniutes
  update();
}
