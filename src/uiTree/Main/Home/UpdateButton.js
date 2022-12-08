import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import * as ServiceWorker from 'ServiceWorkerRegistration';

const swUpdateAvailable = new Event('swupdateavailable');
const swOfflineReady = new Event('swofflineready');

export default class UpdateButton extends React.Component {
  reg = null;
  state = {
    installed: false,
    needUpdate: false
  };
  updateAvailable() {
    let regwaiting = this.reg.waiting;
    if(regwaiting) {
      regwaiting.addEventListener('statechange', (e) => {
        if(e.target.state === 'activated') {
          window.location.reload();
        }
      });
      this.setState({ needUpdate: true });
    }
  }
  offlineReady() {
    this.setState({ installed: true });
  }
  componentDidMount() {
    this.updateAvailable = this.updateAvailable.bind(this);
    this.offlineReady = this.offlineReady.bind(this);
    window.addEventListener('swupdateavailable', this.updateAvailable);
    window.addEventListener('swofflineready', this.offlineReady);
    ServiceWorker.register({
      onUpdate: (reg) => {
        this.reg = reg;
        window.dispatchEvent(swUpdateAvailable);
      },
      onSuccess: () => { window.dispatchEvent(swOfflineReady); },
      onReady: (reg) => {
        if(reg.waiting !== null) {
          this.reg = reg;
          window.dispatchEvent(swUpdateAvailable);
        }
        if(reg.active !== null) {
          this.reg = reg;
          window.dispatchEvent(swOfflineReady);
        }
      },
    });
  }
  componentWillUnmount() {
    window.removeEventListener('swupdateavailable', this.updateAvailable);
    window.removeEventListener('swofflineready', this.offlineReady);
  }
  render() {
    return (
      <Grid container spacing={2}>
        {this.state.installed ?
          <>
            <Grid item xs={12}>
              <Typography variant='body2' component='p'>
                App is cached and offline ready!
              </Typography>
            </Grid>
          </>
        :
          <>
            <Grid item xs={12}>
              <Typography variant='body2' component='p'>
                {process.env.REACT_APP_DISABLE_SW !== 'true' ?
                  'Caching app for offline functionality...'
                :
                  'App caching is disabled for development purposes.'
                }
              </Typography>
            </Grid>
          </>
        }
        {this.state.needUpdate ?
          <>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                onClick={() => {
                  let regwaiting = this.reg.waiting;
                  if(regwaiting) {
                    regwaiting.postMessage({ type: 'SKIP_WAITING' });
                  }
                }}
              >
                New Update Available!
              </Button>
            </Grid>
          </>
        :
          <></>
        }
      </Grid>
    );
  }
}
