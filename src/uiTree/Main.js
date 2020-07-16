import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import Home from 'uiTree/Main/Home';
import Record from 'uiTree/Main/Record';
import ProcessWithRouter from 'uiTree/Main/Process';
import AnalyzeWithRouter from 'uiTree/Main/Analyze';
import TransferWithRouter from 'uiTree/Main/Transfer';
import Settings from 'uiTree/Main/Settings';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.resizeListener = () => {};
  }
  componentDidMount() {
    this.resizeListener = () => {
      this.forceUpdate();
    };
    window.addEventListener('resize', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  render() {
    return (
      <div ref='bodyElem'>
        <Route exact path='/'>
          <Redirect push to='/home' />
        </Route>
        <Route path='/home' component={Home} />
        <Route path='/record' component={Record} />
        <Route path='/process' component={ProcessWithRouter} />
        <Route path='/analyze' component={AnalyzeWithRouter} />
        <Route path='/transfer' component={TransferWithRouter} />
        <Route path='/settings' component={Settings} />
      </div>
    );
  }
}
