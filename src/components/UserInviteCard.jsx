import { Check, X, } from 'lucide-react';
import { getStatusBadge } from '../utils/uiUtils';

function UserInviteCard({ invite, onRespond }) {

	return (

		<div

			className={

				`
					grid sm:grid-cols-[2fr_4fr_1fr] grid-cols-1 gap-y-7
					items-start sm:items-center bg-white dark:bg-black border border-slate-100 dark:border-slate-800
					border-l-2 last:border-b-0 dark:last-border-b-0 hover:bg-indigo-100
					dark:hover:bg-violet-900/30 transition-colors rounded-lg px-4 py-3 sm:px-6 sm:py-4

					${

						invite.status === 'accepted'
							? 'border-l-green-500 dark:border-l-green-500'
							: invite.status === "rejected"
							? 'border-l-red-500 dark:border-l-red-500'
							: 'border-l-blue-500 dark:border-l-blue-500'

					}

				`

			}

		>

			<div className='grid grid-cols-[1fr_5fr]'>

				<img

					src={invite.from.avatarUrl}
					alt={`${invite.from.fullName}'s avatar`}
					className='w-10 h-10 rounded-full object-cover self-center'

				/>

				<div className='text-gray-900 dark:text-white truncate'>

					<span className='font-medium text-sm text-slate-900 dark:text-white whitespace-nowrap truncate'>{invite.from.fullName}</span>

					<br />

					<span className='text-xs text-slate-500 truncate whitespace-nowrap'>{invite.from.email}</span>

				</div>

			</div>

			<div className='grid grid-cols-[1fr_2fr_1fr] grid-flow-row items-center w-full gap-3'>

				<div className='truncate'>

					<h3 className='font-medium text-base text-slate-900 dark:text-white truncate'>

						<span>Project: {invite.project.title}</span>{' '}
	
					</h3>

				</div>

				<div className='flex gap-3 items-center'>

					<span

						className={

							`

								inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border

								${

									invite.roleOffered === 'member'
										? 'bg-green-100 text-green-700 border-green-200 dark:text-green-200 dark:bg-green-500/30 dark:border-green-300'
										: 'bg-purple-100 text-purple-700 border-purple-200 dark:text-purple-200 dark:bg-purple-500/30 dark:border-purple-300'

								}

							`
						}

					>

						{invite.roleOffered}

					</span>

					<span>{invite.positionOffered}</span>

				</div>

				<div>

					<span className='text-sm text-slate-500'>{invite.createdAt.split('T')[0]}</span>

				</div>

			</div>

			{ invite.status === 'pending' && (

				<div className='flex justify-end items-center gap-4'>

					<div

						onClick={ () =>

							onRespond('accepted', invite.projectId, invite.id)

						}

					>

						<Check className='

							h-5 w-5 text-green-600 hover:scale-150 transition-transform duration-200 ease-in-out cursor-pointer

						'
						/>

					</div>

					
					<div

						className='pl-4 border-l-2 border-slate-500 dark:border-white'
						
						onClick={ () =>

							onRespond('rejected', invite.projectId, invite.id)

						}
						
					>

						<X className='

							h-5 w-5 text-red-500 hover:scale-150 transition-transform duration-200 ease-in-out cursor-pointer

						'
						/>
						
					</div>
		
				</div>

			)}

			{ invite.status === 'accepted' && (

				getStatusBadge(invite.status)

			)}

			{ invite.status === 'rejected' && (

				getStatusBadge(invite.status)

			)}

		</div>

	);

}

export default UserInviteCard;
