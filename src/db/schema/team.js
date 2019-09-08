export const teamSchema = {
  title: 'team',
  version: 0,
  type: 'object',
  properties: {
    key: {
      type: 'string' ,
      primary: true
    },
    team_number: {
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
    state_prov: {
      type: 'string'
    },
    country: {
      type: 'string'
    },
    website: {
      type: 'string'
    },
    rookie_year: {
      type: 'integer'
    },
    motto: {
      type: 'string'
    }
  },
  required: []
};
