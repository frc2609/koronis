import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import GroupIcon from '@material-ui/icons/Group';

import AnalyzeRecord from 'uiTree/Main/Analyze/AnalyzeRecord';

class Analyze extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'record',
      redirect: false
    };
    if(typeof this.props.location !== 'undefined' && typeof this.props.location.pathname === 'string' && this.props.location.pathname.includes('/analyze/')) {
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
      <div>
        {this.state.redirect ? <Redirect push to={'/analyze/' + this.state.tab} /> : ''}
        <Route exact path='/analyze' component={AnalyzeRecord} />
        <Route exact path='/analyze/record' component={AnalyzeRecord} />
        <Route exact path='/analyze/team' component={AnalyzeRecord} />
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
            <BottomNavigationAction label='Team' disabled value='team' icon={<GroupIcon />} />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

const AnalyzeWithRouter = withRouter(Analyze);
export default AnalyzeWithRouter;
