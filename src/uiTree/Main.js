import React from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';

import Home from 'uiTree/Main/Home';
import RecordWithRouter from 'uiTree/Main/Record';
import ProcessWithRouter from 'uiTree/Main/Process';
import AnalyzeWithRouter from 'uiTree/Main/Analyze';
import TransferWithRouter from 'uiTree/Main/Transfer';
import WikiWithRouter from 'uiTree/Main/Wiki';
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
      <>
        <Paper
          square
          variant='outlined'
          style={{
            position: 'fixed',
            zIndex: -100,
            height: `${window.innerHeight}px`,
            width: `${window.innerWidth}px`,
            top: '0px',
            left: '0px'
          }}
        />
        <Switch>
          <Route exact path='/'><Redirect push to='/home' /></Route>
          <Route path='/home' component={Home} />
          <Route path='/record' component={RecordWithRouter} />
          <Route path='/process' component={ProcessWithRouter} />
          <Route path='/analyze' component={AnalyzeWithRouter} />
          <Route path='/transfer' component={TransferWithRouter} />
          <Route path='/wiki' component={WikiWithRouter} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </>
    );
  }
}
