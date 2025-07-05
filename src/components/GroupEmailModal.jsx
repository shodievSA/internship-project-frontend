import { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import InputField from "./InputField";
import AiEditor from "./AiEditor";
import Button from "./ui/Button";
import { Send, Asterisk, Check } from "lucide-react";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function GroupEmailModal({ projectId, teamMembers, showModal }) {

	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [recipients, setRecipients] = useState([]);
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
	const [messageBeingSent, setMessageBeingSent] = useState(false);

	useEffect(() => {

		if (message && recipients.length > 0) {
			setSubmitButtonDisabled(false);
		} else {
			setSubmitButtonDisabled(true);
		}

	}, [message, recipients]);

	async function sendMessage() {

		setMessageBeingSent(true);

		try {

			const res = await fetch(
				`${SERVER_BASE_URL}/api/v1/projects/${projectId}/group-message`,
				{
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify({
						subject: subject,
						message: message,
						membersId: recipients
					})
				} 
			);

			if (res.ok) {
				console.log('The message has been delivered successfully');
			} else {
				throw new Error('Error occured while delivering the message');
			}

		} catch(err) {

			console.log(err);

		} finally {

			setMessageBeingSent(false);

		}

	}

	return (
		<Modal title="Send Email to Team Members" size="lg">
			<div className="flex flex-col px-7 pb-7 gap-y-8 grow overflow-y-auto scrollbar-thin 
			dark:scrollbar-thumb-neutral-950 dark:scrollbar-track-neutral-800">
				<div className="flex flex-col gap-y-3">
					<label className="flex gap-x-0.5">
						<span className="font-semibold">Recipients</span>
						<Asterisk className="w-3 h-3 mt-0.5 text-red-500" />
					</label>
					<div className="flex gap-x-4">
						<Button 
							variant="secondary"
							size="sm"
							disabled={messageBeingSent}
							onClick={() => setRecipients(() => 
								teamMembers.map((member) => {
									return member.id;
								})
							)}
						>
							Select All
						</Button>
						<Button 
							variant="secondary"
							size="sm"
							disabled={messageBeingSent}
							onClick={() => setRecipients([])}
						>
							Deselect All
						</Button>
					</div>
					<div className="p-4 rounded-md border-[1px] dark:border-neutral-800 max-h-52 overflow-y-auto 
					scrollbar-thin dark:scrollbar-thumb-neutral-950 dark:scrollbar-track-neutral-800 flex
					flex-col gap-y-3">
						{
							teamMembers.map((member) => {
								return (
									<div className="flex gap-x-4 items-center">
										<button
											disabled={messageBeingSent}
											value={member.id}
											className={`w-5 h-5 ${recipients.includes(member.id) ? 'bg-pink-500 border-pink-500 text-white' :
											'dark:border-neutral-600 border-slate-400'} border-[1px] border-neutral-600 rounded-md cursor-pointer 
											flex justify-center items-center disabled:cursor-default disabled:opacity-50`}
											onClick={() => {
												if (recipients.includes(member.id)) {
													setRecipients((prev) => {
														return prev.filter((recipient) => recipient !== member.id)
													})
												} else {
													setRecipients([member.id, ...recipients]);
												}
											}}
										>
											{ recipients.includes(member.id) && <Check className="w-4 h-4" /> }
										</button>
										<div className="flex items-center justify-between w-full">
											<div className="flex flex-col">
												<h3>{ member.fullName }</h3>
												<h4 className="text-sm">{ member.email }</h4>
											</div>
											<span className="text-sm">{ member.position }</span>
										</div>
									</div>
								)
							})
						}
					</div>
					<p className="text-sm">Selected: {recipients.length} / {teamMembers.length}</p>
				</div>
				<InputField 
					label="Subject (optional)"
					disabled={messageBeingSent}
					placeholder="Enter your email subject"
					value={subject}
					setValue={setSubject}
				/>
				<AiEditor 
					label="Message"
					placeholder="Enter your message..."
					required={true}
					error="Your message can't be empty"
					rows={7}
					value={message}
					setValue={setMessage}
					disabled={messageBeingSent}
				/>
			</div>
			<div className="grid grid-cols-2 gap-4 border-t-[1px] dark:border-neutral-800 
            border-neutral-200 p-4">
				<Button
					disabled={messageBeingSent}
					variant="secondary"
					size="lg"
					onClick={() => showModal(false)}
				>
					Cancel
				</Button>
				<Button
					disabled={submitButtonDisabled}
					loading={messageBeingSent}
					size="lg"
					onClick={sendMessage}
				>
					<div className="flex items-center justify-center gap-x-3">
						<Send className="h-5 w-5" />
						<span>Send Email</span>
					</div>
				</Button>
			</div>
		</Modal>
	);

}

export default GroupEmailModal;