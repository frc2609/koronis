import 'clientjs';

import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import fbapp from 'auth/Firebase';

let CryptoJS = require('crypto-js');
const store = require('store');
let { v5: uuid } = require('uuid');

export const getFingerprint = () => {
  let prevFingerprint = store.get('auth/user/fingerprint');
  if(typeof prevFingerprint === 'undefined') {
    let client = new ClientJS(); // eslint-disable-line no-undef
    prevFingerprint = client.getFingerprint();
    store.set('auth/user/fingerprint', prevFingerprint);
  }
  return prevFingerprint;
}

export const getUserId = () => {
  return getAuth(fbapp).currentUser ? getAuth(fbapp).currentUser.uid : '';
}

const genNamespace = (inYear, uuidType) => {
  return uuid((
    inYear.toString() +
    uuidType
  ), '3a9acfa0-4935-11ea-827d-25a7c6302437');
}

export const getSecret = async () => {
  let prevSecret = store.get('auth/user/secret');
  if(typeof prevFingerprint === 'undefined' && navigator.onLine) {
    prevSecret = await getDatabase(fbapp).ref('/secrets/' + getUserId()).once('value');
    store.set('auth/user/secret', prevSecret);
  }
  return prevSecret;
}

export const genRecordUuid = (inYear, inVersion, inMatchStartDate, inMatchNumber, inMatchType, inTeamNumber) => {
  let namespace = genNamespace(inYear, 'record');
  let tmpDate = (new Date());
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

export const genProcessUuid = (inYear, inQueryType, inDataType, inName, inTitle, inDescription, inFunction) => {
  let namespace = genNamespace(inYear, 'process');
  let tmpDate = (new Date());
  return uuid((
    inQueryType +
    inDataType +
    inName +
    inTitle +
    inDescription +
    inFunction +
    getFingerprint() +
    getUserId() +
    tmpDate
  ), namespace);
}

export const genRecordDS = async (inYear, inVersion, inMatchStartDate, inMatchNumber, inMatchType, inTeamNumber, inEventLog, inPositionLog) => {
  return CryptoJS.SHA3(getUserId() + String(inYear) + String(inVersion) + String(inMatchStartDate) + String(inMatchNumber) + inMatchType + inTeamNumber +
    JSON.stringify(inEventLog.sort((e1, e2) => {return e1.timeStamp - e2.timeStamp})) + JSON.stringify(inPositionLog.sort((e1, e2) => {return e1.timeStamp - e2.timeStamp})) +
    (await getSecret())
  ).toString(CryptoJS.enc.Base64);
}

export const genProcessDS = async (inYear, inQueryType, inDataType, inName, inTitle, inDescription, inFunction) => {
  return CryptoJS.SHA3(getUserId() + String(inYear) + inQueryType + inDataType + inName + inTitle + inDescription + inFunction +
    (await getSecret())
  ).toString(CryptoJS.enc.Base64);
}

getAuth(fbapp).onAuthStateChanged((user) => {
  if(user) {
    getSecret().then((val) => {
      console.info('[Auth] Got user secret key for digital signatures');
    });
  }
});

export const logout = async () => {
  store.remove('auth/user/secret');
  await getAuth(fbapp).signOut();
}
