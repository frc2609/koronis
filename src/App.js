import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as Worker from 'engine/worker/EngineDriver';
import * as Database from 'db/Db';
import * as Package from 'package/PackageCollector';
import * as Config from 'Config';

import MainAppBar from "uiTree/MainAppBar";
import Main from "uiTree/Main";

import 'App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

Package.init();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    console.log(await Package.getByYear('2019'));
  }
  render() {return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter basename={Config.baseUrl} >
        <MainAppBar title="KSS"/>
        <Main />
      </BrowserRouter>
    </div>
  );}
}
