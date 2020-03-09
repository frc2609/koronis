import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'typeface-roboto';

import App from './App';
import * as serviceWorker from './serviceWorker';

import * as Sync from 'sync/Sync';

Sync.init();

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
