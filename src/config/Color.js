import { createMuiTheme } from '@material-ui/core/styles';

export const getColor = (inStr, inAlpha = 1) => {
  var randomColor = require('randomcolor');
  return randomColor({
    seed: inStr,
    alpha: inAlpha,
    luminosity: 'bright',
    format: 'rgba'
  });
};

export const getTheme = (isDark) => {
  return createMuiTheme({
    palette: {
      type: isDark ? 'dark' : 'light'
    }
  });
};
