import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      username
      avatar
      email
    }
  }
`

export const SIGNUP = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
    $avatar: String
  ) {
    signupUser(
      username: $username
      email: $email
      password: $password
      avatar: $avatar
    ) {
      username
      avatar
      email
    }
  }
`

export const SIGNOUT = gql`
  mutation {
    signoutUser
  }
`

export const USER_INFO = gql`
  {
    me {
      username
      email
      avatar
      city
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser(
    $username: String!
    $email: String
    $avatar: String
    $city: String
  ) {
    updateUser(
      username: $username
      email: $email
      avatar: $avatar
      city: $city
    ) {
      username
      avatar
      email
      city
    }
  }
`

export const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword($password: String!) {
    updateUserPassword(password: $password)
  }
`
