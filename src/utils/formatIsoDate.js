export function formatIsoDate(isoDate) {

	const date = new Date(isoDate);
	
	const options = { weekday: "short", month: "short", day: "numeric" };
	const formatted = new Intl.DateTimeFormat("en-US", options).format(date);

	return formatted;

}

export function getTimeFromIso(isoString) {

	const date = new Date(isoString);
	const timeString = date.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	return timeString;

}

export function getDateFromIso(isoString) {

	const date = new Date(isoString);
	const dateString = date.toLocaleDateString("en-US");

	return dateString;

}
