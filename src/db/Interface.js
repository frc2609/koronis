import * as Db from 'db/Db';
import * as TbaKey from 'sync/tba/TbaKey';

var deepcopy = require('deep-copy');
var moment = require('moment');
var axios = require('axios');

export const insertTeam = async (inTeam) => {
  var teamCollection = (await Db.getTeams());
  var currObj = deepcopy(inTeam);
  var prevDoc = (await teamCollection.findOne({key: currObj.key}).exec());
  if(prevDoc === null) {
    console.info('[Interface] Inserting team');
    return (await teamCollection.insert(currObj));
  }
  else {
    console.info('[Interface] Updating team');
    return (await prevDoc.update({$set: currObj}));
  }
}

export const insertTbaTeam = async (inTeam) => {
  var teamCollection = (await Db.getTeams());
  var currObj = deepcopy(inTeam);
  currObj.teamNumber = currObj['team_number'];
  delete currObj['team_number'];
  currObj.schoolName = currObj['school_name'];
  delete currObj['school_name'];
  currObj.stateProv = currObj['state_prov'];
  delete currObj['state_prov'];
  delete currObj.address;
  delete currObj['postal_code'];
  delete currObj['gmaps_place_id'];
  delete currObj['gmaps_url'];
  delete currObj.lat;
  delete currObj.lng;
  delete currObj['location_name'];
  currObj.rookieYear = currObj['rookie_year'];
  delete currObj['rookie_year'];
  delete currObj.motto;
  delete currObj['home_championship'];
  //Clear out null values
  Object.keys(currObj).forEach((item, i) => {
    if(currObj[item] === null) {
      if(
        item !== 'teamNumber' &&
        item !== 'rookieYear'
      ) {
        currObj[item] = '';
      }
      else {
        currObj[item] = -1;
      }
    }
  });

  var prevDoc = (await teamCollection.findOne({key: currObj.key}).exec());
  if(prevDoc === null) {
    console.info('[Interface] Inserting team');
    return (await teamCollection.insert(currObj));
  }
  else {
    console.info('[Interface] Updating team');
    delete currObj._rev;
    return (await prevDoc.update({$set: currObj}));
  }
}

export const getTeams = async (query, sort = {}) => {
  var teamCollection = (await Db.getTeams());
  var docs = (await teamCollection.find(query).sort(sort).exec());
  var newDocs = [];
  for(var i = 0;i < docs.length;i++) {
    var currObj = deepcopy(docs[i].toJSON());
    delete currObj._rev;
    newDocs.push(currObj);
  }
  console.info('[Interface] Returning team query');
  return newDocs;
}

export const queryTeams = async (query, sort = {}) => {
  var teamCollection = (await Db.getTeams());
  console.info('[Interface] Returning team query object');
  return teamCollection.find(query).sort(sort);
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

export const getRecords = async (query, sort = {}) => {
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

export const getProcesses = async (query, sort = {}) => {
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

export const getTbaRecords = async (query, sort = {}) => {
  var newDocs = deepcopy(await getRecords(query, sort));
  for(var i = 0;i < newDocs.length;i++) {
    newDocs[i].tbaData = (await getTbaMatch(newDocs[i]));
  }
  console.info('[Interface] Returning TBA enhanced records query');
  return newDocs;
}

export const getTbaMatch = async (inRecord) => { //Get corresponding tbaMatch for given record
  var currObj = deepcopy(inRecord);
  if(
    currObj.matchType === 'qm' ||
    currObj.matchType === 'ef' ||
    currObj.matchType === 'qf' ||
    currObj.matchType === 'sf' ||
    currObj.matchType === 'f'
  ) {
    //WIP
  }
}

export const syncTbaMatch = async (key) => { //return tba data
  var tbaMatchCollection = (await Db.getTbaMatches());
  var tbaKey = TbaKey.getKey();
  var requestConfig = {
    url: key,
    baseURL: 'https://www.thebluealliance.com/api/v3/match/',
    headers: {
      'X-TBA-Auth-Key': tbaKey
    }
  };
  var prevDoc = (await tbaMatchCollection.findOne({key: key}).exec());
  if(prevDoc !== null) {
    requestConfig.headers['If-Modified-Since'] = moment.unix(prevDoc.lastModified).toDate().toGMTString();
  }
  try {
    var response = (await axios.request(requestConfig));
    if(response.status === 200) {
      var lastModified = moment(response.headers['last-modified']).unix();
      var currObj = deepcopy(response.data);
      //WIP
    }
  }
  catch(err) {
    return {};
  }

}
