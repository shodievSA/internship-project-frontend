const localStorageData = localStorage;

export function incrementProjectCount() {
	const raw = localStorageData.getItem("projectCount");
	const parsed = raw ? JSON.parse(raw) : null;

	if (Number.isInteger(parsed) && Number.isFinite(parsed)) {
		localStorageData.setItem("projectCount", JSON.stringify(parsed + 1));
	}
}

export function decrementProjectCount() {
	const raw = localStorageData.getItem("projectCount");
	const parsed = raw ? JSON.parse(raw) : null;

	if (Number.isInteger(parsed) && Number.isFinite(parsed) && parsed > 0) {
		localStorageData.setItem("projectCount", JSON.stringify(parsed - 1));
	}
}
