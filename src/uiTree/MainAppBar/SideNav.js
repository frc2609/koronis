import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Home, FiberManualRecord, Code, Assessment } from '@material-ui/icons';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuBookIcon from '@material-ui/icons/MenuBook';

import SectionLink from 'uiTree/MainAppBar/SectionLink';

export default class SideNav extends React.Component {
  render() {
    return (
      <Drawer open={this.props.menuState} onClose={this.props.closeMenuCallback}>
        <List>
          <SectionLink to='/' title='Home' icon={<Home />} closeMenuCallback={this.props.closeMenuCallback} />
          <SectionLink to='/record' title='Record' icon={<FiberManualRecord />} closeMenuCallback={this.props.closeMenuCallback} />
          <SectionLink to='/process' title='Process' icon={<Code />} closeMenuCallback={this.props.closeMenuCallback} />
          <SectionLink to='/analyze' title='Analyze' icon={<Assessment />} closeMenuCallback={this.props.closeMenuCallback} />
          <SectionLink to='/transfer' title='Transfer' icon={<SyncAltIcon />} closeMenuCallback={this.props.closeMenuCallback} />
          <SectionLink to='/wiki' title='Wiki' icon={<MenuBookIcon />} closeMenuCallback={this.props.closeMenuCallback} />
          <SectionLink to='/settings' title='Settings' icon={<SettingsIcon />} closeMenuCallback={this.props.closeMenuCallback} />
        </List>
      </Drawer>
    );
  }
}
