import { createRxDatabase, removeRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

import Config from 'config/Config';

import { teamSchema } from 'db/schema/team';
import { recordSchema } from 'db/schema/record';
import { processSchema } from 'db/schema/process';
import { tbaMatchSchema } from 'db/schema/tbaMatch';
import { eventSchema } from 'db/schema/event';

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBUpdatePlugin);

let db = null;
let teamCollection = null;
let recordCollection = null;
let processCollection = null;
let tbaMatchCollection = null;
let eventCollection = null;

const createDb = async () => {
  db = await createRxDatabase({
    name: Config.environmentConfig,
    storage: getRxStorageDexie(),
    ignoreDuplicate: true
  });
  console.info('[DB] Created database');
  return db;
}

const catchOldSchema = async (inFunc) => {
  try {
    return await inFunc();
  }
  catch(err) {
    if(err.name.includes('RxError')) {
      await removeRxDatabase(Config.environmentConfig, getRxStorageDexie());
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
    teamCollection = await db.addCollections({
      teams: {
        schema: teamSchema
      }
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
    recordCollection = await db.addCollections({
      records: {
        schema: recordSchema
      }
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
    processCollection = await db.addCollections({
      processes: {
        schema: processSchema
      }
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
    tbaMatchCollection = await db.addCollections({
      tbamatches: {
        schema: tbaMatchSchema
      }
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
    eventCollection = await db.addCollections({
      events: {
        schema: eventSchema
      }
    });
  });
  console.info('[DB] Created collection events');
  return eventCollection;
}

export const getTeams = async () => {
  if(!teamCollection) {
    teamCollection = await createTeamCollection();
  }
  return teamCollection.teams;
}

export const getRecords = async () => {
  if(!recordCollection) {
    recordCollection = await createRecordCollection();
  }
  return recordCollection.records;
}

export const getProcesses = async () => {
  if(!processCollection) {
    processCollection = await createProcessCollection();
  }
  return processCollection.processes;
}

export const getTbaMatches = async () => {
  if(!tbaMatchCollection) {
    tbaMatchCollection = await createTbaMatchCollection();
  }
  return tbaMatchCollection.tbamatches;
}

export const getEvents = async () => {
  if(!eventCollection) {
    eventCollection = await createEventCollection();
  }
  return eventCollection.events;
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
  await removeRxDatabase(Config.environmentConfig, getRxStorageDexie());
  db = null;
  return null;
}
