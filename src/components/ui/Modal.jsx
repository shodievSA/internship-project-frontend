function Modal({ title, titleIcon, subtitle, size, children }) {

    const sizes = {
        sm: "w-[350px]",
        md: "w-[350px] md:w-[500px]",
        lg: "w-[350px] md:w-[500px] lg:w-[750px] lg:h-[675px]"
    }

    return (
        <div className="flex items-center justify-center fixed h-full w-full bg-black/80 left-0 top-0 z-10">
            <div className={`dark:bg-neutral-950 dark:border-neutral-800 bg-white border-neutral-200 border-[1px] 
            flex flex-col ${sizes[size]} rounded-lg`}>
                <div className="p-7 flex flex-col gap-y-2">
					<div className="flex items-center gap-x-2">
						{ titleIcon && titleIcon }
                    	<h1 className="text-base md:text-xl font-semibold">{ title }</h1>
					</div>
					{ subtitle && <h3 className="dark:text-neutral-400 text-slate-500 text-pretty">{ subtitle }</h3> }
                </div>
                { children }
            </div>
        </div>
    )

}

export default Modal;