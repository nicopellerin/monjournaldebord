import gql from 'graphql-tag'

export const users = gql`
  type User {
    username: String!
    email: String!
    password: String!
    createdAt: Date
    token: String
    avatar: String
    city: String
  }

  type Mood {
    id: ID!
    author: User
    mood: String
    createdAt: Date
  }

  type Token {
    token: String!
  }

  type Query {
    me: User
    getAllMoods: [Mood]
  }

  type Mutation {
    signupUser(
      username: String!
      email: String!
      password: String!
      avatar: String
    ): User!
    signinUser(email: String!, password: String!): User!
    signoutUser: Boolean
    updateUser(
      username: String!
      email: String
      avatar: String
      city: String
      password: String
    ): User
    updateUserPassword(password: String): Boolean
    updateDailyMood(mood: String!): Mood
    deleteSingleMood(id: ID!): Mood
  }
`
