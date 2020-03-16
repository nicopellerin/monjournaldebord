import * as React from 'react'
import { createContext, useReducer, useMemo } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { resolve } from 'url'

interface UserContextValue {
  login: (email, password) => void
  logout: () => void
  signup: (username, email, password, avatar) => void
  username: string
  email: string
  password: string
  createdAt: string
  avatar: string
  userLoading: boolean
}

const UserValue: UserContextValue = {
  login: () => {},
  logout: () => {},
  signup: () => {},
  username: '',
  email: '',
  password: '',
  createdAt: '',
  avatar: '',
  userLoading: false,
}

export const UserContext = createContext(UserValue)

type ActionType = {
  type: 'LOGIN' | 'USER_INFO' | 'LOGOUT' | 'SIGNUP'
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
      createdAt
      email
      token
      avatar
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
      email
      avatar
      token
    }
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
    case 'LOGIN':
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
      }
    case 'LOGOUT':
      return initialState
    case 'SIGNUP':
      return {
        ...state,
        username: action.payload.username,
      }
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
  password: '',
  createdAt: '',
  avatar: '',
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const router = useRouter()

  let skipQuery =
    !router.pathname.includes('profil') && !router.pathname.includes('journal')

  // Queries
  const [signinUser] = useMutation(LOGIN, {
    onCompleted: ({ signinUser }) => {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: signinUser.username,
          email: signinUser.email,
          avatar: signinUser.avatar,
        },
      })
    },
  })

  const [signupUser] = useMutation(SIGNUP, {
    onCompleted: ({ signupUser }) => {
      dispatch({
        type: 'SIGNUP',
        payload: {
          username: signupUser.username,
          email: signupUser.email,
          avatar: signupUser.avatar,
        },
      })
    },
  })

  const { loading: userLoading } = useQuery(USER_INFO, {
    skip: skipQuery,
    onCompleted: ({ me }) => {
      console.log(me)
      dispatch({
        type: 'USER_INFO',
        payload: { username: me.username, email: me.email, avatar: me.avatar },
      })
    },
  })

  // Actions
  const login = async (email, password) => {
    const res = await signinUser({
      variables: {
        email,
        password,
      },
    })
    return res?.data?.signinUser?.token
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const signup = async (
    username: string,
    email: string,
    password: string,
    avatar: string
  ) => {
    const res = await signupUser({
      variables: {
        username,
        email,
        password,
        avatar,
      },
    })

    return res?.data?.signupUser?.token
  }

  const value = useMemo(
    () => ({
      username: state.username,
      email: state.email,
      password: state.password,
      createdAt: state.createdAt,
      avatar: state.avatar,
      userLoading,
      login,
      logout,
      signup,
    }),
    [state.username, state.email, state.password, state.createdAt, state.avatar]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
