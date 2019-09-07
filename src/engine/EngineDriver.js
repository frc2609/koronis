import EngineWorkerAssembler from 'engine/EngineWorkerAssembler';

import TestMessage from 'engine/engineComponents/TestMessage';
import AppState from 'engine/engineComponents/AppState';

export default class EngineDriver {
  constructor() {
    this.engineComponentList = [];
    this.engineComponentList.push({ec: TestMessage, type: 'TEST_MESSAGE'});
    this.engineComponentList.push({ec: AppState, type: 'APP_STATE'});

    this.callbackList = [];
    this.callbackId = 0;

    this.requestHandler = this.requestHandler.bind(this);
    this.replyHandler = this.replyHandler.bind(this);
    this.ew = new EngineWorkerAssembler(this.engineComponentList);
    this.ew.onmessage = this.replyHandler;
  }
  requestHandler(requestMessage, callback) {
    console.log('[Driver] Handling Request: ' + JSON.stringify(requestMessage));
    for(var i = 0;i < this.engineComponentList.length;i++) {
      if(this.engineComponentList[i].type === requestMessage.engineComponentType) {
        this.callbackList.push({requestMessage: requestMessage, callback: callback, callbackId: this.callbackId});
        var newRequestMessage = requestMessage;
        newRequestMessage.callbackId = this.callbackId;
        this.callbackId++;
        this.engineComponentList[i].ec.prototype.appRequest(requestMessage, this.ew);
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
