import * as Serializer from './Serializer';
import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

expect.extend({ toBeDeepCloseTo });

const testRecord = {
  "startDate":1641076380,
  "id":"dbc16569-840a-584f-b75f-5086710d37ae",
  "year":-1,
  "version":0,
  "teamNumber":1,
  "matchNumber":1,
  "matchType":"t",
  "isRedAlliance":true,
  "comments":"Test1",
  "user":"user1",
  "device":2822116650,
  "lastModified":1670970852,
  "digitalSignature":"ds1",
  "changeLog":[
    {"id":"dbc16569-840a-584f-b75f-5086710d37ae","user":"","modificationTime":1670970852}
  ],
  "eventLog":[
    {"id":1,"name":"pickup_mock_game_element","variables":{},"position":{"x":16,"y":15},"timeStamp":2.740999999999999},
    {"id":1,"name":"pickup_mock_game_element","variables":{},"position":{"x":13,"y":16},"timeStamp":3.988999999999999},
    {"id":2,"name":"drop_mock_game_element","variables":{},"position":{"x":11,"y":16},"timeStamp":5.297999999999996},
    {"id":2,"name":"drop_mock_game_element","variables":{},"position":{"x":12,"y":12},"timeStamp":6.413999999999995},
    {"id":0,"name":"mock_event","variables":{"number":0},"position":{"x":17,"y":11},"timeStamp":7.478999999999994},
    {"id":0,"name":"mock_event","variables":{"number":0},"position":{"x":20,"y":14},"timeStamp":8.471999999999996},
    {"id":0,"name":"mock_event","variables":{"number":0},"position":{"x":20,"y":14},"timeStamp":8.805999999999994},
    {"id":0,"name":"mock_event","variables":{"number":0},"position":{"x":19,"y":15},"timeStamp":9.252999999999995},
    {"id":0,"name":"mock_event","variables":{"number":0},"position":{"x":18,"y":15},"timeStamp":9.515999999999996},
    {"id":0,"name":"mock_event","variables":{"number":0},"position":{"x":17,"y":15},"timeStamp":9.716999999999997},
    {"id":0,"name":"mock_event","variables":{"number":0},"position":{"x":17,"y":14},"timeStamp":9.921999999999997},
    {"id":0,"name":"mock_event","variables":{"number":0},"position":{"x":17,"y":14},"timeStamp":10.132999999999997}
  ],
  "positionLog":[
    {"x":1,"y":13,"timeStamp":0},{"x":1,"y":13,"timeStamp":0.3},{"x":2,"y":13,"timeStamp":0.3},{"x":2,"y":13,"timeStamp":0.4},
    {"x":3,"y":14,"timeStamp":0.4},{"x":3,"y":14,"timeStamp":0.5},{"x":4,"y":14,"timeStamp":0.6},{"x":5,"y":14,"timeStamp":0.6},
    {"x":5,"y":14,"timeStamp":0.7},{"x":6,"y":14,"timeStamp":0.7},{"x":6,"y":14,"timeStamp":0.8},{"x":7,"y":14,"timeStamp":0.8},
    {"x":7,"y":14,"timeStamp":0.9},{"x":8,"y":14,"timeStamp":0.9},{"x":8,"y":14,"timeStamp":1},{"x":9,"y":14,"timeStamp":1},
    {"x":9,"y":14,"timeStamp":1.2},{"x":10,"y":13,"timeStamp":1.2},{"x":10,"y":13,"timeStamp":1.4},{"x":11,"y":13,"timeStamp":1.4},
    {"x":11,"y":13,"timeStamp":1.6},{"x":12,"y":13,"timeStamp":1.6},{"x":12,"y":13,"timeStamp":1.7},{"x":13,"y":13,"timeStamp":1.7},
    {"x":13,"y":13,"timeStamp":1.9},{"x":14,"y":13,"timeStamp":1.9},{"x":14,"y":13,"timeStamp":2.1},{"x":15,"y":13,"timeStamp":2.1},
    {"x":15,"y":13,"timeStamp":2.2},{"x":15,"y":14,"timeStamp":2.2},{"x":15,"y":14,"timeStamp":2.4},{"x":16,"y":14,"timeStamp":2.5},
    {"x":16,"y":15,"timeStamp":2.5},{"x":16,"y":15,"timeStamp":2.9},{"x":16,"y":16,"timeStamp":2.9},{"x":16,"y":16,"timeStamp":3.3},
    {"x":15,"y":16,"timeStamp":3.4},{"x":15,"y":16,"timeStamp":3.6},{"x":14,"y":16,"timeStamp":3.6},{"x":14,"y":16,"timeStamp":3.7},
    {"x":13,"y":16,"timeStamp":3.8},{"x":13,"y":16,"timeStamp":4},{"x":12,"y":16,"timeStamp":4},{"x":12,"y":16,"timeStamp":4.7},
    {"x":11,"y":16,"timeStamp":4.7},{"x":11,"y":16,"timeStamp":5.3},{"x":11,"y":15,"timeStamp":5.3},{"x":11,"y":15,"timeStamp":5.5},
    {"x":11,"y":14,"timeStamp":5.6},{"x":11,"y":14,"timeStamp":5.8},{"x":11,"y":13,"timeStamp":5.8},{"x":11,"y":13,"timeStamp":6.1},
    {"x":12,"y":12,"timeStamp":6.2},{"x":12,"y":12,"timeStamp":6.4},{"x":13,"y":12,"timeStamp":6.4},{"x":13,"y":12,"timeStamp":6.5},
    {"x":14,"y":12,"timeStamp":6.5},{"x":14,"y":12,"timeStamp":6.7},{"x":15,"y":12,"timeStamp":6.8},{"x":16,"y":11,"timeStamp":6.9},
    {"x":17,"y":11,"timeStamp":6.9},{"x":17,"y":11,"timeStamp":7.5},{"x":18,"y":12,"timeStamp":7.5},{"x":18,"y":12,"timeStamp":7.6},
    {"x":19,"y":12,"timeStamp":7.7},{"x":19,"y":12,"timeStamp":7.9},{"x":20,"y":12,"timeStamp":7.9},{"x":20,"y":13,"timeStamp":8},
    {"x":20,"y":13,"timeStamp":8.4},{"x":20,"y":14,"timeStamp":8.4},{"x":20,"y":14,"timeStamp":8.9},{"x":19,"y":15,"timeStamp":8.9},
    {"x":19,"y":15,"timeStamp":9.2},{"x":18,"y":15,"timeStamp":9.2},{"x":18,"y":15,"timeStamp":9.5},{"x":17,"y":15,"timeStamp":9.5},
    {"x":17,"y":15,"timeStamp":9.7},{"x":17,"y":14,"timeStamp":9.7},{"x":17,"y":14,"timeStamp":10.4},{"x":16,"y":14,"timeStamp":10.4},
    {"x":16,"y":13,"timeStamp":10.5},{"x":16,"y":13,"timeStamp":11.3}
  ]
};

test('Test serializing records using arrays', async () => {
  let serializedTestRecord = await Serializer.serializeRecord(await Serializer.serializeRecord(testRecord, true, false), false, false);
  expect(testRecord).toBeDeepCloseTo(serializedTestRecord);
});

test('Test serializing records using strings', async () => {
  let serializedTestRecord = await Serializer.serializeRecord(await Serializer.serializeRecord(testRecord, true), false);
  expect(testRecord).toBeDeepCloseTo(serializedTestRecord);
});