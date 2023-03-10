import { createTheme } from '@material-ui/core/styles';

export const getColor = (inStr, inAlpha = 1) => {
  let randomColor = require('randomcolor');
  return randomColor({
    seed: inStr,
    alpha: inAlpha,
    luminosity: 'bright',
    format: 'rgba'
  });
};

export const getTheme = (isDark) => {
  return createTheme({
    palette: {
      type: isDark ? 'dark' : 'light'
    },
    overrides: isDark ? 
      {
        MuiPaper: {
          outlined: {
            backgroundColor: '#303030'
          }
        },
        MuiToolbar: {
          root: {
            backgroundColor: '#212121'
          }
        }
      }
    :
      {}
  });
};
