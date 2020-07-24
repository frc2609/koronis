import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Config from 'config/Config';

import CssBaseline from '@material-ui/core/CssBaseline';

import FullscreenModal from 'uiTree/FullscreenModal';
import GlobalTrigger from 'uiTree/GlobalTrigger';
import MainAppBar from 'uiTree/MainAppBar';
import Main from 'uiTree/Main';

export default class App extends React.Component {
  render() {
    return (
      <div style={{flexGrow: 1}}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <BrowserRouter basename={Config.baseUrl} >
            <FullscreenModal />
            <GlobalTrigger />
            <MainAppBar />
            <Main />
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}
