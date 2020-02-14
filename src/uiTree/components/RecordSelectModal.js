import React from 'react';

import * as Interface from 'db/Interface';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TocIcon from '@material-ui/icons/Toc';
import AppsIcon from '@material-ui/icons/Apps';
import { Close } from '@material-ui/icons';

import RecordSelect from 'uiTree/components/RecordSelect';
import RecordQueryBar from 'uiTree/components/RecordQueryBar';

export default class RecordSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      loading: true,
      tableMode: false,
      disable: true
    }
    this.queryObj = {};
  }
  select() {
    if(typeof this.props.onSelect === 'function') {
      this.props.onSelect(this.refs.recordSelect.getSelectedRecords());
    }
  }
  close() {
    if(typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }
  refresh() {
    this.setState({loading: true, records: []});
    if(typeof this.refs.recordQueryBar !== 'undefined') {
      this.queryObj = this.refs.recordQueryBar.getQueryObj();
    }
    Interface.getRecords(this.queryObj, {lastModified: 'desc'}).then((docs) => {
      this.setState({records: docs, loading: false});
    });
  }
  componentDidMount() {
    this.refresh();
  }
  componentDidUpdate(prevProps) {
    if(!prevProps.open && this.props.open) {
      this.refresh();
    }
  }
  render() {
    return (
      <Dialog fullScreen open={this.props.open} onClose={this.close.bind(this)}>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton color='inherit' edge='start' onClick={this.close.bind(this)} style={{
              marginRight: '4vw'
            }}>
              <Close />
            </IconButton>
            <Typography variant='h6' style={{
              flexGrow: 1
            }}>
              Select Records
            </Typography>
            <Button color='inherit'
              disabled={this.state.disable}
              onClick={this.select.bind(this)}
            >
              Select
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar style={{marginBottom: '4vh'}} />
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <RecordQueryBar ref='recordQueryBar' name='transfer' button onSubmit={this.refresh.bind(this)}/>
            </Grid>
            <Grid item xs={2}>
              <IconButton variant='contained' onClick={() => {
                this.setState({tableMode: !this.state.tableMode});
              }}>
                {!this.state.tableMode ? <TocIcon fontSize='large' /> : <AppsIcon fontSize='large' />}
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              {this.state.loading ?
                <CircularProgress />
              :
                <RecordSelect ref='recordSelect' records={this.state.records} table={this.state.tableMode}
                  onSelect={(selectedRecords) => {
                    this.setState({disable: (
                      typeof selectedRecords === 'undefined' ||
                      selectedRecords.length === 0
                    )});
                  }}
                  onRemove={this.refresh.bind(this)}
                />
              }
            </Grid>
          </Grid>

        </Container>
      </Dialog>
    );
  }
}
