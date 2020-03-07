import React from 'react';

import * as Interface from 'db/Interface';
import serializerWorker from 'workerize-loader!engine/worker/Serializer'; // eslint-disable-line import/no-webpack-loader-syntax

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

import SendString from 'engine/transfer/SendString';
import RecieveString from 'engine/transfer/RecieveString';
import ShareString from 'engine/transfer/ShareString';

var serializerInstance = new serializerWorker();

export default class TransferHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'sending',
      dataStr: ''
    }
  }
  tabHandler(event, value) {
    this.setState({tab: value});
  }
  componentDidMount() {
    if(typeof this.props.data !== 'undefined') {
      if(this.props.dataType === 'records') {
        if(Array.isArray(this.props.data) && this.props.data.length > 0) {
          serializerInstance.serializeRecords(this.props.data, true, true).then((encoded) => {
            this.setState({dataStr: encoded});
          });
        }
      }
      if(this.props.dataType === 'processes') {
        if(Array.isArray(this.props.data) && this.props.data.length > 0) {
          serializerInstance.serializeProcesses(this.props.data, true, true).then((encoded) => {
            this.setState({dataStr: encoded});
          });
        }
      }
    }
  }
  onClose() {
    if(typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }
  onScanned(inStr) {
    if(this.props.dataType === 'records') {
      serializerInstance.serializeRecords(inStr, false, true).then((decoded) => {
        for(var i = 0;i < decoded.length;i++) {
          Interface.insertRecord(decoded[i]);
        }
      });
    }
    if(this.props.dataType === 'processes') {
      serializerInstance.serializeProcesses(inStr, false, true).then((decoded) => {
        for(var i = 0;i < decoded.length;i++) {
          Interface.insertProcess(decoded[i]);
        }
      });
    }
  }
  onImport(data) {
    if(this.props.dataType === 'record' || this.props.dataType === 'records') {
      if(Array.isArray(data)) {
        for(var i = 0;i < data.length;i++) {
          Interface.insertRecord(data[i]);
        }
      }
      else {
        Interface.insertRecord(data);
      }
    }
    if(this.props.dataType === 'process' || this.props.dataType === 'processes') {
      if(Array.isArray(data)) {
        for(var i = 0;i < data.length;i++) { // eslint-disable-line no-redeclare
          Interface.insertProcess(data[i]);
        }
      }
      else {
        Interface.insertProcess(data);
      }
    }
  }
  render() {
    return (
      <>
        <Container maxWidth='xl'>
          <Card style={{marginBottom: '4vh'}}>
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
                <SendString targetString={this.state.dataStr} />
              : this.state.tab === 'recieving' ?
                <RecieveString onFinish={this.onScanned.bind(this)} />
              :
                <ShareString dataType={this.props.dataType} data={this.props.data} onUpload={this.onImport.bind(this)} />
            }
          </Card>
        </Container>
        <Fab color='primary' onClick={this.onClose.bind(this)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 110
          }}
        >
          <CloseIcon />
        </Fab>
      </>
    );
  }
}
