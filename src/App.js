import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import webWorkerDriver from 'engine/webWorkerDriver';

import MainAppBar from "ui-tree/MainAppBar";
import Main from "ui-tree/Main";

import 'App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

const engineWorkerDriver = new webWorkerDriver();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ewd: engineWorkerDriver};
  }
  componentDidMount() {

    this.state.ewd.postTestMessage();
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
