import 'clientjs';

import firebase from 'auth/Firebase';

var CryptoJS = require('crypto-js');
var store = require('store');
var { v5: uuid } = require('uuid');

export const getFingerprint = () => {
  var prevFingerprint = store.get('auth/user/fingerprint');
  if(typeof prevFingerprint === 'undefined') {
    var client = new ClientJS(); // eslint-disable-line no-undef
    prevFingerprint = client.getFingerprint();
    store.set('auth/user/fingerprint', prevFingerprint);
  }
  return prevFingerprint;
}

export const getUserId = () => {
  return firebase.auth().currentUser ? firebase.auth().currentUser.uid : '';
}

const genNamespace = (inYear, uuidType) => {
  return uuid((
    inYear.toString() +
    uuidType
  ), '3a9acfa0-4935-11ea-827d-25a7c6302437');
}

export const getSecret = async () => {
  var prevSecret = store.get('auth/user/secret');
  if(typeof prevFingerprint === 'undefined') {
    prevSecret = await firebase.database().ref('/secrets/' + getUserId()).once('value');
    store.set('auth/user/secret', prevSecret);
  }
  return prevSecret;
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

export const genProcessUuid = (inYear, inQueryType, inDataType, inName, inTitle, inDescription, inFunction) => {
  var namespace = genNamespace(inYear, 'process');
  var tmpDate = (new Date());
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

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    getSecret().then((val) => {
      console.info('[Auth] Got user secret key for digital signatures');
    });
  }
});

export const logout = async () => {
  store.remove('auth/user/secret');
  await firebase.auth().signOut();
}
