import React from 'react';
import { Redirect } from 'react-router';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default class SectionLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {redirect: false};
  }
  handleOnClick = () => {
    this.setState({redirect: true});
    this.props.closeMenuCallback();
  }
  render() {
    return (
      <ListItem button onClick={this.handleOnClick}
        style={{
          width: '250px'
        }}
      >
        <ListItemIcon>{this.props.icon}</ListItemIcon>
        <ListItemText primary={this.props.title} />
        {this.state.redirect ?
          <Redirect push to={this.props.to} />
        :
          <></>
        }
      </ListItem>
    );
  }
}
