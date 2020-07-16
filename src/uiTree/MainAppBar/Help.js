import React from 'react';
import { Route } from 'react-router-dom';

import Home from 'uiTree/MainAppBar/Help/Home';
import Record from 'uiTree/MainAppBar/Help/Record';

export default class Help extends React.Component {
  render() {
    return (
      <>
        <Route exact path='/' component={Home} />
        <Route exact path='/record' component={Record} />
      </>
    );
  }
}
