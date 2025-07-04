import { useEffect, useState } from "react"
import { CheckCircle, XCircle, X } from "lucide-react"

export function Toast({ id, variant, title, message, onClose }) {
    const [isVisible, setIsVisible] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)

    useEffect(() => {
        // Trigger entrance animation
        const timer = setTimeout(() => setIsVisible(true), 10)

        // Auto-dismiss after 3 seconds
        const dismissTimer = setTimeout(() => {
            handleClose()
        }, 3000)

        return () => {
            clearTimeout(timer)
            clearTimeout(dismissTimer)
        }
    }, [])

    const handleClose = () => {
        setIsLeaving(true)
        setTimeout(() => {
            onClose(id)
        }, 500) // Match the transition duration
    }

    const baseClasses =
        "fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] z-50 transition-all duration-300 ease-out transform shadow-lg rounded-lg border backdrop-blur-sm"

    const visibilityClasses = isVisible && !isLeaving ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"

    const variantClasses =
        variant === "success"
            ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
            : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"

    const iconClasses =
        variant === "success" ? "h-5 w-5 text-green-600 dark:text-green-400" : "h-5 w-5 text-red-600 dark:text-red-400"

    const titleClasses =
        variant === "success"
            ? "text-sm font-semibold text-green-900 dark:text-green-100"
            : "text-sm font-semibold text-red-900 dark:text-red-100"

    const messageClasses =
        variant === "success"
            ? "mt-1 text-sm text-green-700 dark:text-green-200"
            : "mt-1 text-sm text-red-700 dark:text-red-200"

    const buttonClasses =
        variant === "success"
            ? "flex-shrink-0 rounded-md p-1.5 transition-colors text-green-500 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900"
            : "flex-shrink-0 rounded-md p-1.5 transition-colors text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"

    return (
        <div className={`${baseClasses} ${visibilityClasses} ${variantClasses}`}>
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        {variant === "success" ? <CheckCircle className={iconClasses} /> : <XCircle className={iconClasses} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className={titleClasses}>{title}</h4>
                        <p className={messageClasses}>{message}</p>
                    </div>
                    <button onClick={handleClose} className={buttonClasses}>
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
