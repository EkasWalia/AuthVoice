import { useCallback, useState } from 'react'

let idCounter = 0

export function useToasts() {
  const [toasts, setToasts] = useState([])

  const pushToast = useCallback((message, type = 'info', duration = 3200) => {
    const id = ++idCounter
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  return { toasts, pushToast }
}
