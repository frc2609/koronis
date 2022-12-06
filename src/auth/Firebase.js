import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDZWG3KLryn_4wIOCXf7SgJJPItFwSBW6Q',
  authDomain: 'koronis-scouting-system.firebaseapp.com',
  databaseURL: 'https://koronis-scouting-system.firebaseio.com',
  projectId: 'koronis-scouting-system',
  storageBucket: 'koronis-scouting-system.appspot.com',
  messagingSenderId: '126655417134',
  appId: '1:126655417134:web:0b05a039f985a82efe48bf',
  measurementId: 'G-62Y7LD3Y72'
};

const fbapp = initializeApp(firebaseConfig);

export default fbapp;
