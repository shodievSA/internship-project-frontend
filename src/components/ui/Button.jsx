import { forwardRef } from "react";

const Button = forwardRef(({
    children,
    onClick,
    variant = "primary", // primary, secondary, gradient
    size = "md", // sm, md, lg
    disabled = false,
    className = "",
    icon: Icon,
    isLoading = false,
    ...props
}, ref) => {
    const baseStyles = "flex items-center justify-center gap-2 rounded-lg font-medium transition-colors";

    const variants = {
        primary: "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:ring-black dark:focus:ring-white",
        secondary: "dark:bg-neutral-950 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800 bg-white hover:bg-slate-100 border border-gray-200",
        gradient: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white focus:ring-purple-600",
        blue: "inline-flex items-center border border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:outline-none  transition-colors"
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base"
    };

    const loadingSpinner = (
        <div className="relative w-5 h-5">
            <div className="absolute w-5 h-5 border-2 dark:border-gray-300 border-gray-400 rounded-full"></div>
            <div className="absolute w-5 h-5 border-2 border-transparent border-t-white dark:border-t-black rounded-full animate-spin"></div>
        </div>
    );

    // Check if children contains an icon component
    const childrenArray = Array.isArray(children) ? children : [children];
    const hasIconInChildren = childrenArray.some(child =>
        typeof child === 'object' &&
        child?.type?.name &&
        ['LucideIcon', 'Icon'].includes(child.type.name)
    );

    return (
        <button
            ref={ref}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            {...props}
        >
            {isLoading ? (
                loadingSpinner
            ) : (
                <>
                    {/* Render icon from prop if provided and no icon in children */}
                    {Icon && !hasIconInChildren && <Icon className="w-4 h-4" />}
                    {children}
                </>
            )}
        </button>
    );
});

Button.displayName = "Button";

export default Button; 