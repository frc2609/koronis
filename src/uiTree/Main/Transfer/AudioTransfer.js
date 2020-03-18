import React from 'react';

import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AudioSendData from 'uiTree/Main/Transfer/AudioTransfer/AudioSendData';
import AudioReceiveData from 'uiTree/Main/Transfer/AudioTransfer/AudioReceiveData';

export default class AudioTransfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'send'
    };
  }
  render() {
    return (
      <Container>
        <Tabs
          value={this.state.tab}
          onChange={(e, v) => {this.setState({tab: v})}}
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
        {this.state.tab === 'send' ?
          <AudioSendData />
        :
          <AudioReceiveData />
        }
      </Container>
    );
  }
}
