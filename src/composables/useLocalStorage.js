export function useLocalStorage(key, initialValue) {
  const get = () => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  }
  const set = (val) => {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch {}
  }
  const remove = () => localStorage.removeItem(key)
  return { get, set, remove }
}
