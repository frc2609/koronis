import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { saveAs } from 'file-saver';
import { FilePond } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

const JSZip = require('jszip');
const fileDownload = require('js-file-download');
const deepcopy = require('deep-copy');
const moment = require('moment');

export default class ShareString extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleDownload: true
    }
  }
  onDownload() {
    let data = this.props.data;
    if(typeof data !== 'undefined') {
      let getRecordFilename = (tmpData) => {
        return tmpData.teamNumber + '_' + tmpData.matchType.toUpperCase() + tmpData.matchNumber + '_' + tmpData.year + '_' + tmpData.id + '.json';
      }
      let getProcessFilename = (tmpData) => {
        return tmpData.name.trim().replace(' ', '-').toLowerCase() + '_' + tmpData.queryType + '_' + tmpData.dataType + '_' + tmpData.year + '_' + tmpData.id + '.json';
      }

      if(this.state.singleDownload) {
        let tmpData = deepcopy(data);
        if(Array.isArray(data) && data.length === 1) {
          tmpData = deepcopy(data[0]);
        }
        let dataStr = JSON.stringify(tmpData); // eslint-disable-line no-redeclare

        if(Array.isArray(data) && data.length > 1) {
          let date = moment().toISOString(true);
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
        let zip = new JSZip();
        if(Array.isArray(data) && data.length > 1) {
          for(let i = 0;i < data.length;i++) {
            let tmpData = deepcopy(data[i]); // eslint-disable-line no-redeclare
            let dataStr = JSON.stringify(tmpData); // eslint-disable-line no-redeclare
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
            let date = moment().toISOString(true);
            saveAs(content, 'data_' + date + '.zip');
          });
        }
        else {
          let tmpData = {}; // eslint-disable-line no-redeclare
          if(Array.isArray(data) && data.length === 1) {
            tmpData = deepcopy(data[0]);
          }
          if(!Array.isArray(data) && typeof data === 'undefined') {
            tmpData = deepcopy(data);
          }
          let dataStr = JSON.stringify(tmpData); // eslint-disable-line no-redeclare

          if(typeof tmpData.eventLog !== 'undefined') {
            zip.file(getRecordFilename(tmpData), dataStr);
            zip.generateAsync({type:'blob'}).then((content) => {
              let date = moment().toISOString(true);
              saveAs(content, 'data_' + date + '.zip');
            });
          }
          else if(typeof tmpData.function !== 'undefined') {
            zip.file(getProcessFilename(tmpData), dataStr);
            zip.generateAsync({type:'blob'}).then((content) => {
              let date = moment().toISOString(true);
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
        let data = JSON.parse(val);
        if(typeof this.props.onUpload === 'function') {
          this.props.onUpload(data);
        }
        window.setTimeout(() => {
          this.filepond.removeFile(fileObj.id);
        }, 500);
      });
    }
    else {
      window.globalAlert('error', 'Failed to upload file!');
    }
  }
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align='left' variant='h6' gutterBottom>Export</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            color='primary'
            variant='contained'
            fullWidth
            onClick={this.onDownload.bind(this)}
            disabled={(Array.isArray(this.props.data) && this.props.data.length === 0) || typeof this.props.data === 'undefined'}
          >
            Download
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.singleDownload}
                    onChange={(e) => {
                      this.setState({singleDownload: e.target.checked});
                    }}
                    color='primary'
                  />
                }
                label='Download as single JSON File'
              />
            </FormGroup>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <Divider />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography align='left' variant='h6' gutterBottom>Import</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <FilePond
              ref={ref => this.filepond = ref}
              allowMultiple={true}
              allowRevert={false}
              onaddfile={this.onUpload.bind(this)}
              style={{marginBottom: '2vh'}}
            />
          </Box>
        </Grid>
      </Grid>
    );
  }
}
