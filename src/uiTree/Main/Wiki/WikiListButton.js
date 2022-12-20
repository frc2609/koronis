import React from 'react';
import { withRouter } from 'react-router-dom';

import WikiSublist from 'uiTree/Main/Wiki/WikiSublist';
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
    if(Object.keys(this.props.wikiMap.children).length <= 0) {
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
    return (
      <>
        <ListItem
          button
          ref={this.buttonRef}
          onClick={() => { this.setState({ selected: true }); }}
        >
          <ListItemText primary={this.props.wikiMap.name} />
        </ListItem>
        <WikiSublist
          anchorRef={this.buttonRef}
          right
          wikiMap={this.props.wikiMap.children}
          selected={this.state.selected}
          onClose={() => { this.setState({ selected: false }); }}
        />
      </>
    );
  }
}

const WikiListButtonWithRouter = withRouter(WikiListButton);
export default WikiListButtonWithRouter;