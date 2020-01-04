const TestMessageFuncs = {
  workerInit: () => {
    //Code that is running in webworker
    var TestMessage = 'This is a test message saved in the worker';
  },
  workerReply: (requestMessage) => {
    //Code inside onmessage function in webworker
    var replyMessage = requestMessage;
    replyMessage.requestData = TestMessage;
    postMessage(replyMessage);
  },
  appRequest: (requestMessage, ew) => {
    //Code that initiates a postMessage
    ew.postMessage(requestMessage);
  }
}

const TestMessage = {
  workerInit: TestMessageFuncs.workerInit.toString(),
  workerReply: TestMessageFuncs.workerReply.toString(),
  appRequest: TestMessageFuncs.appRequest
}
export default TestMessage;
