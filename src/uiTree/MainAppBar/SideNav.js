import React from 'react';
import { Link } from 'react-router-dom';
import * as Config from 'Config';

import Drawer from '@material-ui/core/Drawer';

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {return (
    <div>
    <Drawer open={this.props.menuState} onClose={this.props.onMenuClose}>
      <Link to='/'>Home</Link>
      <Link to='/record'>Record</Link>
    </Drawer>
    </div>
  );}
}
