import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import EngineDriver from 'engine/EngineDriver';

import MainAppBar from "uiTree/MainAppBar";
import Main from "uiTree/Main";

import 'App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

const engineDriver = new EngineDriver();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ed: engineDriver};
  }
  render() {return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
        <MainAppBar ed={this.state.ed} title="KSS"/>
        <Main ed={this.state.ed}/>
      </BrowserRouter>
    </div>
  );}
}
