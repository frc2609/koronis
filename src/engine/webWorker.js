export default function webWorker() {
  onmessage = (message) => {
    if(message.data.type === 'TEST_MESSAGE') {
      console.log("Worker recieved Test Message: ");
      console.log(message.data);
      postMessage({
        type: 'TEST_MESSAGE',
        data: "This is a reply test message"
      });
    }
  };
}
