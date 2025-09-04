import ReactMarkdown from "react-markdown";
import { useThemeContext } from "../context/ThemeContext";
import rehypeHighlight from "rehype-highlight";

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

export default ChatPartnerComment;