import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import * as Color from 'config/Color';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const store = require('store');

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.resizeListener = () => {};
  }
  componentDidMount() {
    this.resizeListener = () => {
      this.forceUpdate();
    };
    window.addEventListener('resize', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  render() {
    return (
      <div style={{flexGrow: 1}}>
          <CssBaseline />
          <ThemeProvider theme={Color.getTheme(store.get('settings/theme/darkMode') === 'true')}>
            <Paper
              square
              variant='outlined'
              style={{
                position: 'fixed',
                zIndex: -100,
                height: `${window.innerHeight}px`,
                width: `${window.innerWidth}px`,
                top: '0px',
                left: '0px'
              }}
            >
              <Container>
                <Box display='flex'> 
                  <Box
                    mx='auto'
                    style={{
                      marginTop: '20vh'
                    }}
                  >
                    <CircularProgress
                      size={120}
                      thickness={3.3}
                      style={{
                        animationDuration: '2000ms'
                      }}
                    />
                    <Box my={1}>
                      <Typography align='center'>
                        Loading KSS...
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </Paper>
          </ThemeProvider>
      </div>
    );
  }
}
