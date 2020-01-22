import React from 'react';

import * as Interface from 'db/Interface';
import recordSerializerWorker from 'workerize-loader!engine/worker/RecordSerializer'; // eslint-disable-line import/no-webpack-loader-syntax

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

import SendRecords from 'engine/transfer/SendString';
import RecieveRecords from 'engine/transfer/RecieveString';

var recordSerializerInstance = recordSerializerWorker();

export default class TransferHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'sending',
      selectedRecordsStr: ''
    }
  }
  tabHandler(event, value) {
    this.setState({tab: value});
  }
  componentDidMount() {
    if(this.props.selectedRecords.length > 0) {
      recordSerializerInstance.serializeRecords(this.props.selectedRecords, true, true).then((encoded) => {
        this.setState({selectedRecordsStr: encoded});
      });
    }
  }
  onClose() {
    if(typeof this.props.onClose == 'function') {this.props.onClose();}
  }
  onScanned(data) {
    recordSerializerInstance.serializeRecords(data, false, true).then((decoded) => {
      for(var i = 0;i < decoded.length;i++) {
        Interface.insertRecord(decoded[i]);
      }
    });
  }
  render() {
    return (
      <>
      <Container>
        <Card>
        <Tabs
      value={this.state.tab}
      onChange={this.tabHandler.bind(this)}
      indicatorColor='primary'
      textColor='primary'
      variant='fullWidth'
      style={{marginBottom: '4vh'}}
        >
          <Tab label='Send' value='sending' />
          <Tab label='Recieve' value='recieving' />
        </Tabs>
        {this.state.tab == 'sending' ?
         <SendRecords ref='sendRecords' targetString={this.state.selectedRecordsStr} /> :
         <RecieveRecords ref='recieveRecords' onFinish={this.onScanned.bind(this)} />
        }
        </Card>
      </Container>
      <Fab color='primary' onClick={this.onClose.bind(this)} style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px'}}
      >
      <CloseIcon />
      </Fab>
      </>
    );
  }
}
