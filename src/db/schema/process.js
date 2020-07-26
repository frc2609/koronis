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
    year: {
      type: 'integer',
      index: true
    },
    queryType: {
      type: 'string',
      enum: ['record', 'match', 'team', 'event']
    },
    dataType: {
      type: 'string',
      enum: ['metric', 'array', 'chart']
    },
    name: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    function: {
      type: 'string'
    },
    metadata: {
      type: 'object',
      properties: {
        verified: {
          type: 'boolean'
        },
        unModified: {
          type: 'boolean'
        },
        safe: {
          type: 'boolean'
        }
      }
    }
  },
  required: []
};
