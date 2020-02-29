import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';

export default class ColorSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRed: props.value
    };

    this.styles = {
      root: {
        margin: 'auto',
        display: 'flex'
      },
      switchBase: {
        color: '#008ae6'
      },
      checked: {
        color: '#f73c3c'
      }
    };
    this.customSwitch = withStyles(this.styles)(Switch);
  }
  onChange(event) {
    this.setState({isRed: event.target.checked});
    if(typeof this.props.onChange !== 'undefined') {
      this.props.onChange(event);
    }
  }
  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={4} style={{textAlign: 'right'}}>
          <FormLabel style={{color: '#008ae6'}}>
            Blue
          </FormLabel>
        </Grid>
        <Grid item xs={4}>
          <this.customSwitch
      checked={this.state.isRed}
      onChange={this.onChange.bind(this)}
      color='default'
          />
        </Grid>
        <Grid item xs={4} style={{textAlign: 'left'}}>
          <FormLabel style={{color: '#dc3545'}}>
            Red
          </FormLabel>
        </Grid>
      </Grid>
    );
  }
}
