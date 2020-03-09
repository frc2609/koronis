import React from 'react';

import * as Interface from 'db/Interface';
import * as Layout from 'config/Layout';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
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

import Chart from 'engine/process/Chart';

export default class ChartModal extends React.Component {
  close() {
    if(typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }
  render() {
    return (
      <Dialog fullScreen open={this.props.open} onClose={this.close.bind(this)}>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton color='inherit' edge='start' onClick={this.close.bind(this)}
              style={{
                marginRight: '4vw'
              }}
            >
              <Close />
            </IconButton>
            <Typography variant='h6'
              style={{
                flexGrow: 1
              }}
            >
              Chart Modal
            </Typography>
            <Button color='inherit'
              onClick={this.close.bind(this)}
            >
              Okay
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar style={{marginBottom: '4vh'}} />
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            {typeof this.props.records !== 'undefined' && typeof this.props.process !== 'undefined' ?
              this.props.records.map((e, i) => {
                return (
                  <Grid key={i} item xs={Layout.isLandscape() ? 6 : 12}>
                    <Card>
                      <Chart records={e} process={this.props.process} />
                    </Card>
                  </Grid>
                );
              })
            :
              <></>
            }
          </Grid>
        </Container>
      </Dialog>
    );
  }
}
