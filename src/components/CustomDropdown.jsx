import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Filter } from "lucide-react";

export function CustomDropdown({
  value,
  onChange,
  options,
  placeholder,
  icon: Icon = Filter,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-black border border-gray-300 dark:border-neutral-800 rounded-lg text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Icon className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
        <span>{selectedOption?.label || placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 dark:text-neutral-400 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[160px] bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-900 transition-colors"
                role="option"
                aria-selected={value === option.value}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check className="h-4 w-4 text-gray-900 dark:text-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
