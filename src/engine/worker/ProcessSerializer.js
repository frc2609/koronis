var boolToBin = (inBool) => {
  return inBool ? [1] : [0];
}
var binToBool = (inBin) => {
  return inBin.length > 0 && inBin[0] === 1;
}
var binStreamToBool = (inBinStream) => {
  var output = binToBool(inBinStream);
  inBinStream.splice(0, 1);
  return output;
}
var intToBin = (inInteger) => {
  var actualInteger = Math.abs(inInteger % 65536);
  var binArr = [];
  binArr.push(actualInteger >>> 8);
  binArr.push((actualInteger & 255) >>> 0);
  return binArr;
}
var binToInt = (inBin) => {
  var firstByte = (inBin.length > 0 ? inBin[0] << 8 : 0);
  var secondByte = (inBin.length > 1 ? inBin[1] : 0);
  return (firstByte + secondByte) >>> 0;
}
var binStreamToInt = (inBinStream) => {
  var output = binToInt(inBinStream);
  inBinStream.splice(0, 2);
  return output;
}
var dateToBin = (inInteger) => {
  var actualInteger = Math.abs(inInteger % 4294967296);
  var binArr = [];
  binArr.push(((actualInteger & 4278190080) >>> 24) >>> 0);
  binArr.push(((actualInteger & 16711680) >>> 16) >>> 0);
  binArr.push(((actualInteger & 65280) >>> 8) >>> 0);
  binArr.push((actualInteger & 255) >>> 0);
  return binArr;
}
var binToDate = (inBin) => {
  var firstByte = (inBin.length > 0 ? inBin[0] << 24 : 0);
  var secondByte = (inBin.length > 1 ? inBin[1] << 16 : 0);
  var thirdByte = (inBin.length > 2 ? inBin[2] << 8 : 0);
  var fourthByte = (inBin.length > 3 ? inBin[3] : 0);
  return (firstByte + secondByte + thirdByte + fourthByte) >>> 0;
}
var binStreamToDate = (inBinStream) => {
  var output = binToDate(inBinStream);
  inBinStream.splice(0, 4);
  return output;
}
var numToBin = (inNum) => {
  var actualInteger = (Math.trunc(inNum*100000) % 4294967296);
  var binArr = [];
  binArr.push(((actualInteger & 4278190080) >>> 24) >>> 0);
  binArr.push(((actualInteger & 16711680) >>> 16) >>> 0);
  binArr.push(((actualInteger & 65280) >>> 8) >>> 0);
  binArr.push((actualInteger & 255) >>> 0);
  return binArr;
}
var binToNum = (inBin) => {
  var firstByte = (inBin.length > 0 ? inBin[0] << 24 : 0);
  var secondByte = (inBin.length > 1 ? inBin[1] << 16 : 0);
  var thirdByte = (inBin.length > 2 ? inBin[2] << 8 : 0);
  var fourthByte = (inBin.length > 3 ? inBin[3] : 0);
  return ((firstByte + secondByte + thirdByte + fourthByte) >>> 0)/100000;
}
var binStreamToNum = (inBinStream) => {
  var output = binToNum(inBinStream);
  inBinStream.splice(0, 4);
  return output;
}
var posToBin = (inPos) => {
  var actualX = Math.abs(inPos.x) % 64;
  var actualY = Math.abs(inPos.y) % 64;
  var actualT = Math.trunc(Math.abs(inPos.timeStamp) * 10);
  var binArr = [];
  binArr[0] = (actualX << 2) + ((actualY & 48) >>> 4) >>> 0;
  binArr[1] = ((actualY & 15) << 4) + ((actualT & 3840) >>> 8) >>> 0;
  binArr[2] = (actualT & 255) >>> 0;
  return binArr;
}
var binToPos = (inBin) => {
  var firstByte = (inBin.length > 0 ? inBin[0] : 0);
  var secondByte = (inBin.length > 1 ? inBin[1] : 0);
  var thirdByte = (inBin.length > 2 ? inBin[2] : 0);
  var obj = {};
  obj.x = ((firstByte & 252) >>> 2) >>> 0;
  obj.y = ((firstByte & 3) << 4) + ((secondByte & 240) >>> 4) >>> 0;
  obj.timeStamp = ((((secondByte & 15) << 8) + thirdByte) / 10) >>> 0;
  return obj;
}
var binStreamToPos = (inBinStream) => {
  var output = binToPos(inBinStream);
  inBinStream.splice(0, 3);
  return output;
}
var binStrToBinArr = (inBinStr) => {
  //Will include null padding
  var binArr = [];
  for(var i = 0;i < inBinStr.length;i++) {
    binArr.push((inBinStr.charCodeAt(i) & 255) >>> 0);
  }
  return binArr;
}
var binArrToBinStr = (inBinArr) => {
  //Will be null padded to nearest 2 bytes
  var output = '';
  for(var i = 0;i < inBinArr.length;i++) {
    output += String.fromCharCode((inBinArr[i] & 255) >>> 0);
  }
  return output;
}
var checkIsAscii = (inString) => {
  var max = 0;
  for(var i = 0;i < inString.length;i++) {
    if(inString.charCodeAt(i) > max) {max = inString.charCodeAt(i)}
  }
  return max <= 255;
}
var strToBin = (inString) => {
  var isAscii = checkIsAscii(inString);
  var actualString = inString.substring(0, 32768);
  var binArr = [];
  binArr[0] = isAscii ? 128 >>> 0 : 0 >>> 0;
  binArr[0] += ((actualString.length & 32512) >>> 8) >>> 0;
  binArr[1] = (actualString.length & 255) >>> 0;
  for(var i = 0;i < actualString.length;i++) {
    if(isAscii) {
      binArr.push(actualString.charCodeAt(i));
    }
    else {
      binArr = binArr.concat(intToBin(actualString.charCodeAt(i)));
    }
  }
  return binArr;
}
var binToStr = (inBin, stream = false) => {
  if(inBin.length >= 2) {
    var isAscii = (inBin[0] >>> 7) > 0;
    var stringLength = ((inBin[0] & 127) << 8) + inBin[1];
    var output = '';
    for(var i = 0;i < stringLength;i++) {
      if(isAscii) {
        if(i+2 < inBin.length) {
          output += String.fromCharCode(inBin[i+2]);
        }
      }
      else {
        if(i*2+3 < inBin.length) {
          var code = (inBin[i*2+2] << 8) + inBin[i*2+3];
          output += String.fromCharCode(code);
        }
      }
    }
    if(stream) {
      if(isAscii) {inBin.splice(0, 2+stringLength)}
      else {inBin.splice(0, 2+(stringLength*2))}
    }
    return output;
  }
  return '';
}
var binStreamToStr = (inBinStream) => {
  return binToStr(inBinStream, true);
}
var encode = (process) => {
  var resBinArr = [];
  resBinArr.push(strToBin(process.id));
  resBinArr.push(intToBin(process.year));
  resBinArr.push(strToBin(process.queryType));
  resBinArr.push(strToBin(process.dataType));
  resBinArr.push(strToBin(process.name));
  resBinArr.push(strToBin(process.title));
  resBinArr.push(strToBin(process.description));
  resBinArr.push(strToBin(process.function));
  resBinArr.push(strToBin(process.user));
  resBinArr.push(dateToBin(process.device));
  resBinArr.push(dateToBin(process.lastModified));
  resBinArr.push(strToBin(process.digitalSignature));
  resBinArr.push(intToBin(process.changeLog.length));
  for(var i = 0;i < process.changeLog.length;i++) {
    resBinArr.push(strToBin(process.changeLog[i].user));
    resBinArr.push(dateToBin(process.changeLog[i].modificationTime));
    resBinArr.push(strToBin(process.changeLog[i].id));
  }
  return resBinArr.flat();
}
var decode = (inBin, stream = false) => {
  var bin = !stream ? inBin.slice() : inBin;
  var resObj = {};
  resObj.id = binStreamToStr(bin);
  resObj.year = binStreamToInt(bin);
  resObj.queryType = binStreamToStr(bin);
  resObj.dataType = binStreamToStr(bin);
  resObj.name = binStreamToStr(bin);
  resObj.title = binStreamToStr(bin);
  resObj.description = binStreamToStr(bin);
  resObj.function = binStreamToStr(bin);
  resObj.user = binStreamToStr(bin);
  resObj.device = binStreamToDate(bin);
  resObj.lastModified = binStreamToDate(bin);
  resObj.digitalSignature = binStreamToStr(bin);
  var changeLogLength = binStreamToInt(bin);
  resObj.changeLog = [];
  for(var i = 0;i < changeLogLength;i++) {
    var currChangeLogObj = {};
    currChangeLogObj.user = binStreamToStr(bin);
    currChangeLogObj.modificationTime = binStreamToDate(bin);
    currChangeLogObj.id = binStreamToStr(bin);
    resObj.changeLog.push(currChangeLogObj);
  }
  return resObj;
}
var encodeArr = (processes) => {
  var resBinArr = [];
  resBinArr.push(intToBin(processes.length));
  for(var i = 0;i < processes.length;i++) {
    resBinArr.push(encode(processes[i]));
  }
  return resBinArr.flat();
}
var decodeArr = (inBin) => {
  var bin = inBin;
  var resArr = [];
  var arrLength = binStreamToInt(bin);
  for(var i = 0;i < arrLength;i++) {
    resArr.push(decode(bin, true));
  }
  return resArr;
}

export function serializeProcess(input, isEncoding = true, isString = true) {
  var output;
  if(isEncoding) {
    output = isString ? binArrToBinStr(encode(input)) : encode(input); // eslint-disable-line no-undef
  }
  else {
    output = isString ? decode(binStrToBinArr(input)) : decode(input); // eslint-disable-line no-undef
  }
  return output;
}

export function serializeProcesses(input, isEncoding = true, isString = true) {
  var output;
  if(isEncoding) {
    output = isString ? binArrToBinStr(encodeArr(input)) : encodeArr(input); // eslint-disable-line no-undef
  }
  else {
    output = isString ? decodeArr(binStrToBinArr(input)) : decodeArr(input); // eslint-disable-line no-undef
  }
  return output;
}
