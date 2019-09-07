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
  componentDidMount() {
    this.state.ed.requestHandler({
      engineComponentType: 'TestMessage',
      requestData: 'This should be replaced'
    }, (message) => {
      console.log('Got reply');
      console.log(message);
    });
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
