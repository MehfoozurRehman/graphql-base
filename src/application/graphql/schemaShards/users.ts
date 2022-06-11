import container from '../../../IoC/container';
import { gql } from 'apollo-server';

const typeDefs = gql`
  extend type Query {
    " login as a user "
    loginUser(input: InputLogin!): User
    " get a user's public data"
    getUser(id: ID!): PublicUser
  }

  extend type Mutation {
    " register a new user "
    registerUser(input: InputRegisterUser!): User
  }

  " used for logging in "
  input InputLogin {
    email: String!
    password: String!
  }

  " used for creating a new user "
  input InputRegisterUser {
    name: String!
    email: String!
    password: String!
  }

  " a type defining a user's public data "
  type PublicUser {
    id: ID
    name: String
    email: String
  }

  " a type defining a user  "
  type User {
    id: ID
    name: String
    email: String
    token: String
  }
`;

export default {
  resolvers: {
    Query: {
      // login
      loginUser: (root: any, { input: { email, password } }: GQL.QueryToLoginUserArgs) =>
        container.cradle.authService.authenticateUser(email, password),
      // get a user
      getUser: (root: any, { id }: GQL.QueryToGetUserArgs) => container.cradle.userService.getUserById(id),
    },
    Mutation: {
      // register
      registerUser: (root: any, { input }: GQL.MutationToRegisterUserArgs) =>
        container.cradle.userService.register(input),
    },
  },
  typeDefs: [typeDefs],
};
