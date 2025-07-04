import { useState } from "react";
import { Asterisk, Sparkles, CircleAlert } from "lucide-react";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function AiEditor({ 
    label, 
    placeholder, 
    required,
    error = '',
    rows,
    value, 
    setValue, 
    disabled, 
    textBeingEnhancedWithAi, 
    setTextBeingEnhancedWithAi,
	setChangesAccepted
}) {

    const [enhancedText, setEnhancedText] = useState(null);
	const [showError, setShowError] = useState(false);

    async function enhanceTaskDescription() {

        setTextBeingEnhancedWithAi(true);

        try {

            const res = await fetch(`${SERVER_BASE_URL}/api/v1/ai/enhance`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: value })
            });

            const { enhancedVersion } = await res.json();
            setEnhancedText(enhancedVersion);

        } catch {

            console.log('error occured while enhancing your task description');

        } finally {

            setTextBeingEnhancedWithAi(false);
			setChangesAccepted(false);

        }

    }

    return (
        <div className="flex flex-col gap-y-3">
            <div className="flex justify-between items-center">
                <label className="flex gap-x-0.5">
                    <span className="text-sm md:text-base font-semibold">{ label }</span>
                    <Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
                </label>
                {
                    enhancedText ? (
                        <div className="flex gap-x-3 text-sm">
                            <button 
                                className="text-white hover:bg-green-900 bg-green-800 flex items-center gap-x-2 
								px-3 py-1.5 rounded-md font-medium text-xs"
                                onClick={() => {
                                    setValue(enhancedText);
                                    setEnhancedText(null);
									setChangesAccepted(true);
                                }}
                            >
                                Accept
                            </button>
                            <button 
                                className="text-white hover:bg-red-900 bg-red-800 flex items-center gap-x-2 
								px-4 py-1.5 rounded-md font-medium text-xs"
                                onClick={() => {
									setEnhancedText(null);
									setChangesAccepted(true);
								}}
                            >
                                Reject
                            </button>
                        </div>
                    ) : (
                        <div className="relative group inline-block">
                            <button 
                                disabled={disabled || value.trim().split(/\s+/).length < 20 }
                                className={`dark:bg-neutral-950 dark:border-neutral-800 dark:hover:bg-neutral-900 
                                hover:bg-slate-100 border-[1px] py-2 md:px-3 md:py-2.5 rounded-md flex justify-center 
                                items-center gap-x-2 w-36 md:w-40 ${disabled ? 'cursor-not-allowed' : 
                                'cursor-pointer'} disabled:opacity-50 peer`}
                                onClick={enhanceTaskDescription}
                            >
                                {
                                    textBeingEnhancedWithAi ? (
                                        <div className="flex justify-center relative w-5 h-5">
                                            <div className="absolute w-5 h-5 border-2 dark:border-gray-300 
											border-gray-400 rounded-full"></div>
                                            <div className="absolute w-5 h-5 border-2 border-transparent border-t-white 
                                            dark:border-t-black rounded-full animate-spin"></div>
                                        </div>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 text-purple-500" />
                                            <span className="text-xs md:text-sm font-medium">Enhance with AI</span>
                                        </>
                                    )
                                }
                            </button>
                            <div className="dark:bg-neutral-950 dark:border-neutral-800 bg-white border-[1px] py-1 px-2 
                            rounded-md absolute text-xs group-hover:peer-disabled:opacity-100 opacity-0 transition-[opacity] 
                            duration-200 pointer-events-none cursor-none mt-2 w-44 text-center left-1/2 -translate-x-1/2">
                                Min 20 words are required
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="flex flex-col gap-y-2">
                {
					required ? (
						<textarea 
							disabled={disabled}
							value={ enhancedText ? enhancedText : value } 
							placeholder={placeholder}
							rows={rows} 
							className={`dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
							focus:border-black/30 bg-white resize-none rounded-md text-sm lg:text-base border-[1px] w-full 
							py-2.5 px-4 outline-none disabled:opacity-50 disabled:cursor-default cursor-text 
							scrollbar-thin dark:scrollbar-thumb-neutral-950 dark:scrollbar-track-neutral-800`}
							onChange={(e) => {								
								setShowError(!e.target.value > 0);								
								setValue(e.target.value);
							}}
						/>
					) : (
						<textarea 
							disabled={disabled}
							value={ enhancedText ? enhancedText : value } 
							placeholder={placeholder}
							rows={rows} 
							className={`dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
							focus:border-black bg-white resize-none rounded-md text-sm lg:text-base border-[1px] w-full 
							py-2.5 px-4 outline-none disabled:opacity-50 disabled:cursor-default cursor-text 
							scrollbar-thin dark:scrollbar-thumb-neutral-950 dark:scrollbar-track-neutral-800`}
							onChange={(e) => setValue(e.target.value)}
						/>
					)
				}
                {
                    required && (
                        showError && (
                            <div className="flex gap-x-1.5 text-red-500">
                                <CircleAlert className="w-4 h-4" />
                                <p className="text-sm">{ error }</p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );

}

export default AiEditor;