const _ = require('lodash');
const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQueryType = require('./root_query_type');
const mutations = require('./mutations');
const LyricType = require('./lyric_type');
const SongType = require('./song_type');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations,
  typeDef: {
    schema: [
      LyricType,
      SongType
    ]
  }
});
