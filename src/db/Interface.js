import * as Db from 'db/Db';
import * as Verify from 'auth/Verify';

const deepcopy = require('deep-copy');
const deepCompare = require('fast-deep-equal');
const moment = require('moment');

//==================================Team==================================\\
export const insertTeam = async (inTeam) => {
  let teamCollection = (await Db.getTeams());
  let currObj = deepcopy(inTeam);
  let prevDoc = (await teamCollection.findOne({key: currObj.key}).exec());
  if(prevDoc === null) {
    return (await teamCollection.insert(currObj));
  }
  else {
    return (await prevDoc.update({$set: currObj}));
  }
}

export const insertTbaTeam = async (inTeam) => {
  let teamCollection = (await Db.getTeams());
  let currObj = {};
  currObj.key = inTeam.key;
  currObj.teamNumber = inTeam.team_number;
  currObj.nickname = inTeam.nickname;
  currObj.name = inTeam.name;
  currObj.schoolName = inTeam.school_name;
  currObj.city = inTeam.city;
  currObj.stateProv = inTeam.state_prov;
  currObj.country = inTeam.country;
  currObj.website = inTeam.website;
  currObj.rookieYear = inTeam.rookie_year;
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

  let prevDoc = (await teamCollection.findOne({key: currObj.key}).exec());
  if(prevDoc === null) {
    return (await teamCollection.insert(currObj));
  }
  else {
    delete currObj._rev;
    return (await prevDoc.update({$set: currObj}));
  }
}

export const getTeams = async (query, sort = []) => {
  let teamCollection = (await Db.getTeams());
  let docs = (await teamCollection.find(query).sort(sort).exec());
  let newDocs = [];
  for(let i = 0;i < docs.length;i++) {
    let currObj = deepcopy(docs[i].toJSON());
    delete currObj._rev;
    newDocs.push(currObj);
  }
  console.info('[Interface] Returning team query');
  return newDocs;
}

export const subscribeTeams = async (query, sort = [], onChange = () => {}) => {
  let teamCollection = (await Db.getTeams());
  console.info('[Interface] Returning teams query subscription');
  return teamCollection.find(query).sort(sort).$.subscribe((docs) => {
    let newDocs = [];
    for(let i = 0;i < docs.length;i++) {
      let currObj = deepcopy(docs[i].toJSON());
      delete currObj._rev;
      newDocs.push(currObj);
    }
    onChange(newDocs);
  });
}

export const queryTeams = async (query, sort = []) => {
  let teamCollection = (await Db.getTeams());
  console.info('[Interface] Returning team query object');
  return teamCollection.find(query).sort(sort);
}

//==================================Record==================================\\
export const insertRecord = async (inRecord) => {
  let recordCollection = (await Db.getRecords());
  let currObj = deepcopy(inRecord);
  let oldEventLog = deepcopy(currObj.eventLog);
  let oldPositionLog = deepcopy(currObj.positionLog);
  currObj.eventLog = oldEventLog.map((e) => {return JSON.stringify(e)});
  currObj.positionLog = oldPositionLog.map((e) => {return JSON.stringify(e)});
  let prevDoc = (await recordCollection.findOne({id: currObj.id}).exec());

  if(prevDoc === null || typeof prevDoc.lastModified === 'undefined') {
    if(!currObj.metadata) {
      currObj.metadata = {
        verified: false
      };
    }
    return (await recordCollection.insert(currObj));
  }
  else if (prevDoc.lastModified < currObj.lastModified) {
    delete currObj._rev;
    return (await prevDoc.update({$set: currObj}));
  }
  else {
    return null;
  }
}

export const removeRecord = async (query) => {
  let recordCollection = (await Db.getRecords());
  let doc = (await recordCollection.findOne(query).exec());
  return (await doc.remove());
}

export const getRecords = async (query, sort = []) => {
  let recordCollection = (await Db.getRecords());
  let docs = (await recordCollection.find(query).sort(sort).exec());
  let newDocs = [];
  for(let i = 0;i < docs.length;i++) {
    let currObj = deepcopy(docs[i].toJSON());
    delete currObj._rev;
    let oldEventLog = deepcopy(currObj.eventLog);
    let oldPositionLog = deepcopy(currObj.positionLog);
    currObj.eventLog = oldEventLog.map((e) => {return JSON.parse(e)});
    currObj.positionLog = oldPositionLog.map((e) => {return JSON.parse(e)});
    newDocs.push(currObj);
  }
  console.info('[Interface] Returning records query');
  return newDocs;
}

export const subscribeRecords = async (query, sort = [], onChange = () => {}) => {
  let recordCollection = (await Db.getRecords());
  console.info('[Interface] Returning records query subscription');
  return recordCollection.find(query).sort(sort).$.subscribe((docs) => {
    let newDocs = [];
    for(let i = 0;i < docs.length;i++) {
      let currObj = deepcopy(docs[i].toJSON());
      delete currObj._rev;
      let oldEventLog = deepcopy(currObj.eventLog);
      let oldPositionLog = deepcopy(currObj.positionLog);
      currObj.eventLog = oldEventLog.map((e) => {return JSON.parse(e)});
      currObj.positionLog = oldPositionLog.map((e) => {return JSON.parse(e)});
      newDocs.push(currObj);
    }
    onChange(newDocs);
  });
}

export const queryRecords = async (query, sort = []) => {
  let recordCollection = (await Db.getRecords());
  console.info('[Interface] Returning record query object');
  return recordCollection.find(query).sort(sort);
}

