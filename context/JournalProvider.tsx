import { createContext, useReducer, useMemo } from 'react'
import Router from 'next/router'

import mockData from '../mockData.json'

type ContextValues = {
  journals: any
  selectedJournal: Journal
  editing: boolean
  newState: boolean
  selectJournal?: (id) => void
  editSelectedJournal?: (id, title, text, createdAt) => void
  deleteSelectedJournal?: (id) => void
  toggleEditing?: () => void
  newPage?: () => void
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
    | 'SELECTED_JOURNAL'
    | 'EDIT_SELECTED_JOURNAL'
    | 'DELETE_SELECTED_JOURNAL'
    | 'TOGGLE_EDITING'
    | 'NEW_PAGE'
  payload?: any
}

type StateType = {
  journals: any
  selectedJournal: Journal
  editing: boolean
  newState: boolean
}

const initialState = {
  journals: mockData,
  selectedJournal: null,
  editing: false,
  newState: false,
}

export const JournalContext = createContext<ContextValues>(initialState)

const journalReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'SELECTED_JOURNAL':
      return {
        ...state,
        selectedJournal: state.journals.find(
          journal => journal.id === action.payload
        ),
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
        selectedJournal: state.journals[0],
      }
    case 'TOGGLE_EDITING':
      return {
        ...state,
        editing: !state.editing,
        newState: false,
      }
    case 'NEW_PAGE':
      return {
        ...state,
        journals: [
          {
            id: state.journals.length + 1,
            title: 'Sans-titre',
            text: '',
            createdAt: Date.now(),
          },
          ...state.journals,
        ],
        selectedJournal: {
          id: state.journals.length + 1,
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

export const JournalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(journalReducer, initialState)

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
    Router.push(
      `/journal/${state.journals[0].id}`,
      `/journal/${state.journals[0].id}`,
      { shallow: true }
    )
  }

  function toggleEditing() {
    dispatch({ type: 'TOGGLE_EDITING' })
  }

  function newPage() {
    dispatch({ type: 'NEW_PAGE' })
  }

  const value = useMemo(() => {
    return {
      journals: state.journals,
      selectedJournal: state.selectedJournal,
      editing: state.editing,
      newState: state.newState,
      selectJournal,
      editSelectedJournal,
      deleteSelectedJournal,
      toggleEditing,
      newPage,
    }
  }, [state.journals, state.selectedJournal, state.editing, state.newState])

  return (
    <JournalContext.Provider value={value}>{children}</JournalContext.Provider>
  )
}
