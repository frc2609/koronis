import 'clientjs';

var store = require('store');
var uuid = require('uuid/v5');

export const getFingerprint = () => {
  var prevFingerprint = store.get('auth/user/fingerprint');
  var client = new ClientJS(); // eslint-disable-line no-undef
  if(typeof prevFingerprint === 'undefined') {
    prevFingerprint = client.getFingerprint();
    store.set('auth/user/fingerprint', prevFingerprint);
  }
  return prevFingerprint;
}

export const getUserId = () => {
  return '';
}

const genNamespace = (inYear, uuidType) => {
  return uuid((
    inYear.toString() +
    uuidType
  ), '3a9acfa0-4935-11ea-827d-25a7c6302437');
}

export const genRecordUuid = (inYear, inVersion, inMatchStartDate, inMatchNumber, inMatchType, inTeamNumber) => {
  var namespace = genNamespace(inYear, 'record');
  var tmpDate = (new Date());
  return uuid((
    inMatchStartDate.toString() +
    inMatchNumber.toString() +
    inMatchType +
    inTeamNumber +
    getFingerprint() +
    getUserId() +
    tmpDate
  ), namespace);
}

export const genDS = (inYear, inVersion, inMatchStartDate, inMatchNumber, inMatchType, inTeamNumber, inEventLog, inPositionLog) => {
  return '';
}
