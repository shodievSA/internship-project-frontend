function Input({ label, placeholder, text, setText, isBeingSubmitted }) {

    return (
        <div className="flex flex-col gap-y-3">
            <label className="text-sm md:text-base flex gap-x-0.5 font-semibold">
                { label }
            </label>
            <input 
                disabled={isBeingSubmitted}
                placeholder={placeholder}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-600 
                focus:border-black bg-white rounded-md text-sm lg:text-base border-[1px] py-2 px-4 
                outline-none disabled:opacity-50 ${isBeingSubmitted ? 'cursor-not-allowed' : 
                'cursor-text'}`}
            />
        </div>
    );

}

export default Input;