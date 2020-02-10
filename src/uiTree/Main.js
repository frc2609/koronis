import React from 'react';
import { Route } from 'react-router-dom';

import Home from 'uiTree/Main/Home';
import Record from 'uiTree/Main/Record';
import Process from 'uiTree/Main/Process';
import Transfer from 'uiTree/Main/Transfer';

export default class Main extends React.Component {
  render() {return (
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/record' component={Record} />
      <Route exact path='/process' component={Process} />
      <Route exact path='/transfer' component={Transfer} />
    </div>
  );}
}
