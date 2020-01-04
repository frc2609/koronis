const RecordSerializerFuncs = {
  workerInit: () => {
    //Code that is running in webworker
    var boolToBin = (inBool) => {
      return inBool ? [1] : [0];
    }
    var binToBool = (inBin) => {
      return inBin.length > 0 && inBin[0] == 1;
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
    var encode = (record) => {
      var resBinArr = [];
      resBinArr.push(strToBin(record.id));
      resBinArr.push(intToBin(record.year));
      resBinArr.push(intToBin(record.version));
      resBinArr.push(dateToBin(record.startDate));
      resBinArr.push(intToBin(record.teamNumber));
      resBinArr.push(intToBin(record.matchNumber));
      resBinArr.push(strToBin(record.matchType));
      resBinArr.push(boolToBin(record.isRedAlliance));
      resBinArr.push(strToBin(record.comments));
      resBinArr.push(strToBin(record.user));
      resBinArr.push(dateToBin(record.device));
      resBinArr.push(dateToBin(record.lastModified));
      resBinArr.push(strToBin(record.digitalSignature));
      resBinArr.push(intToBin(record.changeLog.length));
      for(var i = 0;i < record.changeLog.length;i++) {
        resBinArr.push(strToBin(record.changeLog[i].user));
        resBinArr.push(dateToBin(record.changeLog[i].modificationTime));
        resBinArr.push(strToBin(record.changeLog[i].id));
      }
      resBinArr.push(intToBin(record.eventLog.length));
      for(var i = 0;i < record.eventLog.length;i++) {
        resBinArr.push(intToBin(record.eventLog[i].id));
        resBinArr.push(strToBin(record.eventLog[i].name));
        resBinArr.push(strToBin(JSON.stringify(record.eventLog[i].variables)));
        resBinArr.push(numToBin(record.eventLog[i].timeStamp));
      }
      resBinArr.push(intToBin(record.positionLog.length));
      for(var i = 0;i < record.positionLog.length;i++) {
        resBinArr.push(posToBin(record.positionLog[i]));
      }
      return resBinArr.flat();
    }
    var decode = (inBin, stream = false) => {
      var bin = !stream ? inBin.slice() : inBin;
      var resObj = {};
      resObj.id = binStreamToStr(bin);
      resObj.year = binStreamToInt(bin);
      resObj.version = binStreamToInt(bin);
      resObj.startDate = binStreamToDate(bin);
      resObj.teamNumber = binStreamToInt(bin);
      resObj.matchNumber = binStreamToInt(bin);
      resObj.matchType = binStreamToStr(bin);
      resObj.isRedAlliance = binStreamToBool(bin);
      resObj.comments = binStreamToStr(bin);
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
      var eventLogLength = binStreamToInt(bin);
      resObj.eventLog = [];
      for(var i = 0;i < eventLogLength;i++) {
        var currEventLogObj = {};
        currEventLogObj.id = binStreamToInt(bin);
        currEventLogObj.name = binStreamToStr(bin);
        currEventLogObj.variables = JSON.parse(binStreamToStr(bin));
        currEventLogObj.timeStamp = binStreamToNum(bin);
        resObj.eventLog.push(currEventLogObj);
      }
      var positionLogLength = binStreamToInt(bin);
      resObj.positionLog = [];
      for(var i = 0;i < positionLogLength;i++) {
        var currPositionLogObj = {};
        currPositionLogObj = binStreamToPos(bin);
        resObj.positionLog.push(currPositionLogObj);
      }
      return resObj;
    }
    var encodeArr = (records) => {
      var resBinArr = [];
      resBinArr.push(intToBin(records.length));
      for(var i = 0;i < records.length;i++) {
        resBinArr.push(encode(records[i]));
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
  },
  workerReply: (requestMessage) => {
    //Code inside onmessage function in webworker
    var isEncoding = requestMessage.isEncoding;
    var isArray = requestMessage.isArray;
    var isString = requestMessage.isString;
    var input = requestMessage.requestData;
    var output;
    if(isArray) {
      if(isEncoding) {
        output = isString ? binArrToBinStr(encodeArr(input)) : encodeArr(input); // eslint-disable-line no-undef
      }
      else {
        output = isString ? decodeArr(binStrToBinArr(input)) : decodeArr(input); // eslint-disable-line no-undef
      }
    }
    else {
      if(isEncoding) {
        output = isString ? binArrToBinStr(encode(input)) : encode(input); // eslint-disable-line no-undef
      }
      else {
        output = isString ? decode(binStrToBinArr(input)) : decode(input); // eslint-disable-line no-undef
      }
    }
    requestMessage.requestData = output;
    postMessage(requestMessage);
  },
  appRequest: (requestMessage, ew) => {
    //Code that initiates a postMessage
    ew.postMessage(requestMessage);
  }
}

const RecordSerializer = {
  workerInit: RecordSerializerFuncs.workerInit.toString(),
  workerReply: RecordSerializerFuncs.workerReply.toString(),
  appRequest: RecordSerializerFuncs.appRequest
}
export default RecordSerializer;
