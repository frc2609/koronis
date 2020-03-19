import RxDB from 'rxdb';
import { teamSchema } from 'db/schema/team';
import { recordSchema } from 'db/schema/record';
import { processSchema } from 'db/schema/process';
import { tbaMatchSchema } from 'db/schema/tbaMatch';
import { eventSchema } from 'db/schema/event';

RxDB.plugin(require('pouchdb-adapter-idb'));

var dbCreated = null;
var teamCollection = null;
var recordCollection = null;
var processCollection = null;
var tbaMatchCollection = null;
var eventCollection = null;

const createDb = async () => {
  const db = await RxDB.create({name: 'local', adapter: 'idb', ignoreDuplicate: true});
  console.info('[Db] created database');
  return db;
}

const createTeamCollection = async () => {
  if(!dbCreated) {
    dbCreated = await createDb();
  }
  teamCollection = await dbCreated.collection({
    name: 'teams',
    schema: teamSchema
  });
  console.info('[Db] created collection teams');
  return teamCollection;
}

const createRecordCollection = async () => {
  if(!dbCreated) {
    dbCreated = await createDb();
  }
  recordCollection = await dbCreated.collection({
    name: 'records',
    schema: recordSchema
  });
  console.info('[Db] created collection records');
  return recordCollection;
}

const createProcessCollection = async () => {
  if(!dbCreated) {
    dbCreated = await createDb();
  }
  processCollection = await dbCreated.collection({
    name: 'processes',
    schema: processSchema
  });
  console.info('[Db] created collection processes');
  return processCollection;
}

const createTbaMatchCollection = async () => {
  if(!dbCreated) {
    dbCreated = await createDb();
  }
  tbaMatchCollection = await dbCreated.collection({
    name: 'tbamatches',
    schema: tbaMatchSchema
  });
  console.info('[Db] created collection tbaMatches');
  return tbaMatchCollection;
}

const createEventCollection = async () => {
  if(!dbCreated) {
    dbCreated = await createDb();
  }
  eventCollection = await dbCreated.collection({
    name: 'events',
    schema: eventSchema
  });
  console.info('[Db] created collection events');
  return eventCollection;
}

export const getTeams = async () => {
  if(!teamCollection) {
    teamCollection = await createTeamCollection();
  }
  return teamCollection;
}

export const getRecords = async () => {
  if(!recordCollection) {
    recordCollection = await createRecordCollection();
  }
  return recordCollection;
}

export const getProcesses = async () => {
  if(!processCollection) {
    processCollection = await createProcessCollection();
  }
  return processCollection;
}

export const getTbaMatches = async () => {
  if(!tbaMatchCollection) {
    tbaMatchCollection = await createTbaMatchCollection();
  }
  return tbaMatchCollection;
}

export const getEvents = async () => {
  if(!eventCollection) {
    eventCollection = await createEventCollection();
  }
  return eventCollection;
}

export const init = async () => {
  await getTeams();
  await getRecords();
  await getProcesses();
  await getTbaMatches();
  await getEvents();
  return null;
}
