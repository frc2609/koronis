export const teamSchema = {
  title: 'team',
  version: 0,
  primaryKey: 'key',
  type: 'object',
  properties: {
    key: {
      type: 'string',
      maxLength: 100
    },
    teamNumber: {
      type: 'integer',
      minimum: 0,
      maximum: 100000
    },
    nickname: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    schoolName: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    stateProv: {
      type: 'string'
    },
    country: {
      type: 'string'
    },
    website: {
      type: 'string'
    },
    rookieYear: {
      type: 'integer'
    }
  },
  required: [],
  indexes: [
    'teamNumber'
  ]
};
