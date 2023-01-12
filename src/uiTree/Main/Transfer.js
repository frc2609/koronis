import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CropFreeIcon from '@material-ui/icons/CropFree';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import ShareIcon from '@material-ui/icons/Share';

import QRTransfer from 'uiTree/Main/Transfer/QRTransfer';
import AudioTransferWithRouter from 'uiTree/Main/Transfer/AudioTransfer';
import ShareData from 'uiTree/Main/Transfer/ShareData';

class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'qrcode',
      redirect: false
    };
    this.routeHandler = this.routeHandler.bind(this);
    window.addEventListener('hashchange', this.routeHandler);
  }
  routeHandler() {
    if(typeof this.props.location !== 'undefined' && typeof this.props.location.pathname === 'string' && this.props.location.pathname.includes('/transfer')) {
      if(this.props.location.pathname.includes('/transfer/audio')) {
        this.setState({ tab: 'audio', redirect: false });
      }
      else if(this.props.location.pathname.includes('/transfer/share')) {
        this.setState({ tab: 'share', redirect: false });
      }
      else {
        this.setState({ tab: 'qrcode', redirect: false });
      }
    }
  }
  tabHandler(event, value) {
    this.setState({tab: value, redirect: true});
  }
  componentDidMount() {
    this.routeHandler();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.redirect) {
      this.setState({redirect: false});
    }
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.routeHandler);
  }
  render() {
    return (
      <>
        {this.state.redirect ?
          <Redirect push to={'/transfer/' + this.state.tab} />
        :
          <></>
        }
        <Route exact path='/transfer'><Redirect push to='/transfer/qrcode' /></Route>
        <Route path='/transfer/qrcode' component={QRTransfer} />
        <Route path='/transfer/audio' component={AudioTransferWithRouter} />
        <Route path='/transfer/share' component={ShareData} />
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
            <BottomNavigationAction label='QR Code' value='qrcode' icon={<CropFreeIcon />} />
            <BottomNavigationAction label='Audio' value='audio' icon={<GraphicEqIcon />} />
            <BottomNavigationAction label='Share' value='share' icon={<ShareIcon />} />
          </BottomNavigation>
        </Paper>
      </>
    );
  }
}

const TransferWithRouter = withRouter(Transfer);
export default TransferWithRouter;
