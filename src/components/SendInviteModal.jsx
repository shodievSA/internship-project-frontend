import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "./ui/ToastProvider";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import SearchBar from "./SearchBar";
import { Mail } from "lucide-react";
import InputField from "./InputField";
import SelectField from "./SelectField";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function SendInviteModal({ closeModal, onNewInviteCreated }) {

	const { projectId } = useParams();
	const { showToast } = useToast();

	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [email, setEmail] = useState('');
	const [position, setPosition] = useState('');
	const [role, setRole] = useState(null);
	const [gmailContacts, setGmailContacts] = useState([]);
	const [gmailContactsFetched, setGmailContactsFetched] = useState(false);
	const [inviteBeingSent, setInviteBeingSent] = useState(false);
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

	useEffect(() => {

		getGmailContacts();

		async function getGmailContacts() {

			try {

				const res = await fetch(`${SERVER_BASE_URL}/api/v1/me/gmail-contacts`, {
					method: 'GET',
					credentials: 'include'
				});

				const { contacts } = await res.json();

				setGmailContacts(contacts);

			} catch(err) {

				console.log(err);

			} finally {

				setGmailContactsFetched(true);

			}

		}

	}, []);

	useEffect(() => {

		if (email && position && role) {
			setSubmitButtonDisabled(false);
		} else {
			setSubmitButtonDisabled(true);
		}

	}, [email, position, role]);

	useEffect(() => {

		if (gmailContactsFetched) {

			if (!searchQuery) {
				return setSearchResults(gmailContacts);
			}

			setSearchResults(() => {
				
				return gmailContacts.filter((contact) => {

					if (
						contact.fullName.toLowerCase().includes(searchQuery.toLowerCase())
						|| 
						contact.email.toLowerCase().includes(searchQuery.toLowerCase())
					) {
						return contact;
					}

				})

			});

		}

	}, [searchQuery, gmailContactsFetched, gmailContacts]);

	async function sendInvite() {

		setInviteBeingSent(true);

		try {

			const res = await fetch(`${SERVER_BASE_URL}/api/v1/projects/${projectId}/invites`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					receiverEmail: email,
					positionOffered: position,
					roleOffered: role
				})
			});

			if (!res.ok) {
				throw new Error('response was unsuccessfull');
			}

			const { invite } = await res.json();

			onNewInviteCreated(invite);

			closeModal();

			showToast({ 
				variant: "success", 
				title: "Invite sent successfully!", 
				message: `Your invite to ${email} has been delivered successfully!`
			});

		} catch(err) {

			console.log('Error occured while sending project invite: ' + err.message);

			showToast({ 
				variant: "failure", 
				title: "Unexpected error occured!", 
				message: `Error occured while sending invite to ${email}. Please, try again later!`
			});

		} finally {

			setInviteBeingSent(false);

		}

	}

	return (
		<Modal
			title="Send Invitation"
			size="lg"
			titleIcon={<Mail />}
			closeModal={closeModal}
		>
			<div className="flex flex-col px-7 pb-7 gap-y-8 grow overflow-y-auto scrollbar-thin 
			dark:scrollbar-thumb-neutral-950 dark:scrollbar-track-neutral-800 grow">
				<div className="flex flex-col gap-y-2">
					<SearchBar 
						placeholder="Search your gmail contacts..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<div className="rounded-md dark:border-neutral-800 border-neutral-200 border-[1px] 
					p-4 max-h-48 overflow-y-auto scrollbar-thin dark:scrollbar-thumb-neutral-950 
					dark:scrollbar-track-neutral-800">
						{
							!gmailContactsFetched ? (
								<div className="flex items-center justify-center gap-x-3">
									<div className="flex justify-center relative w-5 h-5">
										<div className="absolute w-5 h-5 border-2 dark:border-gray-300 border-gray-400 rounded-full"></div>
										<div className="absolute w-5 h-5 border-2 border-transparent border-t-white 
										dark:border-t-black rounded-full animate-spin"></div>
									</div>
									<h1>Loading your gmail contacts</h1>
								</div>
							) : gmailContacts.length === 0 ? (
								<div>No Contacts</div>
							) : searchResults.length > 0 ? (
								<div className="flex flex-col gap-y-3">
									{
										searchResults.map((contact, index) => {
											return (
												<div 
													key={index}
													className={`flex items-center gap-x-3 rounded-md dark:border-neutral-800 
													border-neutral-200 border-[1px] p-3 cursor-pointer dark:hover:bg-neutral-900
													${gmailContacts.includes(email)}`}
													onClick={() => {
														setEmail(contact.email)
														setSearchQuery('')
													}}>
													<div>
														<img src={contact.avatarUrl} className="rounded-full w-10 h-10" />
													</div>
													<div className="flex flex-col">
														<span>{ contact.fullName }</span>
														<span className="text-sm">{ contact.email }</span>
													</div>
												</div>
											)
										})
									}
								</div>
							) : (
								<div>No results that match your query</div>
							)
						}
					</div>
				</div>
				<div className="flex flex-col gap-y-5">
					<InputField 
						label="Gmail Address"
						placeholder="Enter gmail address"
						value={email}
						setValue={setEmail}
						disabled={inviteBeingSent}
					/>
					<InputField 
						label="Position"
						placeholder="e.g QA Engineer"
						value={position}
						setValue={setPosition}
						disabled={inviteBeingSent}
					/>
					<SelectField 
						label="Role"
						placeholder="Specify role"
						disabled={inviteBeingSent}
						value={role}
						setValue={setRole}
						options={[
							{ label: "Member", value: "member" },
							{ label: "Manager", value: "manager" }
						]}
					/>
				</div>
			</div>
			<div className="grid grid-cols-2 mt-auto p-4 dark:border-neutral-800 border-neutral-200 
			border-t-[1px] gap-x-4">
				<Button
					variant="secondary"
					size="md"
					onClick={closeModal}
					disabled={inviteBeingSent}
				>
					Cancel
				</Button>
				<Button
					variant="primary"
					size="md"
					disabled={submitButtonDisabled}
					loading={inviteBeingSent}
					onClick={sendInvite}
				>
					Send Invite
				</Button>
			</div>
		</Modal>
	)

}

export default SendInviteModal;

