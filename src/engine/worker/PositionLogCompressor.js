export function processPositionLog(positionLogIn) {
  //Code inside onmessage function in webworker
  let positionLog = positionLogIn.slice();
  //Change timestamps to 12 bit integer
  for(let i = 0;i < positionLog.length;i++) {
    positionLog[i].timeStamp = Math.trunc(positionLog[i].timeStamp * 10);
  }
  //Sort by timestamp
  positionLog.sort((e1, e2) => {return e1.timeStamp - e2.timeStamp});
  //Delete prematch movement
  let newArr = [];
  for(let i = 0;i < positionLog.length;i++) {
    if(positionLog[i].timeStamp <= 4096 && positionLog[i].timeStamp >= 0) {
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
  //Delete intermediate positions (standing still)
  newArr = [];
  let currPosX = 0;
  let currPosY = 0;
  for(let i = 0;i < positionLog.length;i++) {
    if(i === 0) {
      newArr.push(positionLog[i]);
      currPosX = positionLog[i].x;
      currPosY = positionLog[i].y;
    }
    else {
      if(i + 1 < positionLog.length) {
        if(positionLog[i].x !== currPosX || positionLog[i].y !== currPosY) {
          newArr.push(positionLog[i]);
          currPosX = positionLog[i].x;
          currPosY = positionLog[i].y;
        }
        if(positionLog[i+1].x !== currPosX || positionLog[i+1].y !== currPosY) {
          newArr.push(positionLog[i]);
        }
      }
      else {
        newArr.push(positionLog[i]);
      }
    }
  }
  positionLog = newArr.slice();
  //Delete duplicates
  let uniqueLog = [];
  let goodLog = [];
  for(let i = 0;i < positionLog.length;i++) {
    let currStr = '' + positionLog[i].x + positionLog[i].y + positionLog[i].timeStamp;
    if(!uniqueLog.includes(currStr)) {
      uniqueLog.push(currStr);
      goodLog.push(positionLog[i]);
    }
  }
  positionLog = goodLog.slice();
  //Change timestamps to 32 bit float
  for(let i = 0;i < positionLog.length;i++) {
    positionLog[i].timeStamp = positionLog[i].timeStamp/10;
  }
  //Sort by timestamp (should be sorted already anyways)
  positionLog.sort((e1, e2) => {return e1.timeStamp - e2.timeStamp});
  return positionLog;
}
