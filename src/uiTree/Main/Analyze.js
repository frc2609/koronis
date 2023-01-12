import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import GroupIcon from '@material-ui/icons/Group';

import AnalyzeRecordWithRouter from 'uiTree/Main/Analyze/AnalyzeRecord';
import AnalyzeTeamWithRouter from 'uiTree/Main/Analyze/AnalyzeTeam';

class Analyze extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'record',
      redirect: false
    };
    this.routeHandler = this.routeHandler.bind(this);
    window.addEventListener('hashchange', this.routeHandler);
  }
  routeHandler() {
    if(typeof this.props.location !== 'undefined' && typeof this.props.location.pathname === 'string' && this.props.location.pathname.includes('/analyze/')) {
      if(this.props.location.pathname.includes('/analyze/team')) {
        this.setState({ tab: 'team', redirect: false });
      }
      else {
        this.setState({ tab: 'record', redirect: false });
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
          <Redirect push to={'/analyze/' + this.state.tab} />
        :
          <></>
        }
        <Route exact path='/analyze'><Redirect push to='/analyze/record' /></Route>
        <Route path='/analyze/record' component={AnalyzeRecordWithRouter} />
        <Route path='/analyze/team' component={AnalyzeTeamWithRouter} />
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
            <BottomNavigationAction label='Record' value='record' icon={<FiberManualRecordIcon />} />
            <BottomNavigationAction label='Team' value='team' icon={<GroupIcon />} />
          </BottomNavigation>
        </Paper>
      </>
    );
  }
}

const AnalyzeWithRouter = withRouter(Analyze);
export default AnalyzeWithRouter;
