import React from 'react';

import Config from 'config/Config';

export default class Home extends React.Component {
  render() {
    return (
      <>
        App is version {Config.version} is configured for {Config.environmentConfig}. This view is still a work in progress.
      </>
    );
  }
}
