export const recordSchema = {
  title: 'record',
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
      type: 'integer',
      index: true
    },
    teamNumber: {
      type: 'integer',
      index: true
    },
    matchNumber: {
      type: 'integer',
      index: true
    },
    matchType: {
      type: 'string', //t, pf, pm, qm, ef, qf, sf, f
      index: true
    },
    isRedAlliance: {
      type: 'boolean'
    },
    comments: {
      type: 'string'
    },
    year: {
      type: 'integer',
      index: true
    },
    version: {
      type: 'number'
    }
  },
  required: []
};
