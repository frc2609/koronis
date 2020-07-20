import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AudioSendData from 'uiTree/Main/Transfer/AudioTransfer/AudioSendData';
import AudioReceiveData from 'uiTree/Main/Transfer/AudioTransfer/AudioReceiveData';

class AudioTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'send',
      redirect: false
    };
    if(typeof this.props.location !== 'undefined' && typeof this.props.location.pathname === 'string' && this.props.location.pathname.includes('/transfer/audio')) {
      if(this.props.location.pathname.includes('/transfer/audio/receive')) {
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
          <Redirect push to={'/transfer/audio/' + this.state.tab} />
        :
          <></>
        }
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
        <Route exact path='/transfer/audio'><Redirect push to='/transfer/audio/send' /></Route>
        <Route exact path='/transfer/audio/send' component={AudioSendData} />
        <Route exact path='/transfer/audio/receive' component={AudioReceiveData} />
      </>
    );
  }
}

const AudioTransferWithRouter = withRouter(AudioTransfer);
export default AudioTransferWithRouter;
