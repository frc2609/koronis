import React from 'react';
import { Route } from 'react-router-dom';
import * as Config from 'Config';

import Home from 'uiTree/Main/Home';
import Record from 'uiTree/Main/Record';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {return (
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/record' component={Record} />
    </div>
  );}
}
