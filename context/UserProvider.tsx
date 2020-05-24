import * as React from 'react'
import { createContext, useReducer, useMemo, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { withApollo } from '../lib/apollo'

import {
  LOGIN,
  SIGNUP,
  SIGNOUT,
  USER_INFO,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
} from './UserQueries'
import { UserContextValue, ActionType, StateType } from './UserTypes'

export const UserContext = createContext<UserContextValue>(null)

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
  const { pathname, push } = useRouter()

  const [state, dispatch] = useReducer(reducer, initialState)

  const [signinUser] = useMutation(LOGIN)
  const [signupUser] = useMutation(SIGNUP)
  const [signoutUser] = useMutation(SIGNOUT)
  const [updateUser] = useMutation(UPDATE_USER)
  const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD)

  const { loading: userLoading, error: userError } = useQuery(USER_INFO, {
    skip:
      pathname === '/' ||
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
  const loginAction = async (email, password) => {
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

  const signupAction = async (
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

  const logoutAction = async () => {
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

    dispatch({
      type: 'UPDATE_USER',
      payload: {
        email: data?.updateUser?.email,
        avatar: data?.updateUser?.avatar,
        city: data?.updateUser?.city,
      },
    })
  }

  const updateUserPasswordAction = async (password) => {
    try {
      await updateUserPassword({ variables: password })
      return true
    } catch (error) {
      return false
    }
  }

  const value = useMemo(
    () => ({
      username: state.username,
      email: state.email,
      createdAt: state.createdAt,
      avatar: state.avatar,
      city: state.city,
      userLoading,
      loginAction,
      logoutAction,
      signupAction,
      updateUserAction,
      updateUserPasswordAction,
    }),
    [state.username, state.email, state.createdAt, state.avatar, state.city]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default withApollo(UserProvider)
