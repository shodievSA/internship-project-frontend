"use client"

import { Search } from "lucide-react"

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <div className="relative">
            <Search className="search-icon" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="search-bar"
            />
        </div>
    )
}

export default SearchBar;