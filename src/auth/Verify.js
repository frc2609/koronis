import firebase from 'auth/Firebase';

export const verifyProcess = async (process) => {
  let verifyProcessFirebase = firebase.functions().httpsCallable('verify-verifyProcess');
  return (await verifyProcessFirebase(process)).data.isValid;
}

export const verifyRecord = async (record) => {
  let verifyRecordFirebase = firebase.functions().httpsCallable('verify-verifyRecord');
  return (await verifyRecordFirebase(record)).data.isValid;
}
