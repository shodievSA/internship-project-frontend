export const getStatusBadge = (status) => {

	switch (status) {

		case 'accepted':

			return (

				<span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900 text-white'>
					Accepted
				</span>

			);

		case 'rejected':
			
			return (

				<span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-900 text-white'>
					Rejected
				</span>

			);
			
		default:
			return null;
			
	}

};
