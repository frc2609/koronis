export const eventSchema = {
  title: 'event',
  version: 0,
  primaryKey: 'key',
  type: 'object',
  properties: {
    key: {
      type: 'string',
      maxLength: 100
    },
    nickname: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    year: {
      type: 'integer'
    },
    week: {
      type: 'integer'
    },
    startDate: {
      type: 'integer'
    },
    endDate: {
      type: 'integer'
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
  required: [],
  indexes: [
    'year',
    'week',
    'startDate',
    'endDate'
  ]
};
