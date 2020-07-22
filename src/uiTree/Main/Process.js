import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EditIcon from '@material-ui/icons/Edit';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import Edit from 'uiTree/Main/Process/Edit';
import Execute from 'uiTree/Main/Process/Execute';

class Process extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'edit',
      redirect: false
    };
    if(typeof this.props.location !== 'undefined' && typeof this.props.location.pathname === 'string' && this.props.location.pathname.includes('/process/')) {
      this.state.tab = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1);
    }
  }
  tabHandler(event, value) {
    this.setState({tab: value, redirect: true});
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.redirect) {
      this.setState({redirect: false});
    }
  }
  render() {
    return (
      <>
        {this.state.redirect ?
          <Redirect push to={'/process/' + this.state.tab} />
        :
          <></>
        }
        <Route exact path='/process' component={Edit} />
        <Route exact path='/process/edit' component={Edit} />
        <Route exact path='/process/execute' component={Execute} />
        <BottomNavigation style={{backgroundColor: 'rgba(0,0,0,0)'}} />
        <Paper
          square
          elevation={4}
          style={{
            position: 'fixed',
            bottom: '0px',
            width: '100%',
            zIndex: 100
          }}
        >
          <BottomNavigation
            value={this.state.tab}
            onChange={this.tabHandler.bind(this)}
          >
            <BottomNavigationAction label='Edit' value='edit' icon={<EditIcon />} />
            <BottomNavigationAction label='Execute' value='execute' icon={<PlayArrowIcon />} />
          </BottomNavigation>
        </Paper>
      </>
    );
  }
}

const ProcessWithRouter = withRouter(Process);
export default ProcessWithRouter;
