import React from 'react';

import Typography from '@material-ui/core/Typography';

import HelpModal from 'uiTree/MainAppBar/Help/HelpModal';

export default class Home extends React.Component {
  render() {
    return (
      <HelpModal path='/home'>
        <Typography variant='h6' gutterBottom>
          Main
        </Typography>
        <Typography variant='body1' gutterBottom>
          This page is the home page. Currently it does not contain anything important.
          You can use this page to look at the app version and the app type (whether
          it is in production or in development mode). This will be later developed
          to contain the most important information later.
        </Typography>
      </HelpModal>
    );
  }
}
