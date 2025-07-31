import { useState, useRef } from "react";
import { useThemeContext } from "../context/ThemeContext";
import aiService from "../services/aiService";
import { Asterisk, Sparkles, CircleAlert, Undo2, PencilLine, Eye } from "lucide-react";
import Button from "./ui/Button";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

function AiEditor({
    label,
    placeholder,
    required = false,
    error = '',
    rows,
    value,
    setValue,
    disabled,
    showEnhance = true
}) {

	const { themeMode } = useThemeContext();

    const [loading, setLoading] = useState(false);
    const [initialText, setInitialText] = useState(value);
    const [enhancedText, setEnhancedText] = useState(null);
    const [showError, setShowError] = useState(false);
	const [currentTab, setCurrentTab] = useState("write");

	const tabRef = useRef(null);

    async function enhanceText() {

        setLoading(true);

        try {

            const { enhancedVersion } = await aiService.enhanceText(value);
            setEnhancedText(enhancedVersion);

        } catch (err) {

            console.log("The following error occured while enhancing your task description: " + err.message);

        } finally {

            setLoading(false);

        }

    }

    function undoAiChanges() {

        setValue(initialText);
        setEnhancedText(null);

    }

	function handleTab(newTab, tabIndex) {

		const moveBy = tabIndex * 100;
		tabRef.current.style.transform = `translateX(${moveBy}%)`;

		setCurrentTab(newTab);

	}

    return (
        <div className="flex flex-col gap-y-3">
            <div className="flex justify-between items-center">
                <label className="flex gap-x-0.5">
                    <span className="text-sm md:text-base font-semibold">{label}</span>
                    {required && <Asterisk className="w-3 h-3 mt-0.5 text-red-500" />}
                </label>
                {showEnhance && (
                    enhancedText ? (
                        <Button
                            size="sm"
                            onClick={undoAiChanges}
                        >
                            <div className="flex items-center gap-x-2">
                                <Undo2 className="w-4 h-4" />
                                <span>Undo</span>
                            </div>
                        </Button>
                    ) : (
                        <div className="relative group inline-block">
                            <button
                                disabled={disabled || value.trim().split(/\s+/).length < 20}
                                className={`dark:bg-neutral-950 dark:border-neutral-800 dark:hover:bg-neutral-900 
                                hover:bg-slate-100 border-[1px] py-2 md:px-3 md:py-2 rounded-md flex justify-center 
                                items-center gap-x-3 w-36 md:w-28 ${disabled ? 'cursor-not-allowed' :
                                'cursor-pointer'} disabled:opacity-50 peer`}
                                onClick={enhanceText}
                            >
                                {
                                    loading ? (
                                        <div className="flex justify-center relative w-5 h-5">
                                            <div className="absolute w-5 h-5 border-2 dark:border-gray-300 
											border-gray-400 rounded-full"></div>
                                            <div className="absolute w-5 h-5 border-2 border-transparent border-t-white 
                                            dark:border-t-black rounded-full animate-spin"></div>
                                        </div>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 text-purple-500" />
                                            <span className="text-xs md:text-sm font-medium">Enhance</span>
                                        </>
                                    )
                                }
                            </button>
                            <div className="dark:bg-neutral-950 dark:border-neutral-800 bg-white border-[1px] py-1 px-2 z-20 
                            rounded-md absolute text-xs group-hover:peer-disabled:opacity-100 opacity-0 transition-[opacity] 
                            duration-200 pointer-events-none cursor-none mt-2 w-44 text-center left-1/3 -translate-x-1/2">
                                Min 20 words are required
                            </div>
                        </div>
                    )
                )}
            </div>
			<div className="p-1 bg-neutral-100 dark:bg-neutral-900 text-sm rounded-md">
				<ul className="grid grid-cols-2 relative">
					<div 
						ref={tabRef} 
						className="absolute bg-white dark:bg-black h-full rounded-md w-1/2
						translate-x-0 transition-all duration-200"
					></div>
					<li 
						className={`flex justify-center items-center gap-x-3 p-1.5 cursor-pointer
						z-10 ${currentTab === "write" ? "text-black dark:text-white" : "text-neutral-500"}
						transition-[all] duration-200`}
						onClick={() => handleTab("write", 0)}
					>
						<PencilLine className="w-4 h-4" />
						<span>Write</span>
					</li>
					<li 
						className={`flex justify-center items-center gap-x-3 p-1.5 cursor-pointer
						z-10 ${currentTab === "preview" ? "text-black dark:text-white" : "text-neutral-500"}
						transition-[all] duration-200`}
						onClick={() => handleTab("preview", 1)}
					>
						<Eye className="w-4 h-4" />
						<span>Preview</span>
					</li>
				</ul>
			</div>
            <div className="flex flex-col gap-y-2">
                {
					currentTab === "write" ? (
						required ? (
							<textarea
								disabled={disabled}
								value={enhancedText ? enhancedText : value}
								placeholder={placeholder}
								className={`dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
								focus:border-black/30 bg-white resize-none rounded-md text-sm lg:text-base border-[1px] w-full 
								py-2.5 px-4 outline-none disabled:opacity-50 disabled:cursor-default cursor-text h-44
								scrollbar-thin dark:scrollbar-thumb-neutral-950 dark:scrollbar-track-neutral-800`}
								onChange={(e) => {
									setShowError(!e.target.value > 0);
									setValue(`${e.target.value}`);
									setInitialText(e.target.value);
								}}
							/>
						) : (
							<textarea
								disabled={disabled}
								value={enhancedText ? enhancedText : value}
								placeholder={placeholder}
								className={`dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
								focus:border-black bg-white resize-none rounded-md text-sm lg:text-base border-[1px] w-full 
								py-2.5 px-4 outline-none disabled:opacity-50 disabled:cursor-default cursor-text h-44
								scrollbar-thin dark:scrollbar-thumb-neutral-950 dark:scrollbar-track-neutral-800`}
								onChange={(e) => {
									setValue(e.target.value)
									setInitialText(e.target.value)
								}}
							/>
						)
					) : (
						<div className={`dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
						focus:border-black bg-white resize-none rounded-md text-sm lg:text-base border-[1px] w-full 
						outline-none disabled:opacity-50 overflow-y-auto scrollbar-thin dark:scrollbar-thumb-neutral-950 
						dark:scrollbar-track-neutral-800 h-44 px-4 py-2.5`}>
							<ReactMarkdown 
								className={themeMode} 
								rehypePlugins={[rehypeHighlight]}
							>
								{value}
							</ReactMarkdown>
						</div>
					)
                }
                {
                    required && (
                        showError && (
                            <div className="flex gap-x-1.5 text-red-500">
                                <CircleAlert className="w-4 h-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );

}

export default AiEditor;