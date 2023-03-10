import React from 'react';

import * as Layout from 'config/Layout';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

import RecordCard from 'uiTree/components/Record/RecordCard';

export default class RecordView extends React.Component {
  render() {
    return (
      <Grid container spacing={2}>
        {(typeof this.props.records === 'undefined' || this.props.records.length === 0) ?
          <Grid item xs={12}>
            <Card>
              <Box m={2}>
                <Typography variant='body1' align='center'>
                  No records to display
                </Typography>
              </Box>
            </Card>
          </Grid>
        :
          this.props.records.map((e, i) => {
            return (
              <Grid key={i} item xs={Layout.getDefaultGrid()} style={{minWidth: '300px'}}>
                <RecordCard record={e} onRemove={this.props.onRemove.bind(this)} />
              </Grid>
            );
          })
        }
      </Grid>
    );
  }
}
