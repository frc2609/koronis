import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'typeface-roboto';

import App from './App';
import * as serviceWorker from './serviceWorker';

import * as DefaultSettings from 'config/DefaultSettings';
import * as Debug from 'config/Debug';
import * as Sync from 'sync/Sync';
import * as Db from 'db/Db';

DefaultSettings.setDefaults();
Debug.init();
Sync.init();
Db.init();
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
