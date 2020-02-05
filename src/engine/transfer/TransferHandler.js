import React from 'react';

import * as Interface from 'db/Interface';
import recordSerializerWorker from 'workerize-loader!engine/worker/RecordSerializer'; // eslint-disable-line import/no-webpack-loader-syntax

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

import SendString from 'engine/transfer/SendString';
import RecieveString from 'engine/transfer/RecieveString';
import ShareString from 'engine/transfer/ShareString';

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
    if(typeof this.props.onClose === 'function') {this.props.onClose();}
  }
  onScanned(data) {
    recordSerializerInstance.serializeRecords(data, false, true).then((decoded) => {
      for(var i = 0;i < decoded.length;i++) {
        Interface.insertRecord(decoded[i]);
      }
    });
  }
  onImport(data) {
    if(typeof data === 'array') {
      for(var i = 0;i < data.length;i++) {
        Interface.insertRecord(data[i]);
      }
    }
    else {
      Interface.insertRecord(data);
    }
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
          <Tab label='Share' value='sharing' />
        </Tabs>
        {
          this.state.tab === 'sending' ?
            <SendString targetString={this.state.selectedRecordsStr} /> :
            (
              this.state.tab === 'recieving' ?
                <RecieveString onFinish={this.onScanned.bind(this)} /> :
                <ShareString targetString={this.state.selectedRecordsStr} onFinish={this.onImport.bind(this)} />
            )
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
