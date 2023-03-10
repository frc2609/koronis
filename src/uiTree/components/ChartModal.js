import React from 'react';

import * as Layout from 'config/Layout';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';

import Chart from 'engine/process/Chart';
import RecordCard from 'uiTree/components/Record/RecordCard';

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
            <IconButton color='inherit' edge='start' onClick={this.close.bind(this)}>
              <Close />
            </IconButton>
            <Box mr={2} />
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
        <Box mb={3}>
          <Toolbar />
        </Box>
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            {typeof this.props.records !== 'undefined' && typeof this.props.process !== 'undefined' ?
              this.props.records.map((e, i) => {
                if(!this.props.open) {return (<></>);}
                return (
                  <Grid key={i} item xs={Layout.isLarge() || Layout.isLandscape() ? 6 : 12}>
                    <RecordCard record={e} onRemove={this.forceUpdate.bind(this)}>
                      <Chart records={[e]} process={this.props.process} />
                    </RecordCard>
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
