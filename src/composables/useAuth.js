import { useLocalStorage } from './useLocalStorage'

const storage = useLocalStorage('auth', null)

export function useAuth() {
  const getUser = () => storage.get()
  const isLoggedIn = () => !!getUser()?.email
  const login = async ({ email, name }) => {
    // Fake login: store email/name
    const user = { email, name: name || email.split('@')[0] }
    storage.set(user)
    return user
  }
  const logout = () => storage.remove()
  return { getUser, isLoggedIn, login, logout }
}
