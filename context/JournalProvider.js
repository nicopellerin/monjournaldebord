import { createContext, useReducer } from "react"

import mockData from "../mockData.json"

export const JournalContext = createContext(null)

const initialState = {
  journals: mockData,
  selectedJournal: null,
  editing: false
}

const journalReducer = (state, action) => {
  switch (action.type) {
    case "SELECTED_JOURNAL":
      return {
        ...state,
        selectedJournal: state.journals.find(
          journal => journal.id === action.payload
        ),
        editing: false
      }
    case "EDIT_SELECTED_JOURNAL":
      return {
        ...state,
        selectedJournal: {
          id: action.payload.id,
          title: action.payload.title,
          text: action.payload.text,
          createdAt: action.payload.createdAt
        },
        editing: false
      }
    case "TOGGLE_EDITING":
      return {
        ...state,
        editing: !state.editing
      }
    case "NEW_PAGE":
      return {
        ...state
      }
    default:
      return state
  }
}

export const JournalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(journalReducer, initialState)

  // Actions
  function selectJournal(id) {
    dispatch({ type: "SELECTED_JOURNAL", payload: id })
  }

  function editSelectedJournal(title, text) {
    dispatch({ type: "EDIT_SELECTED_JOURNAL", payload: { title, text } })
  }

  function toggleEditing() {
    dispatch({ type: "TOGGLE_EDITING" })
  }

  function newPage() {
    dispatch({ type: "NEW_PAGE" })
  }

  return (
    <JournalContext.Provider
      value={{
        journals: state.journals,
        selectedJournal: state.selectedJournal,
        editing: state.editing,
        selectJournal,
        editSelectedJournal,
        toggleEditing
      }}
    >
      {children}
    </JournalContext.Provider>
  )
}
