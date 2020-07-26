import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import UserAvatar from 'uiTree/MainAppBar/LoginUi/UserAvatar';

import firebase from 'auth/Firebase';
import * as firebaseui from 'firebaseui';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import 'uiTree/MainAppBar/LoginUi.css';

export default class LoginUi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      showLogin: false
    }
    this.uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.YOLO,
      tosUrl: 'https://koronis-scouting-sys.flycricket.io/terms.html',
      privacyPolicyUrl: 'https://koronis-scouting-sys.flycricket.io/privacy.html',
      callbacks: {
        signInSuccessWithAuthResult: () => {this.setState({showLogin: false}); return false;}
      }
    };
    this.unregisterAuthObserver = null;
  }
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({loggedIn: !!user})
    });
  }
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    return (
      <>
        {!this.state.loggedIn ?
          <Button color='inherit' onClick={() => {this.setState({showLogin: true})}}>Login</Button>
        :
          <UserAvatar />
        }
        <Dialog open={this.state.showLogin && !this.state.loggedIn} onClose={() => {this.setState({showLogin: false})}}>
          <DialogContent>
            <Box mb={3}>
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
