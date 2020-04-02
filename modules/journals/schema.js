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

  type PrivateJournals {
    journals: [Journal]
    avatar: String
    city: String
  }

  type Query {
    journals: [Journal]
    journal(id: ID): Journal
    publicJournals(username: String): PrivateJournals
    publicJournal(id: ID): Journal
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
