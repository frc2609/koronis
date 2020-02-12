import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { FiberManualRecord, Code } from '@material-ui/icons';

import TransferRecord from 'uiTree/Main/Transfer/TransferRecord';
import TransferProcess from 'uiTree/Main/Transfer/TransferProcess';

class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'record',
      redirect: false
    };
    if(typeof this.props.location !== 'undefined' && typeof this.props.location.pathname === 'string' && this.props.location.pathname.includes('/transfer/')) {
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
        {this.state.redirect ? <Redirect push to={'/transfer/' + this.state.tab} /> : ''}
        <Route exact path='/transfer' component={TransferRecord} />
        <Route exact path='/transfer/record' component={TransferRecord} />
        <Route exact path='/transfer/process' component={TransferProcess} />
        <Paper
          variant='outlined'
          square
          elevation={3}
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
            <BottomNavigationAction label='Records' value='record' icon={<FiberManualRecord />} />
            <BottomNavigationAction  label='Processes' value='process' icon={<Code />} />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

const TransferWithRouter = withRouter(Transfer);
export default TransferWithRouter;
