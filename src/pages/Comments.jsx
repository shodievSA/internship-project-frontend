import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, SendHorizontal, Info } from "lucide-react";
import commentService from "../services/commentService";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import { useToast } from "../components/ui/ToastProvider";
import { useProject } from "../context/ProjectContext";
import CurrentUserComment from "../components/CurrentUserComment";
import ChatPartnerComment from "../components/ChatPartnerComment";
import TaskDetailsModal from "../components/TaskDetailsModal";
const SERVER_HOST = import.meta.env.VITE_HOST;

function Comments() {
	const { projectId, taskId } = useParams();
	const { showToast } = useToast();
	const { currentMemberId } = useProject();

	const navigate = useNavigate();

	const socketRef = useRef(null);
	const chatWindowRef = useRef(null);

	const [taskCommentsData, setTaskCommentsData] = useState({});
	const [commentMessage, setCommentMessage] = useState("");
	const [commentsFetched, setCommentsFetched] = useState(false);
	const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);

	function sendComment() {
		if (commentMessage.trim()) {
			socketRef.current.send(
				JSON.stringify({
					type: "new-comment",
					message: commentMessage,
					taskId: taskId,
					memberId: currentMemberId,
				})
			);

			setCommentMessage("");
		}
	}

	function onCommentUpdate(commentId, updatedComment) {
		socketRef.current.send(
			JSON.stringify({
				type: "update-comment",
				commentId: commentId,
				updatedComment: updatedComment,
				taskId: taskId,
			})
		);
	}

	function onCommentDelete(commentId) {
		socketRef.current.send(
			JSON.stringify({
				type: "delete-comment",
				commentId: commentId,
				taskId: taskId,
			})
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
						memberId: currentMemberId,
					})
				);
			}
		};

		socketRef.current.onmessage = (event) => {
			const data = JSON.parse(event.data);

			if (data.type === "new-comment") {
				const newComment = data.comment;

				setTaskCommentsData((prevData) => ({
					...prevData,
					comments: [...prevData.comments, newComment],
				}));
			} else if (data.type === "updated-comment") {
				const updatedComment = data.updatedComment;

				setTaskCommentsData((prevData) => ({
					...prevData,
					comments: prevData.comments.map((comment) => {
						return comment.id === updatedComment.id
							? updatedComment
							: comment;
					}),
				}));
			} else if (data.type === "deleted-comment") {
				const deletedCommentId = data.deletedCommentId;

				setTaskCommentsData((prevData) => ({
					...prevData,
					comments: prevData.comments.filter((comment) => {
						return comment.id !== deletedCommentId;
					}),
				}));
			}
		};

		return () => {
			socketRef.current.close(
				1000,
				"Closing the websocket connection from the client side normally!"
			);
		};
	}, []);

	useEffect(() => {
		async function getTaskComments() {
			try {
				const { taskCommentsData } =
					await commentService.getTaskComments(projectId, taskId);

				setTaskCommentsData(taskCommentsData);
			} catch (err) {
				showToast({
					variant: "error",
					title: err.message,
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
	}, [taskCommentsData, commentsFetched]);

	if (!commentsFetched)
		return (
			<LoadingState
				message={"Hang on - the comments are on their way!"}
			/>
		);

	return (
		<>
			<div className="h-full flex flex-col relative">
				<div
					ref={chatWindowRef}
					className="flex grow flex-col scrollbar-thin dark:scrollbar-thumb-neutral-950 
			dark:scrollbar-track-neutral-800 overflow-y-auto relative"
				>
					<div
						className="flex justify-between items-center w-full px-5 h-16 
				sticky top-0 bg-white/20 dark:bg-black/20 backdrop-blur-lg"
					>
						<div className="flex items-center gap-x-5">
							<button
								className="dark:bg-neutral-950 dark:border-neutral-800 dark:text-white 
							dark:hover:bg-neutral-900 bg-white hover:bg-slate-100 border-[1px] rounded-md p-2"
								onClick={() => navigate(-1)}
							>
								<ArrowLeft className="w-4 h-4" />
							</button>
							<div className="flex gap-x-2 items-center">
								<h1 className="font-semibold truncate">
									{taskCommentsData.taskInfo.title}
								</h1>
								<button
									className="p-1.5 hover:bg-slate-100 rounded-full cursor-pointer
								mt-[1px]"
									onClick={() =>
										setShowTaskDetailsModal(true)
									}
								>
									<Info className="w-4 h-4 text-slate-700" />
								</button>
							</div>
						</div>
						<div>
							<div className="flex items-center gap-x-4">
								<div className="flex flex-col text-right">
									<span className="font-medium text-sm">
										{taskCommentsData.chatPartner.name}
									</span>
									<span className="text-slate-500 text-xs">
										{taskCommentsData.chatPartner.position}
									</span>
								</div>
								<img
									src={taskCommentsData.chatPartner.avatarUrl}
									className="w-8 h-8 rounded-full"
								/>
							</div>
						</div>
					</div>
					<div className="flex flex-col flex-1 min-h-0">
						{taskCommentsData.comments.length === 0 ? (
							<EmptyState
								message={
									"No comments yet - be the first to break the silence!"
								}
							/>
						) : (
							<div className="grow flex flex-col px-28 pb-52">
								<div className="flex flex-col gap-y-4 py-5">
									<div className="flex flex-col gap-y-3">
										{taskCommentsData.comments.map(
											(comment) => {
												return comment.projectMemberId ===
													currentMemberId ? (
													<CurrentUserComment
														comment={comment}
														currentUser={
															taskCommentsData.currentUser
														}
														onCommentUpdate={
															onCommentUpdate
														}
														onCommentDelete={
															onCommentDelete
														}
													/>
												) : (
													<ChatPartnerComment
														comment={comment}
														chatPartner={
															taskCommentsData.chatPartner
														}
													/>
												);
											}
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				<div
					className="flex flex-col border dark:border-neutral-800 
			rounded-xl w-8/12 bg-neutral-100/20 dark:bg-[rgb(20,20,20)]/50 backdrop-blur-xl 
			absolute bottom-4 left-1/2 -translate-x-1/2 h-32"
				>
					<textarea
						className="w-full h-full rounded-lg resize-none bg-transparent 
					dark:bg-transparent focus:outline-none px-3 pt-3 scrollbar-none"
						placeholder="Type your message here..."
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
			{showTaskDetailsModal && (
				<TaskDetailsModal
					taskId={taskId}
					closeModal={() => setShowTaskDetailsModal(false)}
				/>
			)}
		</>
	);
}

export default Comments;
