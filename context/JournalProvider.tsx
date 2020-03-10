import React, {
  createContext,
  useReducer,
  useMemo,
  useCallback,
  useState,
} from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { v4 as uuidv4 } from 'uuid'

type ContextValues = {
  journals: any
  selectedJournal: Journal
  editing: boolean
  newState: boolean
  length: number
  search: string
  journalsLoading?: boolean
  selectJournal?: (id) => void
  editSelectedJournal?: (id, title, text, image, createdAt) => void
  deleteSelectedJournal?: (id) => void
  toggleEditing?: () => void
  newPage?: () => void
  searchJournals?: (input, router) => void
  undoNewJournal?: () => void
  setSkipQuery?: any
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
    | 'UNDO_NEW_JOURNAL'
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
          image: action.payload.image,
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
        // selectedJournal: state.journals[1],
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
    case 'UNDO_NEW_JOURNAL':
      return {
        ...state,
        journals: state.journals.splice(1),
      }
    case 'NEW_PAGE':
      return {
        ...state,
        journals: [
          {
            // TODO - Fix this to real ID
            id: action.payload,
            title: 'Sans-titre',
            text: '',
            image: '',
            createdAt: Date.now(),
          },
          ...state.journals,
        ],
        selectedJournal: {
          // TODO - Fix this to real ID
          id: action.payload,
          title: 'Sans-titre',
          text: '',
          image: '',
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
  query allJournals {
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
  const { loading: journalsLoading, data: allJournals } = useQuery(
    ALL_JOURNALS,
    {
      skip: skipQuery,
      onCompleted: data => {
        setSkipQuery(false)
        thunkDispatch({ type: 'LOAD_ALL_JOURNALS', payload: data.journals })
      },
    }
  )

  // Actions
  const selectJournal = useCallback(
    id => {
      dispatch({ type: 'SELECTED_JOURNAL', payload: id })
    },
    [dispatch]
  )

  const editSelectedJournal = useCallback(
    (id, title, text, image, createdAt) => {
      setSkipQuery(false)
      dispatch({
        type: 'EDIT_SELECTED_JOURNAL',
        payload: { title, text, id, image, createdAt },
      })
    },
    [dispatch]
  )

  const deleteSelectedJournal = useCallback(
    id => {
      setSkipQuery(false)
      dispatch({ type: 'DELETE_SELECTED_JOURNAL', payload: id })
    },
    [dispatch]
  )

  const toggleEditing = useCallback(() => {
    dispatch({ type: 'TOGGLE_EDITING' })
  }, [dispatch])

  const newPage = useCallback(() => {
    const id = uuidv4()
    setSkipQuery(true)
    dispatch({ type: 'NEW_PAGE', payload: id })
    return id
  }, [dispatch])

  const searchJournals = useCallback(
    (input, router) => {
      dispatch({ type: 'SEARCH_JOURNALS', payload: input })
      router.push('/recherche', '/recherche', { shallow: true })
    },
    [dispatch]
  )

  const undoNewJournal = useCallback(() => {
    dispatch({ type: 'UNDO_NEW_JOURNAL' })
  }, [dispatch])

  const value = useMemo(() => {
    return {
      journals: state.journals,
      selectedJournal: state.selectedJournal,
      editing: state.editing,
      newState: state.newState,
      length: state.length,
      search: state.search,
      journalsLoading,
      selectJournal,
      editSelectedJournal,
      deleteSelectedJournal,
      toggleEditing,
      newPage,
      searchJournals,
      setSkipQuery,
      undoNewJournal,
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
