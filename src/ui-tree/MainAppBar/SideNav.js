import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {return (
    <div>
    <Drawer open={this.props.menuState} onClose={this.props.onMenuClose}>
      This is a Test
    </Drawer>
    </div>
  );}
}
