import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as Worker from 'engine/worker/EngineDriver';
import * as Database from 'db/Db';
import * as Config from 'Config';

import MainAppBar from "uiTree/MainAppBar";
import Main from "uiTree/Main";

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
      <CssBaseline />
      <BrowserRouter basename={Config.baseUrl} >
        <MainAppBar title='KSS'/>
        <Main />
      </BrowserRouter>
    </div>
  );}
}
