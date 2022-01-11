let Plotly = require('plotly.js/lib/core');

Plotly.register([
  require('plotly.js/lib/scatter'),
  require('plotly.js/lib/bar'),
  require('plotly.js/lib/box'),
  require('plotly.js/lib/heatmap'),
  require('plotly.js/lib/histogram'),
  require('plotly.js/lib/contour'),
  require('plotly.js/lib/image'),
  require('plotly.js/lib/pie'),
  require('plotly.js/lib/sunburst'),
  require('plotly.js/lib/treemap'),
  require('plotly.js/lib/surface'),
  require('plotly.js/lib/funnelarea'),
  require('plotly.js/lib/splom'),
  require('plotly.js/lib/indicator'),
  require('plotly.js/lib/aggregate'),
  require('plotly.js/lib/filter'),
  require('plotly.js/lib/groupby'),
  require('plotly.js/lib/sort'),
  require('plotly.js/lib/calendars')
]);

module.exports = Plotly;
