import * as React from 'react'
import { createContext, useReducer, useMemo } from 'react'
import {
  useQuery,
  useMutation,
  useLazyQuery,
  useApolloClient,
} from '@apollo/react-hooks'
import { v4 as uuidv4 } from 'uuid'

import {
  ALL_JOURNALS,
  ADD_JOURNAL,
  EDIT_JOURNAL,
  GET_JOURNAL,
  DELETE_JOURNAL,
} from './JournalQueries'
import { JournalValue, ActionType, StateType } from './JournalTypes'

export const JournalContext = createContext<JournalValue>(null)

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
  toggleDelete: false,
}

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
          status: action.payload.status,
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
          status: action.payload.status,
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
          status: action.payload.status,
        },
        editing: false,
        newState: false,
      }
    case 'DELETE_SELECTED_JOURNAL':
      return {
        ...state,
        journals: state.journals.filter(
          (journal) => journal.id !== action.payload
        ),
      }
    case 'TOGGLE_EDITING':
      return {
        ...state,
        editing: !state.editing,
        newState: false,
        imageUploaded: action.payload,
        toggleImageContainer: false,
      }
    case 'SEARCH_JOURNALS':
      return {
        ...state,
        search: action.payload,
      }
    case 'UNDO_NEW_JOURNAL':
      return {
        ...state,
        newState: false,
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
    case 'TOGGLE_IMAGE_CONTAINER':
      return {
        ...state,
        toggleImageContainer: !state.toggleImageContainer,
      }
    case 'TOGGLE_DELETE':
      return {
        ...state,
        toggleDelete: !state.toggleDelete,
      }
    case 'NEW_PAGE':
      return {
        ...state,
        editing: true,
        newState: true,
        imageUploaded: '',
        toggleImageContainer: false,
        toggleDelete: false,
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

export const JournalProvider = ({ children }) => {
  const client = useApolloClient()

  const [state, dispatch] = useReducer(journalReducer, initialState)

  // Load all journals data
  const { loading: journalsLoading, data: allJournals } = useQuery(ALL_JOURNALS)

  // Load single journal
  const [loadJournal, { loading: singleJournalLoading }] = useLazyQuery(
    GET_JOURNAL,
    {
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
            status: journal.status,
          },
        })
      },
    }
  )

  // Delete journal
  const [deleteJournal] = useMutation(DELETE_JOURNAL, {
    onCompleted: ({ deleteJournal }) => {
      const { journals } = client.readQuery({
        query: ALL_JOURNALS,
      })

      client.writeQuery({
        query: ALL_JOURNALS,
        data: {
          journals: journals.filter(
            (journal) => journal.id !== deleteJournal.id
          ),
        },
      })
    },
  })

  // Add journal
  const [addJournal] = useMutation(ADD_JOURNAL, {
    onCompleted: ({ addJournal }) => {
      console.log('ADDDD', addJournal)
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
              status: addJournal.status,
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
          status: addJournal.status,
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
          createdAt: editJournal.createdAt,
          mood: editJournal.mood,
          status: editJournal.status,
        },
      })
    },
  })

  // Actions
  const selectJournalAction = (id) => {
    loadJournal({
      variables: {
        id,
      },
    })
  }

  const editSelectedJournalAction = async (
    id,
    title,
    text,
    image,
    mood,
    status
  ) => {
    const res = await editJournal({
      variables: { id, title, text, image, mood, status },
    })
    return res?.data?.editJournal?.id
  }

  const deleteSelectedJournalAction = async (id) => {
    await deleteJournal({ variables: { id } })
  }

  const toggleEditingAction = (image) => {
    dispatch({ type: 'TOGGLE_EDITING', payload: image })
  }

  const addNewJournalAction = async (title, text, image, mood, status) => {
    const res = await addJournal({
      variables: {
        title,
        text,
        image,
        mood,
        status,
      },
    })
    return res?.data?.addJournal?.id
  }

  const newPageAction = () => {
    const id = uuidv4()
    dispatch({ type: 'NEW_PAGE', payload: id })
    return id
  }

  const searchJournalsAction = (input, router) => {
    dispatch({ type: 'SEARCH_JOURNALS', payload: input })
    router.push('/journal/recherche', '/journal/recherche')
  }

  const undoNewJournalAction = (id) => {
    dispatch({ type: 'UNDO_NEW_JOURNAL' })
    loadJournal({
      variables: {
        id,
      },
    })
  }

  const uploadImageAction = (image) => {
    dispatch({ type: 'UPLOADED_IMAGE', payload: image })
  }

  const removeUploadedImageAction = () => {
    dispatch({ type: 'TOGGLE_IMAGE_CONTAINER' })
    setTimeout(() => dispatch({ type: 'REMOVE_UPLOADED_IMAGE' }), 1000)
  }

  const toggleDarkModeAction = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' })
  }

  const toggleDeleteAction = () => {
    dispatch({ type: 'TOGGLE_DELETE' })
  }

  const setToggleImageContainerAction = () => {
    dispatch({ type: 'TOGGLE_IMAGE_CONTAINER' })
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
      toggleDelete: state.toggleDelete,
      journalsLoading,
      singleJournalLoading,
      addNewJournalAction,
      selectJournalAction,
      editSelectedJournalAction,
      deleteSelectedJournalAction,
      toggleEditingAction,
      newPageAction,
      searchJournalsAction,
      undoNewJournalAction,
      uploadImageAction,
      removeUploadedImageAction,
      toggleDarkModeAction,
      toggleDeleteAction,
      setToggleImageContainerAction,
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
    state.toggleDelete,
    allJournals,
  ])

  return (
    <JournalContext.Provider value={value}>{children}</JournalContext.Provider>
  )
}
