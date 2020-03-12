import * as Color from 'config/Color';

var deepcopy = require('deep-copy');

export function runProcess(inElem, inRecords, inProcess) {
  var moment = require('moment');
  var d3 = require('d3');
  var chart = require('chart.js');
  var plotly = require('plotly.js');
  var tabulator = require("tabulator-tables");
  var color = Color;
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
  var inputRecord = deepcopy(inRecords);
  if(inProcess.queryType === 'record') {
    inputRecord = {};
    if(inRecords.length > 0) {
      inputRecord = deepcopy(inRecords[0]);
    }
  }
  if(inProcess.year !== -1) {
    if(Array.isArray(inputRecord)) {
      var tmp = [];
      for(var i = 0;i < inputRecord.length;i++) {
        if(inputRecord[i].year === inProcess.year) {
          tmp.push(inputRecord[i]);
        }
      }
      inputRecord = tmp;
    }
    else {
      if(inputRecord.year !== inProcess.year) {
        inputRecord = {};
      }
    }
  }
  try {
    /* eslint-disable */
    func = new Function(
      'moment',
      'd3',
      'chart',
      'plotly',
      'tabulator',
      'color',
      'console',
      'returnData',
      'data',
      'targetElement',
      '\"use strict\";' + inProcess.function
    );
    /* eslint-enable */
    ret.value = func(moment, d3, chart, plotly, tabulator, color, consoleTmp, ret, inputRecord, inElem);
  }
  catch(err) {
    console.info('[Processor] Error in running process');
    console.error(err);
    ret.value = NaN;
  }

  return ret;
}

export async function runProcessAsync(inElem, inRecords, inProcess) {
  var promise = new Promise((resolve, reject) => {
    resolve(runProcess(inElem, inRecords, inProcess));
  });
  return (await promise);
}
