import React from 'react';
import { withRouter } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class WikiListButton extends React.Component {
  buttonRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }
  render() {
    return (
      <ListItem
        button
        ref={this.buttonRef}
        onClick={() => {
          this.props.history.push(`/wiki/${this.props.wikiMap.url}.md`);
          this.props.onClose();
        }}
      >
        <ListItemText primary={this.props.wikiMap.name} />
      </ListItem>
    );
  }
}

const WikiListButtonWithRouter = withRouter(WikiListButton);
export default WikiListButtonWithRouter;