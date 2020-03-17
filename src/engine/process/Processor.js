import * as Color from 'config/Color';

var deepcopy = require('deep-copy');
var safeEval = require('notevil');

export function runProcess(inElem, inRecords, inProcess, secure = false) {
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
  };
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
    if(!secure) {
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
      if(inProcess.dataType !== 'chart') {
        func = new Function(
          'console',
          'data',
          '\"use strict\";' + inProcess.function
        );
      }
      /* eslint-enable */
      if(inProcess.dataType !== 'chart') {
        ret.value = func(consoleTmp, inputRecord);
      }
      else {
        ret.value = func(moment, d3, chart, plotly, tabulator, color, consoleTmp, ret, inputRecord, inElem);
      }
    }
    else {
      /* eslint-disable */
      consoleTmp = {
        log: (v) => {},
        info: (v) => {},
        table: (v) => {},
        debug: (v) => {},
        warn: (v) => {},
        error: (v) => {}
      };
      func = safeEval.Function(
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
      if(inProcess.dataType !== 'chart') {
        func = safeEval.Function(
          'console',
          'data',
          '\"use strict\";' + inProcess.function
        );
      }
      /* eslint-enable */
      if(inProcess.dataType !== 'chart') {
        ret.value = func(consoleTmp, inputRecord);
      }
      else {
        ret.value = func(moment, d3, chart, plotly, tabulator, color, consoleTmp, ret, inputRecord, inElem);
      }
    }
    //Filter out non number results and standardize on NaN as a non number result
    if(inProcess.dataType === 'metric') {
      ret.value = Number(ret.value);
      if(typeof ret.value !== 'number') {
        ret.value = NaN;
      }
    }
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
