export function runProcess(inElem, inRecords, inProcess) {
  var moment = require('moment');
  var d3 = require('d3');
  var chart = require('chart.js');
  var plotly = require('plotly.js');
  var tabulator = require("tabulator-tables");
  var consoleTmp = {
    log: (v) => {console.log(v);ret.log.push(v)},
    info: (v) => {console.info(v);ret.info.push(v)},
    table: (v) => {console.table(v);ret.table.push(v)},
    debug: (v) => {console.debug(v);ret.debug.push(v)},
    warn: (v) => {console.warn(v);ret.warn.push(v)},
    error: (v) => {console.error(v);ret.error.push(v)}
  }
  var func = () => {};
  var ret = {
    value: NaN,
    log: [],
    info: [],
    table: [],
    debug: [],
    warn: [],
    error: []
  };
  var inputRecord = inRecords;
  if(inProcess.queryType === 'record') {
    inputRecord = {};
    if(inRecords.length > 0) {
      inputRecord = inRecords[0];
    }
  }
  try {
    func = new Function('moment', 'd3', 'chart', 'plotly', 'tabulator', 'console', 'ret', 'data', 'targetElement', '\"use strict\";' + inProcess.function); // eslint-disable-line
    ret.value = func(moment, d3, chart, plotly, tabulator, consoleTmp, ret, inputRecord, inElem);
  }
  catch(err) {
    console.info('[Processor] Error in running process');
    console.error(err);
    ret.value = NaN;
  }

  return ret;
}
