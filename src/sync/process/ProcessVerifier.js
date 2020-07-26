import * as Verify from 'auth/Verify';
import * as Interface from 'db/Interface';

export const verifyProcesses = async () => {
  var unverifiedProcesses = (await Interface.getProcesses({'metadata.verified': false}));
  console.info('[Processes] Verifying ' + unverifiedProcesses.length + ' processes');
  for(var i = 0;i < unverifiedProcesses.length;i++) {
    var currObj = unverifiedProcesses[i];
    if(!currObj.metadata.verified) {
      if(currObj.user !== '') {
        try {
          currObj.metadata.unModified = (await Verify.verifyProcess(currObj));
          currObj.metadata.verified = true;
        }
        catch(err) {
          currObj.metadata.unModified = false;
        }
        await Interface.insertProcess(currObj);
      }
    }
  }
}
