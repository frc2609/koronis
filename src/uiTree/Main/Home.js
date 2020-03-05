import React from 'react';

import Config from 'Config';

export default class Home extends React.Component {
  render() {return (
    <div>
      This is the Home view. App is version {Config.version}
    </div>
  );}
}
