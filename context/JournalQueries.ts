import gql from 'graphql-tag'

export const ALL_JOURNALS = gql`
  {
    journals {
      id
      title
      text
      image
      createdAt
      mood
      status
    }
  }
`

export const ADD_JOURNAL = gql`
  mutation(
    $title: String!
    $text: String!
    $image: String
    $mood: String!
    $status: String!
  ) {
    addJournal(
      title: $title
      text: $text
      image: $image
      mood: $mood
      status: $status
    ) {
      id
      title
      text
      image
      createdAt
      mood
      status
    }
  }
`

export const EDIT_JOURNAL = gql`
  mutation(
    $id: ID!
    $title: String!
    $text: String!
    $image: String
    $mood: String!
    $status: String!
  ) {
    editJournal(
      id: $id
      title: $title
      text: $text
      image: $image
      mood: $mood
      status: $status
    ) {
      id
      title
      text
      image
      createdAt
      mood
      status
    }
  }
`

export const GET_JOURNAL = gql`
  query journal($id: ID!) {
    journal(id: $id) {
      id
      title
      text
      image
      createdAt
      mood
      status
    }
  }
`

export const DELETE_JOURNAL = gql`
  mutation($id: ID!) {
    deleteJournal(id: $id) {
      id
    }
  }
`
