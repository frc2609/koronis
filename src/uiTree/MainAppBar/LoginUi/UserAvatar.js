import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import firebase from 'auth/Firebase';

export default class UserAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {},
      targetElem: null
    }
    this.unregisterAuthObserver = null;
  }
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({loggedIn: !!user, user: user});
    });
  }
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    return (
      <>
        {this.state.loggedIn ?
          <Avatar
            alt={this.state.user.displayName}
            src={this.state.user.photoURL}
            onClick={(e) => {this.setState({targetElem: e.currentTarget})}}
          />
        :
          <></>
        }
        <Menu
          anchorEl={this.state.targetElem}
          open={Boolean(this.state.targetElem)}
          onClose={() => {this.setState({targetElem: null})}}
        >
          <MenuItem onClick={async () => {
            await firebase.auth().signOut();
            this.setState({targetElem: null});
          }}>Logout</MenuItem>
        </Menu>
      </>
    );
  }
}
