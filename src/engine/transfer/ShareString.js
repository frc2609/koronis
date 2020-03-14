import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { saveAs } from 'file-saver';
import { FilePond } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

var JSZip = require('jszip');
var fileDownload = require('js-file-download');
var deepcopy = require('deep-copy');
var moment = require('moment');

export default class ShareString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleDownload: true
    }
  }
  onDownload() {
    var data = this.props.data;
    if(typeof data !== 'undefined') {
      var getRecordFilename = (tmpData) => {
        return tmpData.teamNumber + '_' + tmpData.matchType.toUpperCase() + tmpData.matchNumber + '_' + tmpData.year + '_' + tmpData.id + '.json';
      }
      var getProcessFilename = (tmpData) => {
        return tmpData.name.trim().replace(' ', '-').toLowerCase() + '_' + tmpData.queryType + '_' + tmpData.dataType + '_' + tmpData.year + '_' + tmpData.id + '.json';
      }

      if(this.state.singleDownload) {
        var tmpData = deepcopy(data);
        if(Array.isArray(data) && data.length === 1) {
          tmpData = deepcopy(data[0]);
        }
        var dataStr = JSON.stringify(tmpData); // eslint-disable-line no-redeclare

        if(Array.isArray(data) && data.length > 1) {
          var date = moment().toISOString(true);
          fileDownload(dataStr, 'data_' + date + '.json');
        }
        else {
          if(typeof tmpData.eventLog !== 'undefined') {
            fileDownload(dataStr, getRecordFilename(tmpData));
          }
          else if(typeof tmpData.function !== 'undefined') {
            fileDownload(dataStr, getProcessFilename(tmpData));
          }
        }
      }
      else {
        var zip = new JSZip();
        if(Array.isArray(data) && data.length > 1) {
          for(var i = 0;i < data.length;i++) {
            var tmpData = deepcopy(data[i]); // eslint-disable-line no-redeclare
            var dataStr = JSON.stringify(tmpData); // eslint-disable-line no-redeclare
            if(typeof tmpData.eventLog !== 'undefined') {
              zip.folder('records');
              zip.file('records/' + getRecordFilename(tmpData), dataStr);
            }
            else if(typeof tmpData.function !== 'undefined') {
              zip.folder('processes');
              zip.file('processes/' + getProcessFilename(tmpData), dataStr);
            }
          }
          zip.generateAsync({type:'blob'}).then((content) => {
            var date = moment().toISOString(true);
            saveAs(content, 'data_' + date + '.zip');
          });
        }
        else {
          var tmpData = {}; // eslint-disable-line no-redeclare
          if(Array.isArray(data) && data.length === 1) {
            tmpData = deepcopy(data[0]);
          }
          if(!Array.isArray(data) && typeof data === 'undefined') {
            tmpData = deepcopy(data);
          }
          var dataStr = JSON.stringify(tmpData); // eslint-disable-line no-redeclare

          if(typeof tmpData.eventLog !== 'undefined') {
            zip.file(getRecordFilename(tmpData), dataStr);
            zip.generateAsync({type:'blob'}).then((content) => {
              var date = moment().toISOString(true);
              saveAs(content, 'data_' + date + '.zip');
            });
          }
          else if(typeof tmpData.function !== 'undefined') {
            zip.file(getProcessFilename(tmpData), dataStr);
            zip.generateAsync({type:'blob'}).then((content) => {
              var date = moment().toISOString(true);
              saveAs(content, 'data_' + date + '.zip');
            });
          }
        }
      }
    }
  }
  onUpload(error, fileObj) {
    if(!error) {
      fileObj.file.text().then((val) => {
        var data = JSON.parse(val);
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
      <Container maxWidth='xl'>
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
        <FormGroup row>
          <FormControlLabel
            style={{marginBottom: '2vh'}}
            control={
              <Switch
                checked={this.state.singleDownload}
                onChange={(e) => {
                  this.setState({singleDownload: e.target.checked});
                }}
                color='primary'
              />
            }
            label='Download as JSON File'
          />
        </FormGroup>
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
