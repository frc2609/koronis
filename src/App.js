import React from 'react';

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
      <MainAppBar title="Home"/>
      <Main />
    </div>
  );}
}
