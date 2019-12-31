import RxDB from 'rxdb';
import { teamSchema } from 'db/schema/team';
import { recordSchema } from 'db/schema/record';

RxDB.plugin(require('pouchdb-adapter-idb'));

var dbCreated = null;
var teamCollection = null;
var recordCollection = null;

const createDb = async () => {
  console.log('[Db] creating database');
  const db = await RxDB.create({name: 'local', adapter: 'idb'});
  console.log('[Db] created database');
  return db;
};

const createTeamCollection = async () => {
  if(!dbCreated) {
    dbCreated = await createDb();
  }
  console.log('[Db] creating collection teams');
  const teamCollection = await dbCreated.collection({
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
  console.log('[Db] creating collection teams');
  const recordCollection = await dbCreated.collection({
    name: 'records',
    schema: recordSchema
  });
  console.log('[Db] created collection teams');
  return recordCollection;
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
