import firebase from 'auth/Firebase';

export const verifyProcess = async (process) => {
  if(navigator.onLine) {
    let verifyProcessFirebase = firebase.functions().httpsCallable('verify-verifyProcess');
    return (await verifyProcessFirebase(process)).data.isValid;
  }
  return false;
}

export const verifyRecord = async (record) => {
  if(navigator.onLine) {
    let verifyRecordFirebase = firebase.functions().httpsCallable('verify-verifyRecord');
    return (await verifyRecordFirebase(record)).data.isValid;
  }
  return false;
}
