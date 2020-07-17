import React from 'react';

import * as Layout from 'config/Layout';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RecordCard from 'uiTree/components/Record/RecordCard';

export default class RecordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.resizeListener = () => {};
  }
  componentDidMount() {
    this.resizeListener = () => {
      this.forceUpdate();
    };
    window.addEventListener('resize', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  render() {
    return (
      <Grid container spacing={2}>
        {(typeof this.props.records === 'undefined' || this.props.records.length === 0) ?
          <Grid item xs={12}>
            <Typography variant='body1' align='center'>
              No records to display
            </Typography>
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
