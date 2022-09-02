const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    password: String!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
  }

  type Mutation {
    login(username: String!, password: String!): User
    addUser(username: String!, password: String!): User
  }
`;

module.exports = typeDefs;