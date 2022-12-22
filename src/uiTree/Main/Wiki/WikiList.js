import React from 'react';

import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';

import WikiListButton from 'uiTree/Main/Wiki/WikiListButton';

export default class WikiList extends React.Component {
  render() {
    return (
      <Popover
        anchorEl={this.props.anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: this.props.right ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={this.props.selected}
        onClose={this.props.onClose}
      >
        <List>
          {Object.keys(this.props.wikiMap).sort((e1, e2) => this.props.wikiMap[e1].index - this.props.wikiMap[e2].index).map((e, i) => {
            return (
              <WikiListButton
                key={i}
                wikiMap={this.props.wikiMap[e]}
                onClose={this.props.onClose}
              />
            );
          })}
        </List>
      </Popover>
    );
  }
}