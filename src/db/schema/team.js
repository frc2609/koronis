export const teamSchema = {
  title: 'team',
  version: 0,
  type: 'object',
  properties: {
    key: {
      type: 'string' ,
      primary: true
    },
    teamNumber: {
      type: 'integer'
    },
    nickname: {
      type: 'string'
    },
    name: {
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
    },
    motto: {
      type: 'string'
    }
  },
  required: []
};
