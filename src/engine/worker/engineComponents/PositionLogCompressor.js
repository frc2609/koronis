const PositionLogCompressorFuncs = {
  workerInit: () => {
    //Code that is running in webworker
  },
  workerReply: (requestMessage) => {
    //Code inside onmessage function in webworker
    var positionLog = requestMessage.requestData.slice();
    //Change timestamps to 12 bit integer
    for(var i = 0;i < positionLog.length;i++) {
      positionLog[i].timeStamp = Math.trunc(positionLog[i].timeStamp * 10);
    }
    console.log('32bit int');
    console.log(positionLog.length);
    //Sort by timestamp
    positionLog.sort((e1, e2) => {return e1.timeStamp - e2.timeStamp});
    //Delete prematch movement
    var newArr = [];
    for(var i = 0;i < positionLog.length;i++) {
      if(positionLog[i].timeStamp <= 409.6 && positionLog[i].timeStamp >= 0) {
        if(i + 1 < positionLog.length) {
          if(positionLog[i].timeStamp > 0 || positionLog[i+1].timeStamp > 0) {
            newArr.push(positionLog[i]);
          }
        }
        else {
          newArr.push(positionLog[i]);
        }
      }
    }
    positionLog = newArr.slice();
    console.log('Prematch');
    console.log(positionLog.length);
    //Delete intermediate positions (standing still)
    newArr = [];
    var currPosX = 0;
    var currPosY = 0;
    for(var i = 0;i < positionLog.length;i++) {
      if(i == 0) {
        newArr.push(positionLog[i]);
        currPosX = positionLog[i].x;
        currPosY = positionLog[i].y;
      }
      else {
        if(i + 1 < positionLog.length) {
          if(positionLog[i].x != currPosX || positionLog[i].y != currPosY) {
            newArr.push(positionLog[i]);
            currPosX = positionLog[i].x;
            currPosY = positionLog[i].y;
          }
          if(positionLog[i+1].x != currPosX || positionLog[i+1].y != currPosY) {
            newArr.push(positionLog[i]);
          }
        }
        else {
          newArr.push(positionLog[i]);
        }        
      }
    }
    positionLog = newArr.slice();
    console.log('Dehold');
    console.log(positionLog.length);
    //Delete duplicates
    var uniqueLog = [];
    var goodLog = [];
    for(var i = 0;i < positionLog.length;i++) {
      var currStr = '' + positionLog[i].x + positionLog[i].y + positionLog[i].timeStamp;
      if(!uniqueLog.includes(currStr)) {
        uniqueLog.push(currStr);
        goodLog.push(positionLog[i]);
      }
    }
    positionLog = goodLog.slice();
    console.log('Dedupe');
    console.log(positionLog.length);
    //Change timestamps to 32 bit float
    for(var i = 0;i < positionLog.length;i++) {
      positionLog[i].timeStamp = positionLog[i].timeStamp/10;
    }
    //Sort by timestamp (should be sorted already anyways)
    positionLog.sort((e1, e2) => {return e1.timeStamp - e2.timeStamp});
    
    var replyMessage = requestMessage;
    replyMessage.requestData = positionLog;
    postMessage(replyMessage);
  },
  appRequest: (requestMessage, ew) => {
    //Code that initiates a postMessage
    ew.postMessage(requestMessage);
  }
}

const PositionLogCompressor = {
  workerInit: PositionLogCompressorFuncs.workerInit.toString(),
  workerReply: PositionLogCompressorFuncs.workerReply.toString(),
  appRequest: PositionLogCompressorFuncs.appRequest
}
export default PositionLogCompressor;
