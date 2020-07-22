import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import QRSendData from 'uiTree/Main/Transfer/QRTransfer/QRSendData';
import QRReceiveData from 'uiTree/Main/Transfer/QRTransfer/QRReceiveData';

class QRTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'send',
      redirect: false
    };
    if(typeof this.props.location !== 'undefined' && typeof this.props.location.pathname === 'string' && this.props.location.pathname.includes('/transfer/qrcode')) {
      if(this.props.location.pathname.includes('/transfer/qrcode/receive')) {
        this.state.tab = 'receive';
      }
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
          <Redirect push to={'/transfer/qrcode/' + this.state.tab} />
        :
          <></>
        }
        <Box mb={2}>
          <Tabs
            value={this.state.tab}
            onChange={this.tabHandler.bind(this)}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            style={{
              marginBottom: '2vh'
            }}
          >
            <Tab label='Send' value='send' />
            <Tab label='Receive' value='receive' />
          </Tabs>
        </Box>
        <Route exact path='/transfer/qrcode'><Redirect push to='/transfer/qrcode/send' /></Route>
        <Route exact path='/transfer/qrcode/send' component={QRSendData} />
        <Route exact path='/transfer/qrcode/receive' component={QRReceiveData} />
      </>
    );
  }
}

const QRTransferWithRouter = withRouter(QRTransfer);
export default QRTransferWithRouter;
