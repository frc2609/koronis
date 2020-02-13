export function runProcess(inElem, inProcess) {
  var moment = require('moment');
  var d3 = require('d3');
  var chart = require('chart.js');
  var plotly = require('plotly.js-dist');
  var tabulator = require("tabulator-tables");
  var func = () => {};
  var ret;
  try {
    func = new Function('moment', 'd3', 'chart', 'plotly', 'tabulator', 'targetElement', '\"use strict\";' + inProcess.function);
    ret = func(moment, d3, chart, plotly, tabulator, inElem);
  }
  catch(err) {
    console.log('[Processor] Error in running process');
    console.error(err);
    ret = NaN;
  }
}
