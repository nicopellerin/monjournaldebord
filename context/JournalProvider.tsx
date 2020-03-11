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
  journals: Journal[]
  selectedJournal: Journal
  editing: boolean
  newState: boolean
  length: number
  search: string
  journalsLoading: boolean
  imageUploaded: string
  toggleImageContainer: boolean
  darkMode: boolean
  setSkipQuery?: any
  selectJournal?: (id) => void
  editSelectedJournal?: (id, title, text, image, createdAt) => void
  deleteSelectedJournal?: (id) => void
  toggleEditing?: (image) => void
  newPage?: () => string
  searchJournals?: (input, router) => void
  undoNewJournal?: () => void
  uploadImage?: (image) => void
  removeUploadedImage?: () => void
  toggleDarkMode?: () => void
}

type Journal = {
  id: string
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
    | 'UPLOADED_IMAGE'
    | 'REMOVE_UPLOADED_IMAGE'
    | 'TOGGLE_OFF_IMAGE_CONTAINER'
    | 'TOGGLE_DARK_MODE'
  payload?: any
}

type StateType = {
  journals: any
  selectedJournal: Journal
  editing: boolean
  newState: boolean
  length: number
  search: string
  imageUploaded: string
  toggleImageContainer: boolean
  darkMode: boolean
}

const initialState = {
  journals: [],
  selectedJournal: null,
  editing: false,
  newState: false,
  length: 0,
  search: '',
  imageUploaded: '',
  toggleImageContainer: false,
  darkMode: false,
  journalsLoading: false,
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
        imageUploaded: action.payload,
        toggleImageContainer: action.payload ? true : false,
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
    case 'UPLOADED_IMAGE':
      return {
        ...state,
        imageUploaded: action.payload,
        toggleImageContainer: true,
      }
    case 'REMOVE_UPLOADED_IMAGE':
      return {
        ...state,
        imageUploaded: '',
      }
    case 'TOGGLE_OFF_IMAGE_CONTAINER':
      return {
        ...state,
        toggleImageContainer: false,
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
        imageUploaded: '',
        toggleImageContainer: false,
      }
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
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
        thunkDispatch({ type: 'LOAD_ALL_JOURNALS', payload: data.journals })
        setSkipQuery(true)
      },
    }
  )

  // Actions
  const selectJournal = id => {
    dispatch({ type: 'SELECTED_JOURNAL', payload: id })
  }

  const editSelectedJournal = (id, title, text, image, createdAt) => {
    setSkipQuery(false)
    dispatch({
      type: 'EDIT_SELECTED_JOURNAL',
      payload: { title, text, id, image, createdAt },
    })
  }

  const deleteSelectedJournal = id => {
    setSkipQuery(false)
    dispatch({ type: 'DELETE_SELECTED_JOURNAL', payload: id })
  }

  const toggleEditing = image => {
    dispatch({ type: 'TOGGLE_EDITING', payload: image })
    if (image) {
      dispatch({ type: 'UPLOADED_IMAGE', payload: image })
    }
  }

  const newPage = () => {
    const id = uuidv4()
    setSkipQuery(true)
    dispatch({ type: 'NEW_PAGE', payload: id })
    return id
  }

  const searchJournals = (input, router) => {
    dispatch({ type: 'SEARCH_JOURNALS', payload: input })
    router.push('/recherche', '/recherche', { shallow: true })
  }

  const undoNewJournal = () => {
    dispatch({ type: 'UNDO_NEW_JOURNAL' })
  }

  const uploadImage = image => {
    dispatch({ type: 'UPLOADED_IMAGE', payload: image })
  }

  const removeUploadedImage = () => {
    dispatch({ type: 'TOGGLE_OFF_IMAGE_CONTAINER' })
    setTimeout(() => dispatch({ type: 'REMOVE_UPLOADED_IMAGE' }), 1000)
  }

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' })
  }

  const value = useMemo(() => {
    return {
      journals: state.journals,
      selectedJournal: state.selectedJournal,
      editing: state.editing,
      newState: state.newState,
      length: state.length,
      search: state.search,
      imageUploaded: state.imageUploaded,
      toggleImageContainer: state.toggleImageContainer,
      journalsLoading,
      darkMode: state.darkMode,
      selectJournal,
      editSelectedJournal,
      deleteSelectedJournal,
      toggleEditing,
      newPage,
      searchJournals,
      setSkipQuery,
      undoNewJournal,
      uploadImage,
      removeUploadedImage,
      toggleDarkMode,
    }
  }, [
    state.journals,
    state.selectedJournal,
    state.editing,
    state.newState,
    state.search,
    state.imageUploaded,
    state.toggleImageContainer,
    state.darkMode,
  ])

  return (
    <JournalContext.Provider value={value}>{children}</JournalContext.Provider>
  )
}
