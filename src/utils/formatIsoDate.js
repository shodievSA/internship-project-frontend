export function formatIsoDate(isoDate) {

	// const dateObj = new Date(date);

	// const year = dateObj.getFullYear();
	// const month = String(dateObj.getMonth() + 1).padStart(2, "0");
	// const day = String(dateObj.getDate()).padStart(2, "0");

	// const formattedDate = `${year}/${month}/${day}`;

	const date = new Date(isoDate);

	// Format it
	const options = { weekday: "short", month: "short", day: "numeric" };
	const formatted = new Intl.DateTimeFormat("en-US", options).format(date);

	return formatted;

}
