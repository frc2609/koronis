import RxDB from 'rxdb';
import { teamSchema } from 'db/schema/team';
import { recordSchema } from 'db/schema/record';
import { processSchema } from 'db/schema/process';

RxDB.plugin(require('pouchdb-adapter-idb'));

var dbCreated = null;
var teamCollection = null;
var recordCollection = null;
var processCollection = null;

const createDb = async () => {
  const db = await RxDB.create({name: 'local', adapter: 'idb'});
  console.log('[Db] created database');
  return db;
};

const createTeamCollection = async () => {
  if(!dbCreated) {
    dbCreated = await createDb();
  }
  teamCollection = await dbCreated.collection({
    name: 'teams',
    schema: teamSchema
  });
  console.log('[Db] created collection teams');
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
  console.log('[Db] created collection records');
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
  console.log('[Db] created collection processes');
  return processCollection;
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
