export const eventSchema = {
  title: 'event',
  version: 0,
  type: 'object',
  properties: {
    key: {
      type: 'string',
      primary: true
    },
    nickname: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    year: {
      type: 'integer',
      index: true
    },
    week: {
      type: 'integer',
      index: true
    },
    startDate: {
      type: 'integer',
      index: true
    },
    endDate: {
      type: 'integer',
      index: true
    },
    lat: {
      type: 'number'
    },
    lng: {
      type: 'number'
    },
    teams: {
      type: 'array',
      items: {
        type: 'integer'
      }
    }
  },
  required: []
};
