export const processSchema = {
  title: 'process',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    user: {
      type: 'string'
    },
    device: {
      type: 'integer'
    },
    lastModified: {
      type: 'integer',
      index: true
    },
    digitalSignature: {
      type: 'string'
    },
    changeLog: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          user: {
            type: 'string'
          },
          modificationTime: {
            type: 'integer'
          },
          id: {
            type: 'string'
          }
        }
      }
    },
    queryType: {
      type: 'string' //record, match, team, event
    },
    dataType: {
      type: 'string' //metric, chart
    }
  },
  required: []
};
