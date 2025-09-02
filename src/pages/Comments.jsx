import { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	ArrowLeft,
	SendHorizontal,
	Pencil,
	Check,
	X,
	Trash
} from "lucide-react";
import commentService from "../services/commentService";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import ReactMarkdown from "react-markdown";
import { useThemeContext } from "../context/ThemeContext";
import rehypeHighlight from "rehype-highlight";
import { useToast } from "../components/ui/ToastProvider";
const SERVER_HOST = import.meta.env.VITE_HOST;

function Comments() {

	const { projectId, taskId } = useParams();
	const { state: { task, currentMemberId } } = useLocation();

	const { showToast } = useToast();

	const navigate = useNavigate();

	const socketRef = useRef(null);
	const chatWindowRef = useRef(null);

	const [comments, setComments] = useState([]);
	const [commentMessage, setCommentMessage] = useState("");
	const [commentsFetched, setCommentsFetched] = useState(false);

	const chatPartner = useMemo(() => {

		return currentMemberId !== task.assignedBy.id
			? task.assignedBy
			: task.assignedTo;

	}, [task, currentMemberId]);

	const currentUser = useMemo(() => {

		return currentMemberId === task.assignedBy.id
			? task.assignedBy
			: task.assignedTo;

	}, [task, currentMemberId]);

	function sendComment() {

		socketRef.current.send(JSON.stringify({
			type: "new-comment",
			message: commentMessage,
			taskId: taskId,
			memberId: currentMemberId,
		}));

		setCommentMessage("");

	}

	function onCommentUpdate(commentId, updatedComment) {

		socketRef.current.send(
			JSON.stringify({
				type: "update-comment",
				commentId: commentId,
				updatedComment: updatedComment,
				taskId: taskId,
			}),
		);

	}

	function onCommentDelete(commentId) {

		socketRef.current.send(
			JSON.stringify({
				type: "delete-comment",
				commentId: commentId,
				taskId: taskId,
			}),
		);

	}

	function handleOnKeyDown(event) {

		if (event.key === "Enter" && !event.shiftKey && commentMessage) {

			event.preventDefault();
			sendComment();

		}

	}

	useEffect(() => {

		socketRef.current = new WebSocket(`wss://${SERVER_HOST}/comments`);

		socketRef.current.onopen = (event) => {
			if (event.type === "open") {
				socketRef.current.send(
					JSON.stringify({
						type: "join-comment-section",
						taskId: taskId,
					}),
				);
			}
		};

		socketRef.current.onmessage = (event) => {

			const data = JSON.parse(event.data);

			if (data.type === "new-comment") {

				const newComment = data.comment;

				setComments((prevComments) => [...prevComments, newComment]);

			} else if (data.type === "updated-comment") {

				const updatedComment = data.updatedComment;

				setComments((prevComments) =>
					prevComments.map((comment) => {
						return comment.id === updatedComment.id
							? updatedComment
							: comment;
					}),
				);

			} else if (data.type === "deleted-comment") {

				const deletedCommentId = data.deletedCommentId;

				setComments((prevComments) =>
					prevComments.filter((comment) => {
						return comment.id !== deletedCommentId;
					}),
				);

			}

		};

		return () => {

			socketRef.current.close(1000, "Closing the websocket connection from the client side normally!");

		};

	}, []);

	useEffect(() => {

		async function getTaskComments() {

			try {

				const { comments } = await commentService.getTaskComments(projectId, taskId);

				setComments(comments);

			} catch (err) {

				showToast({
					variant: "error",
					title: err.message
				});

			} finally {

				setTimeout(() => {
					setCommentsFetched(true);
				}, 200);

			}

		}

		getTaskComments();

	}, []);

	useEffect(() => {

		if (commentsFetched && chatWindowRef.current) {

			chatWindowRef.current.scrollTo({
				top: chatWindowRef.current.scrollHeight,
				behavior: "smooth",
			});

		}

	}, [comments, commentsFetched]);

	if (!commentsFetched) return <LoadingState message={"Hang on - the comments are on their way!"} />

	return (
		<div className="h-full flex flex-col">
			<div className="flex flex-col scrollbar-thin dark:scrollbar-thumb-neutral-950 
			dark:scrollbar-track-neutral-800 overflow-y-auto relative">
				<div className="flex justify-between items-center w-full px-8 h-16 sticky top-0
				bg-white/20 dark:bg-black/20 backdrop-blur-md">
					<div className="flex items-center gap-x-5">
						<button
							className="dark:bg-neutral-950 dark:border-neutral-800 dark:text-white 
							dark:hover:bg-neutral-900 bg-white hover:bg-slate-100 border-[1px] rounded-md p-2"
							onClick={() => navigate(-1)}
						>
							<ArrowLeft className="w-4 h-4" />
						</button>
						<h1 className="font-semibold truncate">
							{task.title}
						</h1>
					</div>
					<div>
						<div className="flex items-center gap-x-2">
							<img
								src={chatPartner.avatarUrl}
								className="w-8 h-8 rounded-full"
							/>
							<div className="flex flex-col text-sm">
								<span className="font-medium">
									{chatPartner.name}
								</span>
								<span>{chatPartner.position}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col flex-1 min-h-0">
					{comments.length === 0 ? (
						<EmptyState message={"No comments yet - be the first to break the silence!"} />
					) : (
						<div
							ref={chatWindowRef}
							className="grow flex flex-col px-12"
						>
							<div className="flex flex-col gap-y-4 py-5">
								<div className="flex flex-col gap-y-3">
									{comments.map((comment) => {
										return comment.projectMemberId === currentMemberId ? (
											<CurrentUserComment
												comment={comment}
												currentUser={currentUser}
												onCommentUpdate={onCommentUpdate}
												onCommentDelete={onCommentDelete}
											/>
										) : (
											<ChatPartnerComment
												comment={comment}
												chatPartner={chatPartner}
											/>
										);
									})}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="flex justify-center h-28 px-2 pt-2">
				<div className="flex flex-col border-t border-l border-r dark:border-neutral-800 
				rounded-t-lg w-9/12 bg-neutral-100 dark:bg-[rgb(20,20,20)]">
					<textarea
						className="w-full h-full rounded-lg resize-none bg-neutral-100 dark:bg-[rgb(20,20,20)] 
						focus:outline-none px-3 pt-3 scrollbar-none"
						placeholder="Type your message here..."
						onKeyDown={handleOnKeyDown}
						value={commentMessage}
						onChange={(e) => setCommentMessage(e.target.value)}
					/>
					<div
						className="flex items-center justify-center self-end p-2 rounded-full hover:bg-neutral-200 
						dark:hover:bg-neutral-800 cursor-pointer mr-2 mb-2 w-fit"
						onClick={sendComment}
					>
						<SendHorizontal className="w-4 h-4 text-neutral-500 dark:text-white" />
					</div>
				</div>
			</div>
		</div>
	);
}

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
		<div className="flex items-start gap-x-3 max-w-lg ml-auto">
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
				border-slate-300 dark:border-gray-600 bg-blue-100 dark:bg-indigo-600">
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

function ChatPartnerComment({ comment, chatPartner }) {

	const { themeMode } = useThemeContext();

	return (
		<div className="flex max-w-md mr-auto">
			<div className="flex items-start gap-x-3">
				<img
					src={chatPartner.avatarUrl}
					className="w-8 h-8 rounded-full"
				/>
				<div className="flex flex-col gap-y-1 px-4 py-2 rounded-xl border border-slate-300
				dark:border-neutral-700 whitespace-pre-wrap bg-slate-100 dark:bg-gray-700 text-slate-800
				dark:text-slate-100">
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
					<div className="flex gap-x-1.5 text-xs text-slate-400 mr-auto">
						<span>{getTimeFromIso(comment.createdAt)}</span>
						<span>{getDateFromIso(comment.createdAt)}</span>
					</div>
				</div>
			</div>
		</div>
	);

}

function getTimeFromIso(isoString) {

	const date = new Date(isoString);
	const timeString = date.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	return timeString;

}

function getDateFromIso(isoString) {

	const date = new Date(isoString);
	const dateString = date.toLocaleDateString("en-US");

	return dateString;

}

export default Comments;
