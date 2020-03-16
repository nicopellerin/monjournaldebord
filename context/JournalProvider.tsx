import * as React from 'react'
import { createContext, useReducer, useMemo, useCallback } from 'react'
import {
  useQuery,
  useMutation,
  useLazyQuery,
  useApolloClient,
} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { v4 as uuidv4 } from 'uuid'

type Journal = {
  id: string
  title: string
  text: string
  createdAt: string
  image: string
  mood: string
}

interface ContextValue {
  journals: Journal[]
  selectedJournal: Journal
  editing: boolean
  newState: boolean
  length: number
  search: string
  journalsLoading: boolean
  singleJournalLoading: boolean
  imageUploaded: string
  toggleImageContainer: boolean
  darkMode: boolean
  selectJournal: (id: string | string[]) => void
  editSelectedJournal: (
    id: string,
    title: string,
    text: string,
    image: string,
    createdAt: string,
    mood: string
  ) => void
  addNewJournal: (
    title: string,
    text: string,
    image: string,
    mood: string
  ) => void
  deleteSelectedJournal: (id: string) => void
  toggleEditing: (image: string) => void
  newPage: () => string
  searchJournals: (input, router) => void
  undoNewJournal: (id: string) => void
  uploadImage: (image: string) => void
  removeUploadedImage: () => void
  toggleDarkMode: () => void
}

const JournalValue: ContextValue = {
  journals: [],
  selectedJournal: null,
  editing: false,
  newState: false,
  length: 0,
  search: '',
  journalsLoading: false,
  singleJournalLoading: false,
  imageUploaded: '',
  toggleImageContainer: false,
  darkMode: false,
  selectJournal: () => {},
  editSelectedJournal: () => {},
  addNewJournal: () => {},
  deleteSelectedJournal: () => {},
  toggleEditing: () => {},
  newPage: () => '',
  searchJournals: () => {},
  undoNewJournal: () => {},
  uploadImage: () => {},
  removeUploadedImage: () => {},
  toggleDarkMode: () => {},
}

type ActionType = {
  type:
    | 'SELECTED_JOURNAL'
    | 'ADD_JOURNAL'
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
  singleJournalLoading: false,
}

export const JournalContext = createContext(JournalValue)

const journalReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'SELECTED_JOURNAL':
      return {
        ...state,
        selectedJournal: {
          id: action.payload.id,
          title: action.payload.title,
          text: action.payload.text,
          image: action.payload.image,
          createdAt: action.payload.createdAt,
          mood: action.payload.mood,
        },
        length: state.journals?.length,
        editing: false,
      }
    case 'ADD_JOURNAL':
      return {
        ...state,
        selectedJournal: {
          id: action.payload.id,
          title: action.payload.title,
          text: action.payload.text,
          image: action.payload.image,
          createdAt: action.payload.createdAt,
          mood: action.payload.mood,
        },
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
          mood: action.payload.mood,
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
        selectedJournal: state.journals[0],
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
        selectedJournal: {
          // TODO - Fix this to real ID
          id: action.payload,
          title: 'Sans-titre',
          text: '',
          image: '',
          createdAt: Date.now(),
          mood: '',
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
      mood
    }
  }
`

const ADD_JOURNAL = gql`
  mutation($title: String!, $text: String!, $image: String, $mood: String!) {
    addJournal(title: $title, text: $text, image: $image, mood: $mood) {
      id
      title
      text
      image
      createdAt
      mood
    }
  }
`

const EDIT_JOURNAL = gql`
  mutation(
    $id: ID!
    $title: String!
    $text: String!
    $image: String
    $mood: String!
  ) {
    editJournal(
      id: $id
      title: $title
      text: $text
      image: $image
      mood: $mood
    ) {
      id
      title
      text
      image
      createdAt
      mood
    }
  }
`

const GET_JOURNAL = gql`
  query journal($id: ID!) {
    journal(id: $id) {
      id
      title
      text
      image
      createdAt
      mood
    }
  }
`

const DELETE_JOURNAL = gql`
  mutation($id: ID!) {
    deleteJournal(id: $id) {
      id
    }
  }
