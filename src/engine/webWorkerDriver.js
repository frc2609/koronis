import webWorker from 'engine/webWorker';
import webWorkerEnabler from 'engine/webWorkerEnabler';

export default class webWorkerDriver {
  constructor() {
    this.ew = new webWorkerEnabler(webWorker);

    this.postTestMessage = this.postTestMessage.bind(this);
    this.onReply = this.onReply.bind(this);
    this.ew.onmessage = this.onReply;
  }
  postTestMessage() {
    console.log("Posting Test Message to engineWorker");
    this.ew.postMessage({
      type: 'TEST_MESSAGE',
      data: "This is a test message"
    })
  }
  onReply(message) {
    if(message.data.type === 'TEST_MESSAGE') {
      console.log("Recieved Test Message from engine worker");
      console.log(message.data);
    }
  }
}
