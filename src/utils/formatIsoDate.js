export function formatIsoDate(date) {
	const dateObj = new Date(date);

	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, "0");
	const day = String(dateObj.getDate()).padStart(2, "0");

	const formattedDate = `${year}/${month}/${day}`;

	return formattedDate;
}
