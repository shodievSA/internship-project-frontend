import { Check, X, Mail, Folder, Calendar } from 'lucide-react';
import { getStatusBadge } from '../utils/uiUtils';

function UserInviteCard({ invite, onRespond }) {

	return (

		<div

			className={

				`
					grid grid-cols-1 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-y-5
					items-start justify-items-stretch sm:items-center bg-white dark:bg-black border border-slate-100 dark:border-slate-800
					border-l-8 last:border-b-0 dark:last:border-b-0 hover:bg-indigo-100
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

			<div className='flex items-center gap-3 col-span-3'>

				<img

					src={ invite.from.avatarUrl }
					alt={ `${invite.from.fullName}'s avatar` }
					className='col-span-1 w-10 h-10 rounded-full object-cover self-center'

				/>
	
				<div className='col-span-2 text-gray-900 dark:text-white truncate'>
					
					<span className='text-xs text-slate-500 truncate whitespace-nowrap'>Invited By</span>

					<br />

					<span className='font-medium text-sm text-slate-900 dark:text-white whitespace-nowrap truncate'>{ invite.from.fullName }</span>

					<br />

					<span className='flex text-xs text-slate-500 truncate whitespace-nowrap'>

						<Mail className='w-3 h-4 mr-1' /> { invite.from.email }

					</span>

				</div>

			</div>

			<div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 col-span-8 grid-flow-row items-center w-full gap-3'>

				<div className='sm:col-span-3 col-span-4 truncate'>

					<span className='text-xs text-slate-500 truncate whitespace-nowrap'>Project</span>

					<br />

					<h3 className='font-medium text-base text-slate-900 dark:text-white truncate'>

						<span className='flex'>

							<Folder className='w-3 h-6 mr-1' /> { invite.project.title }

						</span>
	
					</h3>

				</div>

				<div className='sm:col-span-3 col-span-4'>

					<span className='text-xs text-slate-500 truncate whitespace-nowrap mr-2'>Role Offered</span>
					<span className='text-xs text-slate-500 truncate whitespace-nowrap'>Position Offered</span>

					<br />

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

					<span className='ml-3'>{invite.positionOffered}</span>
					
				</div>

				<div className='grid'>

					<span className='text-xs text-slate-500 truncate whitespace-nowrap'>Invited At</span>

					<br />

					<span className='flex text-sm text-slate-500'>

						<Calendar className='w-3 h-5 mr-1' />
						{invite.createdAt.split('T')[0]}
						
					</span>

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
