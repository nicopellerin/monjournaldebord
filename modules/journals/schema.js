import gql from 'graphql-tag'

export const journals = gql`
  scalar Date

  type Journal {
    id: ID!
    title: String!
    text: String!
    image: String
    mood: String!
    createdAt: Date
    status: String!
    author: User!
  }

  type Query {
    journals(filter: String, username: String): [Journal]
    journal(id: ID): Journal
  }

  type Mutation {
    addJournal(
      title: String!
      text: String!
      image: String
      mood: String!
      status: String!
    ): Journal

    editJournal(
      id: ID!
      title: String!
      text: String!
      image: String
      mood: String!
      status: String!
    ): Journal

    deleteJournal(id: ID!): Journal
  }
`
