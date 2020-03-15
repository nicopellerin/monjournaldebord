import * as React from 'react'
import { createContext, useReducer, useMemo } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'

interface UserContextValue {
  login: (email, password) => void
  logout: () => void
  username: string
  email: string
  password: string
  createdAt: string
  userLoading: boolean
}

const UserValue: UserContextValue = {
  login: () => {},
  logout: () => {},
  username: '',
  email: '',
  password: '',
  createdAt: '',
  userLoading: false,
}

export const UserContext = createContext(UserValue)

type ActionType = {
  type: 'LOGIN' | 'USER_INFO' | 'LOGOUT'
  payload?: any
}

type StateType = {
  username: string
  email: string
  password: string
  createdAt: string
}

const LOGIN = gql`
  mutation($email: String, $password: String) {
    signinUser(email: $email, password: $password) {
      username
      createdAt
      email
      token
    }
  }
`

const USER_INFO = gql`
  {
    me {
      username
      email
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
    case 'USER_INFO':
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
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
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const router = useRouter()

  let skipQuery = !router.pathname.includes('profil')

  const [signinUser] = useMutation(LOGIN, {
    onCompleted: ({ signinUser }) => {
      dispatch({
        type: 'LOGIN',
        payload: { username: signinUser.username, email: signinUser.email },
      })
    },
  })

  const { loading: userLoading } = useQuery(USER_INFO, {
    skip: skipQuery,
    onCompleted: ({ me }) => {
      dispatch({
        type: 'USER_INFO',
        payload: { username: me.username, email: me.email },
      })
    },
  })

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

  const value = useMemo(
    () => ({
      username: state.username,
      email: state.email,
      password: state.password,
      createdAt: state.createdAt,
      userLoading,
      login,
      logout,
    }),
    [state.username, state.email, state.password, state.createdAt]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
