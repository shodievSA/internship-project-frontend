import { createContext, useContext, useState } from "react"
import { Toast } from "./Toast"

const ToastContext = createContext(undefined)

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const showToast = (toast) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newToast = {
            ...toast,
            id,
            onClose: removeToast,
        }
        setToasts((prev) => [...prev, newToast])
    }

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} />
            ))}
        </ToastContext.Provider>
    )
}
