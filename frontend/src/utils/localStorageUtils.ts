import { User } from '../types/userTypes'

export const saveUserToLocalStorage = (user: User | null) => {
  if (user) {
    localStorage.setItem('userInfo', JSON.stringify(user))
  }
}
