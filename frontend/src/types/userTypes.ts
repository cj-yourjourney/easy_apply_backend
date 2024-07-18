export type User = {
  username: string
  email: string
  password: string
}

export type LoginUser = {
  username: string
  password: string
}

export type UserState = {
  user: User | null
  loading: boolean
  error: string | null
}

export const userInitialState: UserState = {
  user: {
    username: '',
    email: '',
    password: ''
  },
  loading: false,
  error: null
}
