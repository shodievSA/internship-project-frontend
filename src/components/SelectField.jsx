import Select from "./ui/Select";
import { Asterisk } from "lucide-react";

function SelectField({ 
    label, 
    disabled, 
    placeholder,
    required,
    selected,
    setValue, 
    options
}) {

    return (
        <div className="flex flex-col gap-y-2">
            <label className="flex gap-x-0.5">
                <span className="text-sm md:text-base font-semibold">{ label }</span>
                { required && <Asterisk className="w-3 h-3 mt-0.5 text-red-500" /> }
            </label>
            <Select 
                selected={selected}
                onChange={(option) => setValue(option)} 
                options={options} 
                disabled={disabled}
                placeholder={placeholder}
            />
        </div>
    );

}

export default SelectField;