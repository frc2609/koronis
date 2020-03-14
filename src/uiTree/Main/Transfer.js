import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import ShareIcon from '@material-ui/icons/Share';

import SendData from 'uiTree/Main/Transfer/SendData';
import ReceiveData from 'uiTree/Main/Transfer/ReceiveData';
import ShareData from 'uiTree/Main/Transfer/ShareData';

class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'send',
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
      <>
        {this.state.redirect ?
          <Redirect push to={'/transfer/' + this.state.tab} />
        :
          ''
        }
        <Route exact path='/transfer' component={SendData} />
        <Route exact path='/transfer/send' component={SendData} />
        <Route exact path='/transfer/receive' component={ReceiveData} />
        <Route exact path='/transfer/share' component={ShareData} />
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
            <BottomNavigationAction label='Send' value='send' icon={<PublishIcon />} />
            <BottomNavigationAction label='Receive' value='receive' icon={<GetAppIcon />} />
            <BottomNavigationAction label='Share' value='share' icon={<ShareIcon />} />
          </BottomNavigation>
        </Paper>
      </>
    );
  }
}

const TransferWithRouter = withRouter(Transfer);
export default TransferWithRouter;
