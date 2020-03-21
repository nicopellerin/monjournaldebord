import * as React from 'react'
import { createContext, useContext, useMemo, useReducer } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

interface MoodsContextValue {
  moods: [{ id: string; mood: string; createdAt: Date }]
  updateDailyMoodAction: (mood) => Promise<any>
}

const MoodsValue: MoodsContextValue = {
  moods: [{ id: '', mood: '', createdAt: new Date() }],
  updateDailyMoodAction: mood => {
    return mood
  },
}

export const MoodsContext = createContext(MoodsValue)

type ActionType = {
  type: 'GET_ALL_MOODS' | 'UPDATE_DAILY_MOOD'
  payload?: any
}

type StateType = {
  moods: [{ id: string; mood: string; createdAt: Date }]
}

const GET_ALL_MOODS = gql`
  query allMoods {
    getAllMoods {
      id
      mood
      createdAt
    }
  }
`

const UPDATE_DAILY_MOOD = gql`
  mutation($mood: String!) {
    updateDailyMood(mood: $mood) {
      mood
      createdAt
    }
  }
`

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'GET_ALL_MOODS':
      return {
        ...state,
        moods: action.payload,
      }
    case 'UPDATE_DAILY_MOOD':
      return {
        ...state,
        moods: [action.payload, ...state.moods],
      }
    default:
      return state
  }
}

const initialState = {
  moods: [],
}

export const MoodsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { loading: loadingMoods } = useQuery(GET_ALL_MOODS, {
    // skip: !state.username,
    onCompleted: ({ getAllMoods }) => {
      dispatch({ type: 'GET_ALL_MOODS', payload: getAllMoods })
    },
  })

  const [updateDailyMood] = useMutation(UPDATE_DAILY_MOOD, {
    onCompleted: ({ updateDailyMood }) => {
      dispatch({
        type: 'UPDATE_DAILY_MOOD',
        payload: updateDailyMood,
      })
    },
  })

  const updateDailyMoodAction = async mood => {
    const res = await updateDailyMood({
      variables: {
        mood,
      },
    })

    return res?.data?.updateDailyMood
  }

  const value = useMemo(() => {
    return {
      moods: state.moods,
      updateDailyMoodAction,
    }
  }, [state.moods])

  return <MoodsContext.Provider value={value}>{children}</MoodsContext.Provider>
}
