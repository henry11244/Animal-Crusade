const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    password: String!
    scores: [Int]
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
  }

  type Mutation {
    login()
    addUser(username: String!, password: String!): User
    addScore(profileId: ID!, scores: [Int]): User
    removeScore(profileId: ID!, scores: [Int]): User
  }
`;

module.exports = typeDefs;
