import RxDB from 'rxdb';
import { teamSchema } from 'db/schema/team';

RxDB.plugin(require('pouchdb-adapter-idb'));

var dbCreated = null;
var teamCreated = null;

const createDb = async () => {
  console.log('[Db] creating database');
  const db = await RxDB.create({name: 'teams', adapter: 'idb'});
  console.log('[Db] created database');
  console.log(db);
  return db;
};

const createTeam = async () => {
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

export const teams = () => {
  if(!teamCreated) {
    teamCreated = createTeam();
  }
  return teamCreated;
}
