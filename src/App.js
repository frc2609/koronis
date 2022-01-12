import React from 'react';
import { HashRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';

import * as Color from 'config/Color';
import Config from 'config/Config';

import CssBaseline from '@material-ui/core/CssBaseline';

import FullscreenModal from 'uiTree/FullscreenModal';
import GlobalTrigger from 'uiTree/GlobalTrigger';
import MainAppBar from 'uiTree/MainAppBar';
import Main from 'uiTree/Main';

const store = require('store');

export default class App extends React.Component {
  render() {
    return (
      <div style={{flexGrow: 1}}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <HashRouter basename={Config.baseUrl} >
            <ThemeProvider theme={Color.getTheme(store.get('settings/theme/darkMode') === 'true')}>
            <FullscreenModal />
            <GlobalTrigger />
            <MainAppBar />
            <Main />
            </ThemeProvider>
          </HashRouter>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}
