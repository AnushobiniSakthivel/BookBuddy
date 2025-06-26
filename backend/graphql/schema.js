const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Message {
    _id: ID!
    name: String!
    email: String!
    message: String!
    timestamp: String
  }

  type Query {
    hello: String
    getUser(_id: ID!): User
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): String
    submitMessage(name: String!, email: String!, message: String!): String
    loginUser(email: String!, password: String!): User
    updateUser(_id: ID!, name: String, email: String, password: String): User
    deleteUser(_id: ID!): String
  }
`;

module.exports = typeDefs;