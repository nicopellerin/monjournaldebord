import * as React from 'react'
import { createContext, useReducer, useMemo } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'

interface UserContextValue {
  login: (email, password) => void
  logout: () => void
  signup: (username, email, password, avatar) => void
  username: string
  email: string
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
      token
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

  const router = useRouter()

  let skipQuery =
    !router.pathname.includes('profil') && !router.pathname.includes('journal')

  const [signinUser] = useMutation(LOGIN)
  const [signupUser] = useMutation(SIGNUP)

  const { loading: userLoading } = useQuery(USER_INFO, {
    skip: skipQuery,
    onCompleted: ({ me }) => {
      dispatch({
        type: 'USER_INFO',
        payload: {
          username: me.username,
          email: me.email,
          avatar: me.avatar,
        },
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