`

export const JournalProvider = ({ children }) => {
  const client = useApolloClient()

  const [state, dispatch] = useReducer(journalReducer, initialState)

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
  const { loading: journalsLoading, data: allJournals } = useQuery(ALL_JOURNALS)

  // Load single journal
  const [
    loadJournal,
    { data: singleJournalData, loading: singleJournalLoading },
  ] = useLazyQuery(GET_JOURNAL, {
    onCompleted: ({ journal }) => {
      dispatch({
        type: 'SELECTED_JOURNAL',
        payload: {
          id: journal.id,
          title: journal.title,
          text: journal.text,
          image: journal.image,
          createdAt: journal.createdAt,
          mood: journal.mood,
        },
      })
    },
  })

  // Delete journal
  const [deleteJournal] = useMutation(DELETE_JOURNAL, {
    onCompleted: ({ deleteJournal }) => {
      const { journals } = client.readQuery({
        query: ALL_JOURNALS,
      })

      client.writeQuery({
        query: ALL_JOURNALS,
        data: {
          journals: journals.filter(journal => journal.id !== deleteJournal.id),
        },
      })
    },
  })

  // Add journal
  const [addJournal] = useMutation(ADD_JOURNAL, {
    onCompleted: ({ addJournal }) => {
      const { journals } = client.readQuery({
        query: ALL_JOURNALS,
      })

      client.writeQuery({
        query: ALL_JOURNALS,
        data: {
          journals: [
            {
              __typename: 'Journal',
              id: addJournal.id,
              title: addJournal.title,
              text: addJournal.text,
              image: addJournal.image,
              createdAt: addJournal.createdAt,
              mood: addJournal.mood,
            },
            ...journals,
          ],
        },
      })

      dispatch({
        type: 'ADD_JOURNAL',
        payload: {
          id: addJournal.id,
          title: addJournal.title,
          text: addJournal.text,
          image: addJournal.image,
          createdAt: addJournal.createdAt,
          mood: addJournal.mood,
        },
      })
    },
  })

  // Edit journal
  const [editJournal] = useMutation(EDIT_JOURNAL, {
    onCompleted: ({ editJournal }) => {
      dispatch({
        type: 'EDIT_SELECTED_JOURNAL',
        payload: {
          title: editJournal.title,
          text: editJournal.text,
          id: editJournal.id,
          image: editJournal.image,
          createdAt: editJournal.createtAt,
          mood: editJournal.mood,
        },
      })
    },
  })

  // Actions
  const selectJournal = id => {
    loadJournal({
      variables: {
        id,
      },
    })
  }

  const editSelectedJournal = async (
    id,
    title,
    text,
    image,
    createdAt,
    mood
  ) => {
    const res = await editJournal({
      variables: { id, title, text, image, createdAt, mood },
    })
    return res?.data?.editJournal?.id
  }

  const deleteSelectedJournal = async id => {
    await deleteJournal({ variables: { id } })
  }

  const toggleEditing = image => {
    dispatch({ type: 'TOGGLE_EDITING', payload: image })
    if (image) {
      dispatch({ type: 'UPLOADED_IMAGE', payload: image })
    }
  }

  const addNewJournal = async (title, text, image, mood) => {
    const res = await addJournal({
      variables: {
        title,
        text,
        image,
        mood,
      },
    })
    return res?.data?.addJournal?.id
  }

  const newPage = () => {
    const id = uuidv4()
    dispatch({ type: 'NEW_PAGE', payload: id })
    return id
  }

  const searchJournals = (input, router) => {
    dispatch({ type: 'SEARCH_JOURNALS', payload: input })
    router.push('/recherche', '/recherche')
  }

  const undoNewJournal = id => {
    dispatch({ type: 'UNDO_NEW_JOURNAL' })
    loadJournal({
      variables: {
        id,
      },
    })
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
      journals: allJournals?.journals || [],
      selectedJournal: state.selectedJournal,
      editing: state.editing,
      newState: state.newState,
      length: state.length,
      search: state.search,
      imageUploaded: state.imageUploaded,
      toggleImageContainer: state.toggleImageContainer,
      darkMode: state.darkMode,
      journalsLoading,
      singleJournalLoading,
      addNewJournal,
      selectJournal,
      editSelectedJournal,
      deleteSelectedJournal,
      toggleEditing,
      newPage,
      searchJournals,
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
    allJournals,
  ])

  return (
    <JournalContext.Provider value={value}>{children}</JournalContext.Provider>
  )
}
