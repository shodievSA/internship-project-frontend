import { useState } from "react";
import Input from "./ui/Input";
import { Asterisk, CircleAlert } from "lucide-react";

function InputField({ 
    label, 
    disabled,
    placeholder, 
    required,
    value, 
    setValue, 
    error,
    isValid
}) {

    const [showError, setShowError] = useState(false);

    return (
        <div className="flex flex-col gap-y-3 w-full">
            <label className="flex gap-x-0.5">
                <span className="text-sm md:text-base font-semibold">{ label }</span>
                { required && <Asterisk className="w-3 h-3 mt-0.5 text-red-500" /> }
            </label>
            {
                required ? (
                    <>
                    <Input 
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => {
                            
                            const value = e.target.value;
                            
                            if (!value) {
                                setShowError(true);
                                isValid(false);
                            } else {
                                setShowError(false);
                                isValid(true);
                            }
                            
                            setValue(value);
                            
                        }}
                        disabled={disabled}
                    />
                    {
                        showError && (
                            <div className="flex gap-x-1.5 text-red-500">
                                <CircleAlert className="w-4 h-4" />
                                <p className="text-sm">{ error }</p>
                            </div>
                        )
                    }
                    </>
                    
                ) : (
                    <Input
                        placeholder={placeholder} 
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={disabled}
                    />
                )
            }
        </div>
    );

}

export default InputField;