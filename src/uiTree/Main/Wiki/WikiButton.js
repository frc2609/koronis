import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import WikiSublist from 'uiTree/Main/Wiki/WikiSublist';

class WikiButton extends React.Component {
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
        <Button
          ref={this.buttonRef}
          onClick={() => {
            this.props.history.push(`/wiki/${this.props.wikiMap.url}.md`);
          }}
        >
          {this.props.wikiMap.name}
        </Button>
      );
    }
    return (
      <>
        <Button
          ref={this.buttonRef}
          onClick={() => { this.setState({ selected: true }); }}
        >
          {this.props.wikiMap.name}
        </Button>
        <WikiSublist
          anchorRef={this.buttonRef}
          wikiMap={this.props.wikiMap.children}
          selected={this.state.selected}
          onClose={() => { this.setState({ selected: false }); }}
        />
      </>
    );
  }
}

const WikiButtonWithRouter = withRouter(WikiButton);
export default WikiButtonWithRouter;