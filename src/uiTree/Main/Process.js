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
    this.routeHandler = this.routeHandler.bind(this);
    window.addEventListener('hashchange', this.routeHandler);
  }
  routeHandler() {
    if(typeof this.props.location !== 'undefined' && typeof this.props.location.pathname === 'string' && this.props.location.pathname.includes('/process')) {
      if(this.props.location.pathname.includes('/process/execute')) {
        this.setState({ tab: 'execute', redirect: false });
      }
      else {
        this.setState({ tab: 'edit', redirect: false });
      }
    }

  }
  tabHandler(event, value) {
    this.setState({ tab: value, redirect: true });
  }
  componentDidMount() {
    this.routeHandler();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.redirect) {
      this.setState({ redirect: false });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.routeHandler);
  }
  render() {
    return (
      <>
        {this.state.redirect ?
          <Redirect push to={'/process/' + this.state.tab} />
        :
          <></>
        }
        <Route exact path='/process'><Redirect push to='/process/edit' /></Route>
        <Route path='/process/edit' component={Edit} />
        <Route path='/process/execute' component={Execute} />
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
