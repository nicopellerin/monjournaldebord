import * as React from 'react'
import { createContext, useReducer, useMemo, useEffect } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'

type User = {
  username: string
  email: string
  createdAt: string
  avatar: string
}

interface UserContextValue {
  login: (email, password) => Promise<User>
  logout: () => Promise<boolean>
  signup: (username, email, password, avatar) => void
  username: string
  email: string
  createdAt: string
  avatar: string
  userLoading: boolean
}

const UserValue: UserContextValue = {
  login: async () => ({ username: '', email: '', createdAt: '', avatar: '' }),
  logout: async () => false,
  signup: () => {},
  username: '',
  email: '',
  createdAt: '',
  avatar: '',
  userLoading: false,
}

export const UserContext = createContext(UserValue)

type ActionType = {
  type: 'USER_INFO' | 'LOGOUT' | 'UPDATE_DAILY_MOOD'
  payload?: any
}

type StateType = {
  username: string
  email: string
  password: string
  createdAt: string
  avatar: string
}

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      username
      avatar
      email
    }
  }
`

const SIGNUP = gql`
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

const SIGNOUT = gql`
  mutation {
    signoutUser
  }
`

const USER_INFO = gql`
  {
    me {
      username
      email
      avatar
    }
  }
`

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'LOGOUT':
      return initialState
    case 'USER_INFO':
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        avatar: action.payload.avatar,
      }

    default:
      return state
  }
}

const initialState = {
  username: '',
  email: '',
  createdAt: '',
  avatar: '',
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { pathname, push } = useRouter()

  const [signinUser] = useMutation(LOGIN)
  const [signupUser] = useMutation(SIGNUP)
  const [signoutUser] = useMutation(SIGNOUT)

  const { loading: userLoading } = useQuery(USER_INFO, {
    skip: pathname === '/connexion',
    ssr: true,
    onError: () => {
      push('/connexion')
    },
    onCompleted: ({ me }) => {
      dispatch({
        type: 'USER_INFO',
        payload: {
          username: me.username,
          avatar: me.avatar,
          email: me.email,
        },
      })
    },
  })

  // Actions
  const login = async (email, password) => {
    const { data } = await signinUser({
      variables: {
        email,
        password,
      },
    })

    dispatch({
      type: 'USER_INFO',
      payload: {
        username: data.signinUser.username,
        avatar: data.signinUser.avatar,
        email: data.signinUser.email,
      },
    })

    return data.signinUser
  }

  const logout = async () => {
    await signoutUser()
    dispatch({ type: 'LOGOUT' })

    return true
  }

  const signup = async (
    username: string,
    email: string,
    password: string,
    avatar: string
  ) => {
    signupUser({
      variables: {
        username,
        email,
        password,
        avatar,
      },
    })
  }

  const value = useMemo(
    () => ({
      username: state.username,
      email: state.email,
      createdAt: state.createdAt,
      avatar: state.avatar,
      userLoading,
      login,
      logout,
      signup,
    }),
    [state.username, state.email, state.createdAt, state.avatar]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
