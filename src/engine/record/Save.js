import * as User from 'auth/User';
import * as Interface from 'db/Interface';
import { positionLogCompressorInstance } from 'engine/worker/WorkerInstances';

export const saveRecord = async (gameStateDefinition, matchState, engineState, eventLog, positionLog) => {
  try {
    let obj = {};
    obj.startDate = (matchState.matchStartDate === 0 ? (engineState.startDate === 0 ? Math.round((new Date())/1000) : Math.round(engineState.startDate/1000)) : Math.round(matchState.matchStartDate/1000));
    obj.id = User.genRecordUuid(
      gameStateDefinition.gameState.year,
      gameStateDefinition.gameState.versionNumber,
      obj.startDate,
      matchState.matchNumber,
      matchState.matchType,
      matchState.targetTeamNumber
    );
    obj.year = gameStateDefinition.gameState.year;
    obj.version = gameStateDefinition.gameState.versionNumber;
    obj.teamNumber = matchState.targetTeamNumber;
    obj.matchNumber = matchState.matchNumber;
    obj.matchType = matchState.matchType;
    obj.isRedAlliance = matchState.isRed;
    obj.comments = matchState.comments;
    obj.user = User.getUserId();
    obj.device = User.getFingerprint();
    obj.lastModified = Math.round((Date.now())/1000);
    try {
      obj.digitalSignature = await User.genRecordDS(
        gameStateDefinition.gameState.year,
        gameStateDefinition.gameState.versionNumber,
        matchState.matchStartDate,
        matchState.matchNumber,
        matchState.matchType,
        matchState.targetTeamNumber,
        eventLog,
        positionLog
      );
    }
    catch(err) {
      console.info('Secret key is not available. Login is needed.');
      console.error(err);
      obj.digitalSignature = '';
    }
    obj.changeLog = [{
      id: obj.id,
      user: obj.user,
      modificationTime: obj.lastModified
    }];
    obj.eventLog = eventLog;
    obj.positionLog = positionLog;
    obj.positionLog = await positionLogCompressorInstance.processPositionLog(obj.positionLog);
    obj.metadata = {
      verified: true,
      unModified: true
    };
    await Interface.insertRecord(obj);
    return true;
  }
  catch(err) {
    console.error(err);
    return false;
  }
}
