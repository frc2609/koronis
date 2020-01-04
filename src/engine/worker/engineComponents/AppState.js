const AppStateFuncs = {
  workerInit: () => {
    //Code that is running in webworker
    var AppState = {};
  },
  workerReply: (requestMessage) => {
    //Code inside onmessage function in webworker
    Object.assign(AppState, requestMessage.requestData);
    var replyMessage = requestMessage;
    replyMessage.requestData = AppState;
    postMessage(replyMessage);
  },
  appRequest: (requestMessage, ew) => {
    //Code that initiates a postMessage
    ew.postMessage(requestMessage);
  }
}

const AppState = {
  workerInit: AppStateFuncs.workerInit.toString(),
  workerReply: AppStateFuncs.workerReply.toString(),
  appRequest: AppStateFuncs.appRequest
}
export default AppState;
