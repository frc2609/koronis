import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class ControlBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
  }
  click() {
    if(this.state.playing) {
      this.setState({playing: false});
      this.props.stop();
    }
    else {
      this.setState({playing: true});
      this.props.play();
    }
  }
  render() {
    return (
      <Box style={{height:'12.5%'}}>
        <LinearProgress variant='determinate' value={
          (this.props.progress > 100) ? 100 : this.props.progress
        } color={
          (this.props.progress > 100) ? 'secondary' : 'primary'
        } />
        <ButtonGroup style={{height:'100%'}} variant='outlined'>
          <Button style={{height:'100%'}} color='default' disableRipple={true} disableFocusRipple={true}>
            {'Time: ' + this.props.time.toFixed(2) + ' sec'}
          </Button>
          <Button style={{height:'100%'}} onClick={this.click.bind(this)} color={
            this.state.playing ? 'secondary' : 'primary'
          }>
            {this.state.playing ? 'STOP' : 'START'}
         </Button>
        </ButtonGroup>
      </Box>
    );
  }
}
