import React from 'react';
import * as Config from 'Config';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Home, FiberManualRecord } from '@material-ui/icons';

import SectionLink from 'uiTree/MainAppBar/SectionLink';

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {return (
    <div>
      <Drawer open={this.props.menuState} onClose={this.props.closeMenuCallback}>
        <List>
          <SectionLink to='/' title='Home' icon={<Home />} closeMenuCallback={this.props.closeMenuCallback} />
          <SectionLink to='/record' title='Record' icon={<FiberManualRecord />} closeMenuCallback={this.props.closeMenuCallback} />
        </List>
      </Drawer>
    </div>
  );}
}
