import React from 'react';

import Typography from '@material-ui/core/Typography';

import HelpModal from 'uiTree/MainAppBar/Help/HelpModal';

export default class Record extends React.Component {
  render() {
    return (
      <HelpModal path='/record'>
        <Typography variant='body1' gutterBottom>
          This page is the record page. Use this page to browse and create Records.
          This page will change in the future to include an editor.
        </Typography>
        <Typography variant='h6' gutterBottom>
          Browse
        </Typography>
        <Typography variant='body1' gutterBottom>
          Browse through Records using the query/filter panel
        </Typography>
      </HelpModal>
    );
  }
}
