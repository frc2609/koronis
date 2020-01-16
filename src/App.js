import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import * as Worker from 'engine/worker/EngineDriver';
import * as Database from 'db/Db';
import Config from 'Config';

import FullscreenModal from 'uiTree/FullscreenModal';
import MainAppBar from 'uiTree/MainAppBar';
import Main from 'uiTree/Main';

import 'App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {return (
    <div className='App' style={{
      flexGrow: 1
    }}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <CssBaseline />
        <BrowserRouter basename={Config.baseUrl} >
          <FullscreenModal />
          <MainAppBar title='KSS'/>
          <Main />
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </div>
  );}
}
