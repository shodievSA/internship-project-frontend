import { Search } from "lucide-react"
import Input from "./ui/Input";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <div className="relative">
            <Search className="search-icon" />
			<Input 
				placeholder={placeholder} 
				className="pl-10"
				value={value || ""}
				onChange={(e) => onChange(e.target.value)}
			/>
        </div>
    )
}

export default SearchBar;