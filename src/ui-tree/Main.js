import React from 'react';
import { Route } from 'react-router-dom';

import Home from 'ui-tree/Main/Home';
import Record from 'ui-tree/Main/Record';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/record" component={Record} />
    </div>
  );}
}
