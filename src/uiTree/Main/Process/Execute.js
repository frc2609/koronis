import React from 'react';

import * as Processor from 'engine/process/Processor';

import Container from '@material-ui/core/Container';

export default class Execute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process: {}
    }
  }
  render() {
    return (
      <Container maxWidth='xl'>
      </Container>
    );
  }
}
