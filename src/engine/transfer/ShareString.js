import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import { saveAs } from 'file-saver';
import { FilePond } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

var JSZip = require('jszip');
var fileDownload = require('js-file-download');
var deepcopy = require('deep-copy');

export default class ShareString extends React.Component {
  onDownload() {
    var data = this.props.data;
    if(typeof data !== 'undefined') {
      if(this.props.dataType === 'records' || this.props.dataType === 'record') {
        if(Array.isArray(data) && data.length > 1) {
          var zip = new JSZip();
          for(var i = 0;i < data.length;i++) {
            var tmpData = deepcopy(data[i]);
            delete tmpData._rev;
            var dataStr = JSON.stringify(tmpData);
            zip.file(tmpData.teamNumber + '_' + tmpData.matchType.toUpperCase() + tmpData.matchNumber + '_' + tmpData.year + '_' + tmpData.id + '.json', dataStr);
          }
          zip.generateAsync({type:'blob'}).then((content) => {
            var date = Date.now();
            saveAs(content, 'data_' + date + '.zip');
          });
        }
        else if(Array.isArray(data) && data.length === 1) {
          var tmpData = deepcopy(data[0]); // eslint-disable-line no-redeclare
          delete tmpData._rev;
          var dataStr = JSON.stringify(tmpData); // eslint-disable-line no-redeclare
          fileDownload(dataStr, tmpData.teamNumber + '_' + tmpData.matchType.toUpperCase() + tmpData.matchNumber + '_' + tmpData.year + '_' + tmpData.id + '.json');
        }
        else if(!Array.isArray(data) && typeof data === 'undefined') {
          var tmpData = deepcopy(data); // eslint-disable-line no-redeclare
          delete tmpData._rev;
          var dataStr = JSON.stringify(tmpData); // eslint-disable-line no-redeclare
          fileDownload(dataStr, tmpData.teamNumber + '_' + tmpData.matchType.toUpperCase() + tmpData.matchNumber + '_' + tmpData.year + '_' + tmpData.id + '.json');
        }
      }
    }
  }
  onUpload(error, fileObj) {
    if(!error) {
      fileObj.file.text().then((val) => {
        var data = JSON.parse(val);
        delete data._rev;
        if(typeof this.props.onUpload === 'function') {
          this.props.onUpload(data);
        }
        window.setTimeout(() => {
          this.filepond.removeFile(fileObj.id);
        }, 500);
      });
    }
  }
  render() {
    return (
      <Container>
        <Typography align='left' variant='h6' style={{marginBottom: '2vh'}}>Export</Typography>
        <Button
          color='primary'
          variant='contained'
          style={{marginBottom: '2vh', width: '100%'}}
          onClick={this.onDownload.bind(this)}
          disabled={(Array.isArray(this.props.data) && this.props.data.length === 0) || typeof this.props.data === 'undefined'}
        >
          Download
        </Button>
        <Divider style={{marginBottom: '2vh'}} />
        <Typography align='left' variant='h6' style={{marginBottom: '2vh'}}>Import</Typography>
        <FilePond
          ref={ref => this.filepond = ref}
          allowMultiple={true}
          allowRevert={false}
          onaddfile={this.onUpload.bind(this)}
          style={{marginBottom: '2vh'}}
        />
      </Container>
    );
  }
}
