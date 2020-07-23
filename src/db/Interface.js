import * as Db from 'db/Db';

var deepcopy = require('deep-copy');
var moment = require('moment');

//==================================Team==================================\\
export const insertTeam = async (inTeam) => {
  var teamCollection = (await Db.getTeams());
  var currObj = deepcopy(inTeam);
  var prevDoc = (await teamCollection.findOne({key: currObj.key}).exec());
  if(prevDoc === null) {
    return (await teamCollection.insert(currObj));
  }
  else {
    return (await prevDoc.update({$set: currObj}));
  }
}

export const insertTbaTeam = async (inTeam) => {
  var teamCollection = (await Db.getTeams());
  var currObj = {};
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

  var prevDoc = (await teamCollection.findOne({key: currObj.key}).exec());
  if(prevDoc === null) {
    return (await teamCollection.insert(currObj));
  }
  else {
    delete currObj._rev;
    return (await prevDoc.update({$set: currObj}));
  }
}

export const getTeams = async (query, sort = []) => {
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

export const queryTeams = async (query, sort = []) => {
  var teamCollection = (await Db.getTeams());
  console.info('[Interface] Returning team query object');
  return teamCollection.find(query).sort(sort);
}

//==================================Record==================================\\
export const insertRecord = async (inRecord) => {
  var recordCollection = (await Db.getRecords());
  var currObj = deepcopy(inRecord);
  var oldEventLog = deepcopy(currObj.eventLog);
  var oldPositionLog = deepcopy(currObj.positionLog);
  currObj.eventLog = oldEventLog.map((e) => {return JSON.stringify(e)});
  currObj.positionLog = oldPositionLog.map((e) => {return JSON.stringify(e)});
  var prevDoc = (await recordCollection.findOne({id: currObj.id}).exec());

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
  var recordCollection = (await Db.getRecords());
  var doc = (await recordCollection.findOne(query).exec());
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

export const subscribeRecords = async (query, sort = [], onChange = () => {}) => {
  var recordCollection = (await Db.getRecords());
  console.info('[Interface] Returning records query subscription');
  return recordCollection.find(query).sort(sort).$.subscribe((docs) => {
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
    onChange(newDocs);
  });
}

export const queryRecords = async (query, sort = []) => {
  var recordCollection = (await Db.getRecords());
  console.info('[Interface] Returning record query object');
  return recordCollection.find(query).sort(sort);
}

//==================================Process==================================\\
export const insertProcess = async (inProcess) => {
  var processCollection = (await Db.getProcesses());
  var currObj = deepcopy(inProcess);
  var prevDoc = (await processCollection.findOne({id: currObj.id}).exec());

  if(prevDoc === null || typeof prevDoc.lastModified === 'undefined') {
    if(!currObj.metadata) {
      currObj.metadata = {
        verified: false,
        safe: false
      };
    }
    return (await processCollection.insert(currObj));
  }
  else if (prevDoc.lastModified < currObj.lastModified) {
    delete currObj._rev;
    return (await prevDoc.update({$set: currObj}));
  }
  else {
    return null;
  }
}

export const removeProcess = async (query) => {
  var processCollection = (await Db.getProcesses());
  var doc = (await processCollection.findOne(query).exec());
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

export const subscribeProcesses = async (query, sort = [], onChange = () => {}) => {
  var processCollection = (await Db.getProcesses());
  console.info('[Interface] Returning process query subscription');
  return processCollection.find(query).sort(sort).$.subscribe((docs) => {
    var newDocs = [];
    for(var i = 0;i < docs.length;i++) {
      var currObj = deepcopy(docs[i].toJSON());
      delete currObj._rev;
      newDocs.push(currObj);
    }
    onChange(newDocs);
  });
}

export const queryProcesses = async (query, sort = []) => {
  var processCollection = (await Db.getProcesses());
  console.info('[Interface] Returning process query object');
  return processCollection.find(query).sort(sort);
}

//==================================Event==================================\\
export const insertEvent = async (inEvent) => {
  var eventCollection = (await Db.getEvents());
  var currObj = deepcopy(inEvent);
  var prevDoc = (await eventCollection.findOne({key: currObj.key}).exec());
  if(prevDoc === null) {
    return (await eventCollection.insert(currObj));
  }
  else {
    return (await eventCollection.update({$set: currObj}));
  }
}

export const insertTbaEvent = async (inEvent) => {
  var eventCollection = (await Db.getEvents());
  var currObj = {};
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

  var prevDoc = (await eventCollection.findOne({key: currObj.key}).exec());
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
  var eventCollection = (await Db.getEvents());
  var docs = (await eventCollection.find(query).sort(sort).exec());
  var newDocs = [];
  for(var i = 0;i < docs.length;i++) {
    var currObj = deepcopy(docs[i].toJSON());
    delete currObj._rev;
    newDocs.push(currObj);
  }
  console.info('[Interface] Returning event query');
  return newDocs;
}

export const queryEvents = async (query, sort = []) => {
  var eventCollection = (await Db.getEvents());
  console.info('[Interface] Returning event query object');
  return eventCollection.find(query).sort(sort);
}

/* WIP
export const getTbaRecords = async (query, sort = []) => {
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
    url: '/match/' + key,
    baseURL: Config.tbaUrl,
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
*/
