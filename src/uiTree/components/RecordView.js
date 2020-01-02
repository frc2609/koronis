import React from 'react';

import * as User from 'auth/User';
import * as Interface from 'db/Interface';
import * as Layout from 'config/Layout';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import RecordCard from 'uiTree/components/RecordCard';

export default class Transfer extends React.Component {
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
        {(typeof this.props.records == 'undefined') ? '' :
          this.props.records.map((e, i) => {
            return (
              <Grid key={i} item xs={Layout.isLandscape() ? 6 : 12} style={{minWidth: '300px'}}>
                <RecordCard record={e} onRemove={this.props.onRemove.bind(this)} />
              </Grid>
            );
          })
        }
      </Grid>
    );
  }
}
