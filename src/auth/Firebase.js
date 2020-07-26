import * as firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

var firebaseConfig = {
  apiKey: 'AIzaSyDZWG3KLryn_4wIOCXf7SgJJPItFwSBW6Q',
  authDomain: 'koronis-scouting-system.firebaseapp.com',
  databaseURL: 'https://koronis-scouting-system.firebaseio.com',
  projectId: 'koronis-scouting-system',
  storageBucket: 'koronis-scouting-system.appspot.com',
  messagingSenderId: '126655417134',
  appId: '1:126655417134:web:0b05a039f985a82efe48bf',
  measurementId: 'G-62Y7LD3Y72'
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
