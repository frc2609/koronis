import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'fontsource-roboto';

import App from './App';
import Splash from './Splash';

import * as DefaultSettings from 'config/DefaultSettings';
import * as Debug from 'config/Debug';
import * as Sync from 'sync/Sync';
import * as Db from 'db/Db';

DefaultSettings.setDefaults();
ReactDOM.render(<Splash />, document.getElementById('root'));
Debug.init();
Db.init().then(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
  Sync.init();
});
