export type User = {
  username: string
  email: string
  createdAt: string
  avatar: string
  city: string
}

export interface UserContextValue {
  loginAction: (email, password) => Promise<User>
  logoutAction: () => Promise<boolean>
  signupAction: (username, email, password, avatar) => Promise<User>
  updateUserAction: (username, email, avatar, city) => void
  updateUserPasswordAction: (password) => Promise<boolean>
  username: string
  email: string
  createdAt: string
  avatar: string
  city: string
  userLoading: boolean
}

export type ActionType = {
  type: 'USER_INFO' | 'LOGOUT' | 'UPDATE_DAILY_MOOD' | 'UPDATE_USER'
  payload?: any
}

export type StateType = {
  username: string
  email: string
  password: string
  createdAt: string
  avatar: string
  city: string
}
