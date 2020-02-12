import * as User from 'auth/User';
import * as Interface from 'db/Interface';

export const saveProcess = (inYear, inQueryType, inDataType, inName, inTitle, inDescription, inFunction, inObj = {}, callback = () => {}) => {
  var obj = inObj;
  obj.id = User.genProcessUuid(inYear, inQueryType, inDataType, inName, inTitle, inDescription, inFunction);
  obj.year = inYear;
  obj.queryType = inQueryType;
  obj.dataType = inDataType;
  obj.name = inName;
  obj.title = inTitle;
  obj.description = inDescription;
  obj.function = inFunction;
  obj.user = User.getUserId();
  obj.device = User.getFingerprint();
  obj.lastModified = Math.round((Date.now())/1000);
  obj.digitalSignature = User.genProcessDS(inYear, inQueryType, inDataType, inName, inTitle, inDescription, inFunction);
  if(typeof obj.changeLog === 'undefined') {
    obj.changeLog = [];
  }
  obj.changeLog.push({
    id: obj.id,
    user: obj.user,
    modificationTime: obj.lastModified
  });
  Interface.insertProcess(obj).then(() => {
    if(typeof callback === 'function') { callback(); }
  });
}
