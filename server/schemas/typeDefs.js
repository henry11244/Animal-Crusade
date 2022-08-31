const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    password: String!
    scores: []
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
  }

  type Mutation {
    addUser(username: String!): User
    addScore(profileId: ID!, scores: []): User
    removeScore(profileId: ID!, scores: []): User
  }
`;

module.exports = typeDefs;
