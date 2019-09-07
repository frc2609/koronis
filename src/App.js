import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import MainAppBar from "ui-tree/MainAppBar";
import Main from "ui-tree/Main";

import 'App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class App extends React.Component {
  constructor(props) {
    super(props);
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
