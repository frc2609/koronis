import firebase from 'auth/Firebase';

export const verifyProcess = async (process) => {
  var verifyProcessFirebase = firebase.functions().httpsCallable('verify-verifyProcess');
  return (await verifyProcessFirebase(process)).data.isValid;
}

export const verifyRecord = async (record) => {
  var verifyRecordFirebase = firebase.functions().httpsCallable('verify-verifyRecord');
  return (await verifyRecordFirebase(record)).data.isValid;
}
