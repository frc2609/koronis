export const tbaMatchSchema = {
  title: 'tbaMatch',
  version: 0,
  type: 'object',
  properties: {
    key: {
      type: 'string',
      primary: true
    },
    lastModified: {
      type: 'integer'
    },
    compLevel: {
      type: 'string' //qm, ef, qf, sf, f
    },
    setNumber: {
      type: 'integer'
    },
    matchNumber: {
      type: 'integer'
    },
    alliances: {
      type: 'object',
      properties: {
        red: {
          type: 'object',
          properties: {
            score: {
              type: 'integer'
            },
            teamKeys: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            surrogateTeamKeys: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            dqTeamKeys: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        },
        blue: {
          type: 'object',
          properties: {
            score: {
              type: 'integer'
            },
            teamKeys: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            surrogateTeamKeys: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            dqTeamKeys: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      }
    },
    winningAlliance: {
      type: 'string'
    },
    positionLog: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    time: {
      type: 'integer'
    },
    actualTime: {
      type: 'integer',
      index: true
    },
    predictedTime: {
      type: 'integer'
    },
    scoreBreakdown: {
      type: 'string' //JSON stringify string
    },
    videos: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          videoType: {
            type: 'string' //youtube or tba
          },
          key: {
            type: 'string'
          }
        }
      }
    }
  },
  required: []
};
