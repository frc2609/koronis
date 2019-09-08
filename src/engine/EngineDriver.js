import EngineWorkerAssembler from 'engine/EngineWorkerAssembler';

import TestMessage from 'engine/engineComponents/TestMessage';
import AppState from 'engine/engineComponents/AppState';

class EngineDriver {
  constructor() {
    this.engineComponentsList = [];
    this.engineComponentsList.push(TestMessage);
    this.engineComponentsList.push(AppState);

    this.callbackList = [];
    this.callbackId = 0;

    this.requestHandler = this.requestHandler.bind(this);
    this.replyHandler = this.replyHandler.bind(this);
    this.ew = new EngineWorkerAssembler(this.engineComponentsList);
    this.ew.onmessage = this.replyHandler;
  }
  requestHandler(requestMessage, callback) {
    console.log('[Driver] Handling Request: ' + JSON.stringify(requestMessage));
    for(var i = 0;i < this.engineComponentsList.length;i++) {
      if(this.engineComponentsList[i].name === requestMessage.engineComponentType) {
        this.callbackList.push({requestMessage: requestMessage, callback: callback, callbackId: this.callbackId});
        var newRequestMessage = requestMessage;
        newRequestMessage.callbackId = this.callbackId;
        this.callbackId++;
        this.engineComponentsList[i].prototype.appRequest(requestMessage, this.ew);
      }
    }
  }
  replyHandler(message) {
    var replyMessage = message.data;
    console.log('[Driver] Recieved Reply: ' + JSON.stringify(replyMessage));
    for(var i = 0;i < this.callbackList.length;i++) {
      if(this.callbackList[i].callbackId === replyMessage.callbackId) {
        this.callbackList[i].callback(replyMessage);
        this.callbackList.splice(i, 1);
      }
    }
  }
}

const engineDriver = new EngineDriver();

export const request = (requestMessage, callback) => {
  return engineDriver.requestHandler(requestMessage, callback);
}
