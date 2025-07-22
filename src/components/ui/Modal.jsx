import { X } from "lucide-react"

function Modal({ 
	title, 
	titleIcon, 
	subtitle, 
	size, 
	children,
	closeModal 
}) {

    const sizes = {
        sm: "w-[350px]",
        md: "w-[350px] md:w-[500px]",
        lg: "w-[350px] md:w-[500px] lg:w-[750px] lg:max-h-[675px]"
    }

	function handleClick(e) {

		if (e.target === e.currentTarget) {

			closeModal();

		}

	}

    return (
        <div 
			className="flex items-center justify-center fixed h-full w-full bg-black/80 
			left-0 top-0 z-20 cursor-pointer"
			onClick={handleClick}
		>
            <div className={`dark:bg-neutral-950 dark:border-neutral-800 bg-white border-neutral-200 
			border-[1px] flex flex-col ${sizes[size]} rounded-lg cursor-default`}>
                <div className="p-5 flex flex-col gap-y-2">
					<div className="flex justify-between items-center gap-x-2">
						<div className="flex items-center gap-x-2">
							{ titleIcon && titleIcon }
							<h1 className="text-base md:text-xl font-semibold">{ title }</h1>
						</div>
						<button onClick={closeModal} className="p-2 rounded-md hover:bg-slate-100
						dark:hover:bg-neutral-900">
							<X className="w-5 h-5" />
						</button>
					</div>
					{ subtitle && <h3 className="dark:text-neutral-400 text-slate-500 text-pretty">{ subtitle }</h3> }
                </div>
                { children }
            </div>
        </div>
    )

}

export default Modal;