//==================================Process==================================\\
export const insertProcess = async (inProcess) => {
  let processCollection = (await Db.getProcesses());
  let currObj = deepcopy(inProcess);
  let prevDoc = (await processCollection.findOne({id: currObj.id}).exec());

  if(!currObj.metadata) {
    currObj.metadata = {
      verified: false,
      unModified: false,
      safe: false
    };
  }
  if(!currObj.metadata.verified) {
    if(currObj.user !== '') {
      try {
        currObj.metadata.unModified = (await Verify.verifyProcess(currObj));
        currObj.metadata.verified = true;
      }
      catch(err) {
        currObj.metadata.unModified = false;
      }
    }
  }
  if(prevDoc === null || typeof prevDoc.lastModified === 'undefined') {
    return (await processCollection.insert(currObj));
  }
  else if (prevDoc.lastModified < currObj.lastModified || !deepCompare(prevDoc.metadata, currObj.metadata)) {
    delete currObj._rev;
    return (await prevDoc.update({$set: currObj}));
  }
  else {
    return null;
  }
}

export const removeProcess = async (query) => {
  let processCollection = (await Db.getProcesses());
  let doc = (await processCollection.findOne(query).exec());
  return (await doc.remove());
}

export const getProcesses = async (query, sort = []) => {
  let processCollection = (await Db.getProcesses());
  let docs = (await processCollection.find(query).sort(sort).exec());
  let newDocs = [];
  for(let i = 0;i < docs.length;i++) {
    let currObj = deepcopy(docs[i].toJSON());
    delete currObj._rev;
    newDocs.push(currObj);
  }
  console.info('[Interface] Returning processes query');
  return newDocs;
}

export const subscribeProcesses = async (query, sort = [], onChange = () => {}) => {
  let processCollection = (await Db.getProcesses());
  console.info('[Interface] Returning process query subscription');
  return processCollection.find(query).sort(sort).$.subscribe((docs) => {
    let newDocs = [];
    for(let i = 0;i < docs.length;i++) {
      let currObj = deepcopy(docs[i].toJSON());
      delete currObj._rev;
      newDocs.push(currObj);
    }
    onChange(newDocs);
  });
}

export const queryProcesses = async (query, sort = []) => {
  let processCollection = (await Db.getProcesses());
  console.info('[Interface] Returning process query object');
  return processCollection.find(query).sort(sort);
}

//==================================Event==================================\\
export const insertEvent = async (inEvent) => {
  let eventCollection = (await Db.getEvents());
  let currObj = deepcopy(inEvent);
  let prevDoc = (await eventCollection.findOne({key: currObj.key}).exec());
  if(prevDoc === null) {
    return (await eventCollection.insert(currObj));
  }
  else {
    return (await eventCollection.update({$set: currObj}));
  }
}

export const insertTbaEvent = async (inEvent) => {
  let eventCollection = (await Db.getEvents());
  let currObj = {};
  currObj.key = inEvent.key;
  currObj.name = inEvent.name;
  currObj.nickname = inEvent.short_name;
  currObj.year = inEvent.year;
  currObj.week = inEvent.week;
  currObj.startDate = moment(inEvent.start_date).unix();
  currObj.endDate = moment(inEvent.end_date).unix();
  currObj.lat = inEvent.lat;
  currObj.lng = inEvent.lng;
  currObj.teams = [];
  //Clear out null values
  Object.keys(currObj).forEach((item, i) => {
    if(currObj[item] === null) {
      if(
        item !== 'week' &&
        item !== 'startDate' &&
        item !== 'endDate' &&
        item !== 'lat' &&
        item !== 'lng'
      ) {
        currObj[item] = '';
      }
      else {
        currObj[item] = -1;
      }
    }
  });

  let prevDoc = (await eventCollection.findOne({key: currObj.key}).exec());
  if(prevDoc === null) {
    return (await eventCollection.insert(currObj));
  }
  else {
    delete currObj._rev;
    if(typeof prevDoc.teams !== 'undefined') {currObj.teams = prevDoc.teams;}
    return (await prevDoc.update({$set: currObj}));
  }
}

export const getEvents = async (query, sort = []) => {
  let eventCollection = (await Db.getEvents());
  let docs = (await eventCollection.find(query).sort(sort).exec());
  let newDocs = [];
  for(let i = 0;i < docs.length;i++) {
    let currObj = deepcopy(docs[i].toJSON());
    delete currObj._rev;
    newDocs.push(currObj);
  }
  console.info('[Interface] Returning event query');
  return newDocs;
}

export const queryEvents = async (query, sort = []) => {
  let eventCollection = (await Db.getEvents());
  console.info('[Interface] Returning event query object');
  return eventCollection.find(query).sort(sort);
}

/* WIP
export const getTbaRecords = async (query, sort = []) => {
  let newDocs = deepcopy(await getRecords(query, sort));
  for(let i = 0;i < newDocs.length;i++) {
    newDocs[i].tbaData = (await getTbaMatch(newDocs[i]));
  }
  console.info('[Interface] Returning TBA enhanced records query');
  return newDocs;
}

export const getTbaMatch = async (inRecord) => { //Get corresponding tbaMatch for given record
  let currObj = deepcopy(inRecord);
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
  let tbaMatchCollection = (await Db.getTbaMatches());
  let tbaKey = TbaKey.getKey();
  let requestConfig = {
    url: '/match/' + key,
    baseURL: Config.tbaUrl,
    headers: {
      'X-TBA-Auth-Key': tbaKey
    }
  };
  let prevDoc = (await tbaMatchCollection.findOne({key: key}).exec());
  if(prevDoc !== null) {
    requestConfig.headers['If-Modified-Since'] = moment.unix(prevDoc.lastModified).toDate().toGMTString();
  }
  try {
    let response = (await axios.request(requestConfig));
    if(response.status === 200) {
      let lastModified = moment(response.headers['last-modified']).unix();
      let currObj = deepcopy(response.data);
      //WIP
    }
  }
  catch(err) {
    return {};
  }
}
*/
