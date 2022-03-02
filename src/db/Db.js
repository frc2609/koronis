import RxDB from 'rxdb';

import Config from 'config/Config';

import { teamSchema } from 'db/schema/team';
import { recordSchema } from 'db/schema/record';
import { processSchema } from 'db/schema/process';
import { tbaMatchSchema } from 'db/schema/tbaMatch';
import { eventSchema } from 'db/schema/event';

RxDB.plugin(require('pouchdb-adapter-idb'));

let db = null;
let teamCollection = null;
let recordCollection = null;
let processCollection = null;
let tbaMatchCollection = null;
let eventCollection = null;

const createDb = async () => {
  db = await RxDB.create({name: Config.environmentConfig, adapter: 'idb', ignoreDuplicate: true});
  console.info('[DB] Created database');
  return db;
}

const catchOldSchema = async (inFunc) => {
  try {
    return await inFunc();
  }
  catch(err) {
    if(err.name === 'RxError') {
      await RxDB.removeDatabase(Config.environmentConfig, 'idb');
      await createDb();
      return await catchOldSchema(inFunc);
    }
  }
}

const createTeamCollection = async () => {
  if(!db) {
    db = await createDb();
  }
  await catchOldSchema(async () => {
    teamCollection = await db.collection({
      name: 'teams',
      schema: teamSchema
    });
  });
  console.info('[DB] Created collection teams');
  return teamCollection;
}

const createRecordCollection = async () => {
  if(!db) {
    db = await createDb();
  }
  await catchOldSchema(async () => {
    recordCollection = await db.collection({
      name: 'records',
      schema: recordSchema
    });
  });
  console.info('[DB] Created collection records');
  return recordCollection;
}

const createProcessCollection = async () => {
  if(!db) {
    db = await createDb();
  }
  await catchOldSchema(async () => {
    processCollection = await db.collection({
      name: 'processes',
      schema: processSchema
    });
  });
  console.info('[DB] Created collection processes');
  return processCollection;
}

const createTbaMatchCollection = async () => {
  if(!db) {
    db = await createDb();
  }
  await catchOldSchema(async () => {
    tbaMatchCollection = await db.collection({
      name: 'tbamatches',
      schema: tbaMatchSchema
    });
  });
  console.info('[DB] Created collection tbaMatches');
  return tbaMatchCollection;
}

const createEventCollection = async () => {
  if(!db) {
    db = await createDb();
  }
  await catchOldSchema(async () => {
    eventCollection = await db.collection({
      name: 'events',
      schema: eventSchema
    });
  });
  console.info('[DB] Created collection events');
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
  let initPromises = [];
  initPromises.push(getTeams());
  initPromises.push(getRecords());
  initPromises.push(getProcesses());
  initPromises.push(getTbaMatches());
  initPromises.push(getEvents());
  await Promise.all(initPromises);
  return null;
}

export const clear = async () =>{
  await RxDB.removeDatabase(Config.environmentConfig, 'idb');
  db = null;
  return null;
}
