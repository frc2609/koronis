export const processSchema = {
  title: 'process',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    user: {
      type: 'string'
    },
    device: {
      type: 'integer'
    },
    lastModified: {
      type: 'integer'
    },
    digitalSignature: {
      type: 'string',
      default: ''
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
      type: 'integer'
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
      type: 'string',
      maxLength: 1000
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
  required: [],
  indexes: [
    'lastModified',
    'year',
    'title'
  ]
};
