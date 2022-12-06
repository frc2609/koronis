export const recordSchema = {
  title: 'record',
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
    eventLog: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    positionLog: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    startDate: {
      type: 'integer'
    },
    teamNumber: {
      type: 'integer'
    },
    matchNumber: {
      type: 'integer'
    },
    matchType: {
      type: 'string',
      enum: ['t', 'pf', 'pm', 'qm', 'ef', 'qf', 'sf', 'f'],
      maxLength: 10
    },
    isRedAlliance: {
      type: 'boolean'
    },
    comments: {
      type: 'string'
    },
    year: {
      type: 'integer'
    },
    version: {
      type: 'number'
    },
    metadata: {
      type: 'object',
      properties: {
        verified: {
          type: 'boolean'
        },
        unModified: {
          type: 'boolean'
        }
      }
    }
  },
  required: [],
  indexes: [
    'lastModified',
    'startDate',
    'teamNumber',
    'matchNumber',
    'matchType',
    'year'
  ]
};
