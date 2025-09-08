import { useState } from "react";
import {
	Pencil,
	Check,
	X,
	Trash
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useThemeContext } from "../context/ThemeContext";
import rehypeHighlight from "rehype-highlight";
import { getDateFromIso, getTimeFromIso } from "../utils/formatIsoDate";

function CurrentUserComment({
	comment,
	currentUser,
	onCommentUpdate,
	onCommentDelete,
}) {

	const { themeMode } = useThemeContext();

	const [showEditInput, setShowEditInput] = useState(false);
	const [newMessage, setNewMessage] = useState();

	function handleOnKeyDown(e) {

		if (e.key === "Enter" && !e.shiftKey && isUpdateValid()) {

			onCommentUpdate(comment.id, newMessage);
			setShowEditInput(false);

		}

	}

	function updateComment(commentId, newMessage) {

		if (isUpdateValid()) {

			onCommentUpdate(commentId, newMessage);
			setShowEditInput(false);

		}

	}

	function deleteComment(commentId) {
		onCommentDelete(commentId);
	}

	function reverseChanges() {
		setShowEditInput(false);
	}

	function onEditButtonClicked() {
		setNewMessage(comment.message);
		setShowEditInput(true);
	}

	function isUpdateValid() {

		return (
			newMessage.trim() !== "" && newMessage.trim() !== comment.message
		);

	}

	return (
		<div className="flex items-start gap-x-3 ml-auto">
			{showEditInput ? (
				<div className="min-w-[400px] h-28 bg-blue-100 dark:bg-indigo-600 
				rounded-xl border border-slate-300 dark:border-gray-600">
					<div className="flex flex-col h-full">
						<textarea
							className="w-full h-full resize-none focus:outline-none px-3 pt-3 
							scrollbar-none rounded-xl bg-blue-100 dark:bg-indigo-600"
							placeholder="Edit your comment here..."
							onKeyDown={handleOnKeyDown}
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
						></textarea>
						<div className="grow flex items-center gap-x-4 p-2 p-2">
							<button 
								className="py-1.5 px-2.5 rounded-lg hover:bg-red-700/30 hover:dark:bg-red-700/50 
								cursor-pointer flex items-center gap-x-1 text-sm gap-x-1.5"
								onClick={() => deleteComment(comment.id)}
							>
								<Trash className="w-4 h-4 text-red-700 dark:text-red-600" />
								<span className="mt-0.5">Delete</span>
							</button>
							<div className="flex gap-x-4 ml-auto">
								<button 
									className="py-1.5 px-2.5 rounded-lg hover:bg-blue-200 hover:dark:bg-neutral-800 
									cursor-pointer flex items-center gap-x-1 text-sm gap-x-1.5"
									onClick={() => updateComment(comment.id, newMessage)}
								>
									<Check className="w-4 h-4" />
									<span>Save</span>
								</button>
								<button 
									className="py-1.5 px-2.5 rounded-lg hover:bg-blue-200 hover:dark:bg-neutral-800 
									cursor-pointer flex items-center gap-x-1 text-sm gap-x-1.5"
									onClick={reverseChanges} 
								>
									<X className="w-4 h-4" />
									<span>Cancel</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-y-1 px-4 py-2 rounded-xl border 
				border-slate-300 dark:border-gray-600 bg-blue-100 dark:bg-indigo-600
				overflow-x-auto max-w-2xl scrollbar-thin dark:scrollbar-thumb-neutral-950 
				dark:scrollbar-track-neutral-800">
					<div className="flex justify-between gap-x-5 group/item whitespace-pre-wrap
					text-blue-800 dark:text-white">
						<ReactMarkdown
							components={{
								ol: ({ node, ...props }) => (
									<ol className="list-decimal ml-4" {...props} />
								),
								ul: ({ node, ...props }) => (
									<ul className="list-disc ml-4" {...props} />
								),
							}}
							className={themeMode} 
							rehypePlugins={[rehypeHighlight]}
						>
							{comment.message}
						</ReactMarkdown>
						<div
							className="opacity-0 group-hover/item:opacity-100 transition-[opacity]
							duration-300 self-start cursor-pointer"
							onClick={onEditButtonClicked}
						>
							<Pencil className="w-3.5 h-3.5 mt-0.5" />
						</div>
					</div>
					<div className="flex gap-x-1.5 text-xs text-slate-600 
					dark:text-gray-300 mr-auto">
						<span>{getTimeFromIso(comment.createdAt)}</span>
						<span>{getDateFromIso(comment.createdAt)}</span>
					</div>
				</div>
			)}
			<img src={currentUser.avatarUrl} className="w-8 h-8 rounded-full" />
		</div>
	);

}

export default CurrentUserComment;