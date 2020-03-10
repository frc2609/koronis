export const getColor = (inStr, inAlpha = 1) => {
  var randomColor = require('randomcolor');
  return randomColor({
    seed: inStr,
    alpha: inAlpha,
    luminosity: 'bright',
    format: 'rgba'
  });
}
