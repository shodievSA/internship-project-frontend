

export function ModalOverlay({ isOpen, onClose, children }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div
                className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}
