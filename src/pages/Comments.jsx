import { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	ArrowLeft,
	SendHorizontal,
	Pencil,
	Check,
	X,
	Trash,
} from "lucide-react";
import commentService from "../services/commentService";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
const SERVER_HOST = import.meta.env.VITE_HOST;

function Comments() {
	const { projectId, taskId } = useParams();
	const {
		state: { task, currentMemberId },
	} = useLocation();

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
		socketRef.current.send(
			JSON.stringify({
				type: "new-comment",
				message: commentMessage,
				taskId: taskId,
				memberId: currentMemberId,
			}),
		);

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
			socketRef.current.close(
				1000,
				"Closing the websocket connection from the client side normally!",
			);
		};
	}, []);

	useEffect(() => {
		async function getTaskComments() {
			try {
				const { comments } = await commentService.getTaskComments(
					projectId,
					taskId,
				);
				setComments(comments);
			} catch (err) {
				console.log(err.message);
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

	if (!commentsFetched)
		return (
			<LoadingState
				message={"Hang on - the comments are on their way!"}
			/>
		);

	return (
		<div className="h-full flex flex-col px-8 pt-4">
			<div className="flex justify-between items-center pb-6">
				<div className="flex items-center gap-x-5">
					<button
						className="dark:bg-neutral-950 dark:border-neutral-800 dark:text-white 
						dark:hover:bg-neutral-900 bg-white hover:bg-slate-100 border-[1px] rounded-md p-2"
						onClick={() => navigate(-1)}
					>
						<ArrowLeft className="w-4 h-4" />
					</button>
					<h1 className="text-lg font-medium">{task.title}</h1>
				</div>
				<div>
					<div className="flex items-center gap-x-2">
						<img
							src={chatPartner.avatarUrl}
							className="w-10 h-10 rounded-full"
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
			<div className="flex flex-col flex-1 min-h-0 gap-y-4">
				{comments.length === 0 ? (
					<EmptyState
						message={
							"No comments yet - be the first to break the silence!"
						}
					/>
				) : (
					<div
						ref={chatWindowRef}
						className="h-full flex flex-col scrollbar-thin dark:scrollbar-thumb-neutral-950 
							dark:scrollbar-track-neutral-800 overflow-y-auto"
					>
						<div className="pr-5 flex flex-col gap-y-4 py-5">
							<div className="flex flex-col gap-y-3">
								{comments.map((comment) => {
									return comment.projectMemberId ===
										currentMemberId ? (
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
				<div className="h-32 pb-4">
					<div className="flex flex-col border dark:border-neutral-700 rounded-md">
						<textarea
							className="w-full h-full rounded-md resize-none dark:bg-black 
							focus:outline-none p-3 scrollbar-none"
							placeholder="Write your commend here..."
							onKeyDown={handleOnKeyDown}
							value={commentMessage}
							onChange={(e) => setCommentMessage(e.target.value)}
						/>
						<div
							className="flex items-center justify-center self-end p-2 rounded-full hover:bg-neutral-100 
							dark:hover:bg-neutral-800 cursor-pointer mr-2 mb-2 w-fit"
							onClick={sendComment}
						>
							<SendHorizontal className="w-5 h-5 text-neutral-500 dark:text-white" />
						</div>
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
				<div
					className="min-w-[400px] h-28 bg-neutral-100 dark:bg-neutral-900 
					rounded-md border dark:border-neutral-700"
				>
					<div className="flex flex-col h-full">
						<textarea
							className="w-full h-full resize-none dark:bg-black focus:outline-none 
								px-3 pt-3 scrollbar-none rounded-md bg-neutral-100 dark:bg-neutral-900"
							placeholder="Edit your commend here..."
							onKeyDown={handleOnKeyDown}
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
						></textarea>
						<div className="grow flex items-center gap-x-4 p-2 p-2">
							<div
								className="p-1 rounded-md hover:bg-red-700/10 hover:dark:bg-red-700/30 
									cursor-pointer"
								onClick={() => deleteComment(comment.id)}
							>
								<Trash className="w-4 h-4 text-red-700 dark:text-red-800" />
							</div>
							<div className="flex gap-x-4 ml-auto">
								<div
									className="p-1 rounded-md hover:bg-neutral-200 hover:dark:bg-neutral-800 
									cursor-pointer"
								>
									<Check
										className="w-4 h-4"
										onClick={() =>
											updateComment(
												comment.id,
												newMessage,
											)
										}
									/>
								</div>
								<div
									className="p-1 rounded-md hover:bg-neutral-200 hover:dark:bg-neutral-800 
									cursor-pointer"
								>
									<X
										className="w-4 h-4"
										onClick={reverseChanges}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div
					className="flex flex-col gap-y-1 px-4 py-2 rounded-lg border 
					dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900"
				>
					<div className="flex justify-between gap-x-5 group/item">
						<p>{comment.message}</p>
						<div
							className="opacity-0 group-hover/item:opacity-100 transition-[opacity]
								duration-300 self-start cursor-pointer"
							onClick={onEditButtonClicked}
						>
							<Pencil className="w-3.5 h-3.5 mt-0.5" />
						</div>
					</div>
					<div className="flex gap-x-1.5 text-xs dark:text-neutral-400 mr-auto">
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
	return (
		<div className="flex flex-col max-w-md mr-auto gap-y-2">
			<span className="text-sm">{chatPartner.name.split(" ")[0]}</span>
			<div className="flex items-start gap-x-3">
				<img
					src={chatPartner.avatarUrl}
					className="w-8 h-8 rounded-full"
				/>
				<div
					className="flex flex-col gap-y-1 px-4 py-2 rounded-lg border 
				dark:border-neutral-700"
				>
					<p>{comment.message}</p>
					<div className="flex gap-x-1.5 text-xs dark:text-neutral-400 mr-auto">
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
