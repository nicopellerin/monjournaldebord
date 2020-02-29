import { createContext, useReducer, useMemo } from "react"

import mockData from "../mockData.json"

export const JournalContext = createContext(null)

const initialState = {
  journals: mockData,
  selectedJournal: null,
  editing: false,
  newState: false
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
    case "DELETE_SELECTED_JOURNAL":
      return {
        ...state,
        journals: state.journals.filter(
          journal => journal.id !== action.payload
        ),
        selectedJournal: state.journals[0]
      }
    case "TOGGLE_EDITING":
      return {
        ...state,
        editing: !state.editing
      }
    case "NEW_PAGE":
      return {
        ...state,
        journals: [
          {
            id: state.journals.length + 1,
            title: "Sans-titre",
            text: "",
            createdAt: Date.now()
          },
          ...state.journals
        ],
        selectedJournal: {
          id: state.journals.length + 1,
          title: "Sans-titre",
          text: "",
          createdAt: Date.now()
        },
        editing: true,
        newState: true
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

  function editSelectedJournal(id, title, text, createdAt) {
    dispatch({
      type: "EDIT_SELECTED_JOURNAL",
      payload: { title, text, id, createdAt }
    })
  }

  function deleteSelectedJournal(id) {
    dispatch({ type: "DELETE_SELECTED_JOURNAL", payload: id })
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
        newState: state.newState,
        selectJournal,
        editSelectedJournal,
        deleteSelectedJournal,
        toggleEditing,
        newPage
      }}
    >
      {children}
    </JournalContext.Provider>
  )
}
