import React, {
  createContext,
  useReducer,
  useMemo,
  useCallback,
  useState,
} from 'react'
import Router from 'next/router'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

type ContextValues = {
  journals: any
  selectedJournal: Journal
  editing: boolean
  newState: boolean
  length: number
  search: string
  selectJournal?: (id) => void
  editSelectedJournal?: (id, title, text, createdAt) => void
  deleteSelectedJournal?: (id) => void
  toggleEditing?: () => void
  newPage?: () => void
  searchJournals?: (input, router) => void
}

type Journal = {
  id: number
  title: string
  text: string
  createdAt: string
  image: string
}

type ActionType = {
  type:
    | 'LOAD_ALL_JOURNALS'
    | 'SELECTED_JOURNAL'
    | 'EDIT_SELECTED_JOURNAL'
    | 'DELETE_SELECTED_JOURNAL'
    | 'TOGGLE_EDITING'
    | 'NEW_PAGE'
    | 'SEARCH_JOURNALS'
  payload?: any
}

type StateType = {
  journals: any
  selectedJournal: Journal
  editing: boolean
  newState: boolean
  length: number
  search: string
}

const initialState = {
  journals: [],
  selectedJournal: null,
  editing: false,
  newState: false,
  length: 0,
  search: '',
}

export const JournalContext = createContext<ContextValues>(initialState)

const journalReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'LOAD_ALL_JOURNALS':
      return {
        ...state,
        journals: action.payload,
      }
    case 'SELECTED_JOURNAL':
      return {
        ...state,
        selectedJournal: state.journals?.find(
          journal => journal.id === action.payload
        ),
        length: state.journals?.length,
        editing: false,
      }
    case 'EDIT_SELECTED_JOURNAL':
      return {
        ...state,
        selectedJournal: {
          id: action.payload.id,
          title: action.payload.title,
          text: action.payload.text,
          createdAt: action.payload.createdAt,
        },
        editing: false,
        newState: false,
      }
    case 'DELETE_SELECTED_JOURNAL':
      return {
        ...state,
        journals: state.journals.filter(
          journal => journal.id !== action.payload
        ),
        // selectedJournal: state.journals[0],
      }
    case 'TOGGLE_EDITING':
      return {
        ...state,
        editing: !state.editing,
        newState: false,
      }
    case 'SEARCH_JOURNALS':
      return {
        ...state,
        search: action.payload,
      }
    case 'NEW_PAGE':
      return {
        ...state,
        journals: [
          {
            // TODO - Fix this to real ID

            id: state.journals[0]?.id + 1,
            title: 'Sans-titre',
            text: '',
            createdAt: Date.now(),
          },
          ...state.journals,
        ],
        selectedJournal: {
          // TODO - Fix this to real ID

          id: state.journals[0]?.id + 1,
          title: 'Sans-titre',
          text: '',
          createdAt: Date.now(),
        },
        editing: true,
        newState: true,
      }
    default:
      return state
  }
}

const ALL_JOURNALS = gql`
  {
    journals {
      id
      title
      text
      image
      createdAt
    }
  }
`

export const JournalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(journalReducer, initialState)
  const [skipQuery, setSkipQuery] = useState(false)

  const thunkDispatch = useCallback(
    action => {
      console.log(action)
      if (typeof action === 'function') {
        action(dispatch)
      } else {
        dispatch(action)
      }
    },
    [dispatch]
  )

  // Load all journals data
  const { loading, data: allJournals } = useQuery(ALL_JOURNALS, {
    skip: skipQuery,
    onCompleted: data => {
      thunkDispatch({ type: 'LOAD_ALL_JOURNALS', payload: data.journals })
      setSkipQuery(true)
    },
  })

  // Actions
  function selectJournal(id) {
    dispatch({ type: 'SELECTED_JOURNAL', payload: id })
  }

  function editSelectedJournal(id, title, text, createdAt) {
    dispatch({
      type: 'EDIT_SELECTED_JOURNAL',
      payload: { title, text, id, createdAt },
    })
  }

  function deleteSelectedJournal(id) {
    dispatch({ type: 'DELETE_SELECTED_JOURNAL', payload: id })
  }

  function toggleEditing() {
    dispatch({ type: 'TOGGLE_EDITING' })
  }

  function newPage() {
    dispatch({ type: 'NEW_PAGE' })
  }

  function searchJournals(input, router) {
    dispatch({ type: 'SEARCH_JOURNALS', payload: input })
    router.push('/recherche', '/recherche', { shallow: true })
  }

  const value = useMemo(() => {
    return {
      journals: state.journals,
      selectedJournal: state.selectedJournal,
      editing: state.editing,
      newState: state.newState,
      length: state.length,
      search: state.search,
      selectJournal,
      editSelectedJournal,
      deleteSelectedJournal,
      toggleEditing,
      newPage,
      searchJournals,
    }
  }, [
    state.journals,
    state.selectedJournal,
    state.editing,
    state.newState,
    state.search,
  ])

  return (
    <JournalContext.Provider value={value}>{children}</JournalContext.Provider>
  )
}
