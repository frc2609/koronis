import React from 'react';
import { Route } from 'react-router-dom';

import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import Home from 'uiTree/Main/Home';
import Record from 'uiTree/Main/Record';
import ProcessWithRouter from 'uiTree/Main/Process';
import AnalyzeWithRouter from 'uiTree/Main/Analyze';
import TransferWithRouter from 'uiTree/Main/Transfer';

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
    disableBodyScroll(this.refs.bodyElem);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
    clearAllBodyScrollLocks();
  }
  render() {
    return (
      <div ref='bodyElem'>
        <Route exact path='/' component={Home} />
        <Route exact path='/record' component={Record} />
        <Route path='/process' component={ProcessWithRouter} />
        <Route path='/analyze' component={AnalyzeWithRouter} />
        <Route path='/transfer' component={TransferWithRouter} />
      </div>
    );
  }
}
