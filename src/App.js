import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as Engine from 'engine/EngineDriver';
import * as Database from 'db/Db';

import MainAppBar from "uiTree/MainAppBar";
import Main from "uiTree/Main";

import 'App.css';
import CssBaseline from '@material-ui/core/CssBaseline';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(Database.teams())
  }
  render() {return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        <MainAppBar title="KSS"/>
        <Main />
      </BrowserRouter>
    </div>
  );}
}
