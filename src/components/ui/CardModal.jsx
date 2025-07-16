import React from "react";

function CardModal({ open, onClose, headerColor, status, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70">
            <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-4xl min-h-[500px] mt-12">
                {/* Header color bar with status and close button */}
                <div
                    className="relative rounded-t-2xl w-full h-16 flex items-center"
                    style={{ background: headerColor }}
                >
                    {/* Status badge top left */}
                    {status && (
                        <span className="absolute left-6 top-4 bg-white/80 text-gray-800 dark:bg-black/40 dark:text-white px-4 py-1 rounded-full text-sm font-semibold shadow">
                            {status}
                        </span>
                    )}
                    {/* Close button top right */}
                    <button
                        className="absolute top-4 right-4 text-3xl text-white/90 hover:text-white z-10"
                        onClick={onClose}
                        aria-label="Close"
                        style={{
                            background: "none",
                            border: "none",
                            outline: "none",
                            boxShadow: "none",
                        }}
                    >
                        ×
                    </button>
                </div>
                {/* Modal body */}
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default CardModal; 