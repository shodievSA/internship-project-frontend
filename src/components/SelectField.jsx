import { useState } from "react";
import Select from "./ui/Select";
import { Asterisk, CircleAlert } from "lucide-react";

function SelectField({ 
    label, 
    disabled, 
    placeholder,
    required,
    value,
    setValue, 
    options, 
    error,
    isValid
}) {

    const [showError, setShowError] = useState(false);

    return (
        <div className="flex flex-col gap-y-2">
            <label className="flex gap-x-0.5">
                <span className="text-sm md:text-base font-semibold">{ label }</span>
                { required && <Asterisk className="w-3 h-3 mt-0.5 text-red-500" /> }
            </label>
            <Select 
                value={value}
                onChange={(e) => {

                    let isValidOption = false;

                    options.forEach((option) => {
                        if (option.value === e.target.value) {
                            setValue(option.value);
                            isValid(true);
                            isValidOption = true;
                            return;
                        }
                    });

                    if (!isValidOption) {
                        setShowError(true);
                        isValid(false);
                        return;
                    }

                }} 
                options={options} 
                disabled={disabled}
                placeholder={placeholder}
            />
            {
                (required && showError) && (
                    <div className="flex gap-x-1.5 text-red-500">
                        <CircleAlert className="w-4 h-4" />
                        <p className="text-sm">{ error }</p>
                    </div>
                )
            }
        </div>
    );

}

export default SelectField;