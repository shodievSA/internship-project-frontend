export function ModalOverlay({ isOpen, onClose, children }) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}
