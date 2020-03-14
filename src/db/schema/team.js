export const teamSchema = {
  keyCompression: true,
  title: 'team',
  version: 0,
  type: 'object',
  properties: {
    key: {
      type: 'string' ,
      primary: true
    },
    teamNumber: {
      type: 'integer',
      index: true
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
  required: []
};
