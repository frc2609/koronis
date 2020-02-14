import * as Db from 'db/Db';

var deepcopy = require('deep-copy');

export const insertTeam = async (inTeam) => {
  var teamCollection = (await Db.getTeams());
  return (await teamCollection.insert(deepcopy(inTeam)));
}

export const insertRecord = async (inRecord) => {
  var recordCollection = (await Db.getRecords());
  var currObj = deepcopy(inRecord);
  var oldEventLog = deepcopy(currObj.eventLog);
  var oldPositionLog = deepcopy(currObj.positionLog);
  currObj.eventLog = oldEventLog.map((e) => {return JSON.stringify(e)});
  currObj.positionLog = oldPositionLog.map((e) => {return JSON.stringify(e)});
  var prevDoc = (await recordCollection.findOne({id: currObj.id}).exec());

  if(prevDoc === null || typeof prevDoc.lastModified === 'undefined') {
    console.info('[Interface] Inserting record');
    return (await recordCollection.insert(currObj));
  }
  else if (prevDoc.lastModified < currObj.lastModified) {
    console.info('[Interface] Updating record');
    delete currObj._rev;
    return (await prevDoc.update({$set: currObj}));
  }
  else {
    console.info('[Interface] Aborting record insertion');
    return null;
  }
}

export const removeRecord = async (query) => {
  var recordCollection = (await Db.getRecords());
  var doc = (await recordCollection.findOne(query).exec());
  console.info('[Interface] Removing record');
  return (await doc.remove());
}

export const getRecords = async (query, sort = []) => {
  var recordCollection = (await Db.getRecords());
  var docs = (await recordCollection.find(query).sort(sort).exec());
  var newDocs = [];
  for(var i = 0;i < docs.length;i++) {
    var currObj = deepcopy(docs[i].toJSON());
    delete currObj._rev;
    var oldEventLog = deepcopy(currObj.eventLog);
    var oldPositionLog = deepcopy(currObj.positionLog);
    currObj.eventLog = oldEventLog.map((e) => {return JSON.parse(e)});
    currObj.positionLog = oldPositionLog.map((e) => {return JSON.parse(e)});
    newDocs.push(currObj);
  }
  console.info('[Interface] Returning records query');
  return newDocs;
}

export const insertProcess = async (inProcess) => {
  var processCollection = (await Db.getProcesses());
  var currObj = deepcopy(inProcess);
  var prevDoc = (await processCollection.findOne({id: currObj.id}).exec());

  if(prevDoc === null || typeof prevDoc.lastModified === 'undefined') {
    console.info('[Interface] Inserting process');
    return (await processCollection.insert(currObj));
  }
  else if (prevDoc.lastModified < currObj.lastModified) {
    console.info('[Interface] Updating process');
    delete currObj._rev;
    return (await prevDoc.update({$set: currObj}));
  }
  else {
    console.info('[Interface] Aborting process insertion');
    return null;
  }
}

export const removeProcess = async (query) => {
  var processCollection = (await Db.getProcesses());
  var doc = (await processCollection.findOne(query).exec());
  console.info('[Interface] Removing process');
  return (await doc.remove());
}

export const getProcesses = async (query, sort = []) => {
  var processCollection = (await Db.getProcesses());
  var docs = (await processCollection.find(query).sort(sort).exec());
  var newDocs = [];
  for(var i = 0;i < docs.length;i++) {
    var currObj = deepcopy(docs[i].toJSON());
    delete currObj._rev;
    newDocs.push(currObj);
  }
  console.info('[Interface] Returning processes query');
  return newDocs;
}
