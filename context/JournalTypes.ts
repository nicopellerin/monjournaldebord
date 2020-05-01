export type Journal = {
  id: string
  title: string
  text: string
  createdAt: Date
  image: string
  mood: string
  status: string
}

export interface JournalValue {
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
  toggleDelete: boolean
  setToggleImageContainerAction: () => void
  selectJournalAction: (id: string | string[]) => void
  editSelectedJournalAction: (
    id: string,
    title: string,
    text: string,
    image: string,
    mood: string,
    status: string
  ) => void
  addNewJournalAction: (
    title: string,
    text: string,
    image: string,
    mood: string,
    status: string
  ) => void
  deleteSelectedJournalAction: (id: string) => void
  toggleEditingAction: (image: string) => void
  newPageAction: () => string
  searchJournalsAction: (input, router) => void
  undoNewJournalAction: (id: string) => void
  uploadImageAction: (image: string) => void
  removeUploadedImageAction: () => void
  toggleDarkModeAction: () => void
  toggleDeleteAction: () => void
}

export type ActionType = {
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
    | 'TOGGLE_IMAGE_CONTAINER'
    | 'TOGGLE_DARK_MODE'
    | 'TOGGLE_DELETE'
  payload?: any
}

export type StateType = {
  journals: any
  selectedJournal: Journal
  editing: boolean
  newState: boolean
  length: number
  search: string
  imageUploaded: string
  toggleImageContainer: boolean
  darkMode: boolean
  toggleDelete: boolean
}
