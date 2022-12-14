import * as Serializer from './Serializer';
import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

expect.extend({ toBeDeepCloseTo });

const testProcess = {
  "id":"4978dd65-c152-5226-8a43-78de114d3658",
  "year":-1,
  "digitalSignature":"ds1",
  "queryType":"record",
  "dataType":"metric",
  "name":"average-speed",
  "title":"Average Robot Speed (ft/s)",
  "description":"Average robot speed (ft/s) during a match. Calculated by measuring total distance traveled by the robot divided by the total time recorded.",
  "function":"data.positionLog.sort((e1, e2) => { return e1.timeStamp - e2.timeStamp });\nlet totalDistance = 0;\nlet totalTime = 0;\nfor(let i = 1;i < data.positionLog.length;i++) {\n  let currPosition = data.positionLog[i];\n  let prevPosition = data.positionLog[i-1];\n  let diffX = currPosition.x - prevPosition.x;\n  let diffY = currPosition.y - prevPosition.y;\n  totalDistance += Math.sqrt((diffX * diffX) + (diffY * diffY));\n  totalTime = currPosition.timeStamp;\n}\nreturn totalDistance / totalTime;\n",
  "user":"user1",
  "device":723302206,
  "lastModified":1646254751,
  "changeLog":[
    {"id":"4978dd65-c152-5226-8a43-78de114d3658","user":"","modificationTime":1646254751}
  ]
};

test('Test serializing processes using arrays', async () => {
  let serializedTestProcess = await Serializer.serializeProcess(await Serializer.serializeProcess(testProcess, true, false), false, false);
  expect(testProcess).toBeDeepCloseTo(serializedTestProcess);
});

test('Test serializing processes using strings', async () => {
  let serializedTestProcess = await Serializer.serializeProcess(await Serializer.serializeProcess(testProcess, true), false);
  expect(testProcess).toBeDeepCloseTo(serializedTestProcess);
});