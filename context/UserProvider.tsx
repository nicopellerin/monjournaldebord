import * as React from 'react'
import { createContext, useReducer, useMemo, useEffect } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { withApollo } from '../lib/apollo'

type User = {
  username: string
  email: string
  createdAt: string
  avatar: string
  city: string
}

interface UserContextValue {
  login: (email, password) => Promise<User>
  logout: () => Promise<boolean>
  signup: (username, email, password, avatar) => Promise<User>
  updateUserAction: (username, email, avatar, city) => void
  username: string
  email: string
  createdAt: string
  avatar: string
  city: string
  userLoading: boolean
}

const UserValue: UserContextValue = {
  login: async () => ({
    username: '',
    email: '',
    createdAt: '',
    avatar: '',
    city: '',
  }),
  logout: async () => false,
  signup: async () => ({
    username: '',
    email: '',
    createdAt: '',
    avatar: '',
    city: '',
  }),
  updateUserAction: async () => ({
    username: '',
    email: '',
    createdAt: '',
    avatar: '',
    city: '',
  }),
  username: '',
  email: '',
  createdAt: '',
  avatar: '',
  city: '',
  userLoading: false,
}

export const UserContext = createContext(UserValue)

type ActionType = {
  type: 'USER_INFO' | 'LOGOUT' | 'UPDATE_DAILY_MOOD' | 'UPDATE_USER'
  payload?: any
}

type StateType = {
  username: string
  email: string
  password: string
  createdAt: string
  avatar: string
  city: string
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
      city
    }
  }
`

const UPDATE_USER = gql`
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
        city: action.payload.city,
      }
    case 'UPDATE_USER':
      return {
        ...state,
        email: action.payload.email,
        avatar: action.payload.avatar,
        city: action.payload.city,
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
  city: '',
}

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { pathname, push } = useRouter()

  const [signinUser] = useMutation(LOGIN)
  const [signupUser] = useMutation(SIGNUP)
  const [signoutUser] = useMutation(SIGNOUT)

  const [updateUser] = useMutation(UPDATE_USER)

  const { loading: userLoading, error: userError } = useQuery(USER_INFO, {
    skip:
      pathname === '/connexion' ||
      pathname === '/inscription' ||
      pathname.includes('blogue'),
    ssr: true,
    onError: () => {
      push('/connexion')
    },
    pollInterval:
      pathname === '/connexion' ||
      pathname === '/inscription' ||
      pathname.includes('blogue')
        ? 0
        : 20000,
    onCompleted: ({ me }) => {
      dispatch({
        type: 'USER_INFO',
        payload: {
          username: me.username,
          avatar: me.avatar,
          email: me.email,
          city: me.city,
        },
      })
    },
  })

  useEffect(() => {
    if (userError) {
      push('/connexion')
    }
  }, [userError])

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
        city: data.signinUser.city,
      },
    })

    return data.signinUser
  }

  const signup = async (
    username: string,
    email: string,
    password: string,
    avatar: string
  ) => {
    const { data } = await signupUser({
      variables: {
        username,
        email,
        password,
        avatar,
      },
    })

    return data?.signupUser
  }

  const logout = async () => {
    await signoutUser()
    dispatch({ type: 'LOGOUT' })

    return true
  }

  const updateUserAction = async (username, email, avatar, city) => {
    const { data } = await updateUser({
      variables: {
        username,
        email,
        avatar,
        city,
      },
    })

    console.log(data)

    dispatch({
      type: 'UPDATE_USER',
      payload: {
        email: data?.updateUser?.email,
        avatar: data?.updateUser?.avatar,
        city: data?.updateUser?.city,
      },
    })
  }

  const value = useMemo(
    () => ({
      username: state.username,
      email: state.email,
      createdAt: state.createdAt,
      avatar: state.avatar,
      city: state.city,
      userLoading,
      login,
      logout,
      signup,
      updateUserAction,
    }),
    [state.username, state.email, state.createdAt, state.avatar, state.city]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default withApollo(UserProvider)
