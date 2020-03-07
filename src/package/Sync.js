import * as Package from 'package/PackageCollector';
import * as Process from 'package/ProcessCollector';

export const update = () => {
  try {    
    Package.get();
    Process.update();
  }
  catch(err) {}
}

export const init = () => {
  window.addEventListener('online', update);
  window.setInterval(update, 60000);
  update();
}
  