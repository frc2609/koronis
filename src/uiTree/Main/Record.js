import React from 'react';

import RecordEngine from 'engine/record/RecordEngine';

export default class Record extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {return (
    <div>
      <RecordEngine />
    </div>
  );}
}
