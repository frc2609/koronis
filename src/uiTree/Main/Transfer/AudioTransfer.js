import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AudioSendData from 'uiTree/Main/Transfer/AudioTransfer/AudioSendData';
import AudioReceiveData from 'uiTree/Main/Transfer/AudioTransfer/AudioReceiveData';
import MinVersion from 'uiTree/components/MinVersion';

class AudioTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'send',
      redirect: false
    };
    this.routeHandler = this.routeHandler.bind(this);
    window.addEventListener('hashchange', this.routeHandler);
  }
  routeHandler() {
    if(typeof this.props.location !== 'undefined' && typeof this.props.location.pathname === 'string' && this.props.location.pathname.includes('/transfer/audio')) {
      if(this.props.location.pathname.includes('/transfer/audio/receive')) {
        this.setState({ tab: 'receive', redirect: false });
      }
      else {
        this.setState({ tab: 'send', redirect: false });
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
      this.setState({redirect: false});
    }
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.routeHandler);
  }
  render() {
    return (
      <Container maxWidth='xl'>
        <Card>
          <Box mb={3}>
            {this.state.redirect ?
              <Redirect push to={'/transfer/audio/' + this.state.tab} />
            :
              <></>
            }
            <Box mb={3}>
              <Tabs
                value={this.state.tab}
                onChange={this.tabHandler.bind(this)}
                indicatorColor='primary'
                textColor='primary'
                variant='fullWidth'
              >
                <Tab label='Send' value='send' />
                <Tab label='Receive' value='receive' />
              </Tabs>
            </Box>
            <Route exact path='/transfer/audio'><Redirect push to='/transfer/audio/send' /></Route>
            <Route exact path='/transfer/audio/send' component={AudioSendData} />
            <Route exact path='/transfer/audio/receive' component={AudioReceiveData} />
          </Box>
          <Box mb={3} textAlign='center'>
            <MinVersion />
          </Box>
        </Card>
      </Container>
    );
  }
}

const AudioTransferWithRouter = withRouter(AudioTransfer);
export default AudioTransferWithRouter;
