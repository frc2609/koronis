export default class EngineWorkerAssembler {
  constructor(engineComponentList) {
    var initCode = '';
    var onMessageCode = '';
    for(var i = 0;i < engineComponentList.length;i++) {
      var currInitCode = engineComponentList[i].ec.prototype.workerInit.toString();
      currInitCode = currInitCode.substring(currInitCode.indexOf("{") + 1, currInitCode.lastIndexOf("}"));
      currInitCode += '\n';
      initCode += 'console.log(\'[Engine] Engine Component ' + engineComponentList[i].type + ' initializing\');\n' + currInitCode + 'console.log(\'[Engine] Engine Component ' + engineComponentList[i].type + ' initialized\');\n';

      var currOnMessageCode = engineComponentList[i].ec.prototype.workerReply.toString();
      currOnMessageCode = currOnMessageCode.substring(currOnMessageCode.indexOf("{") + 1, currOnMessageCode.lastIndexOf("}"));
      currOnMessageCode += '\n';
      onMessageCode += 'if(requestMessage.engineComponentType === \'' + engineComponentList[i].type + '\'){\n' + currOnMessageCode + '}\n';
    }

    var code = initCode + 'onmessage = (message) => {\nvar requestMessage = message.data;\nconsole.log(\'[Engine] Recieved Request: \' + JSON.stringify(requestMessage));\n' + onMessageCode + '};';
    const blob = new Blob([code], { type: "application/javascript" });
    return new Worker(URL.createObjectURL(blob));
  }
}
