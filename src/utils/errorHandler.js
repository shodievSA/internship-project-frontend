/**
 * Standardized error handler for API responses
 * @param {Response} response - The fetch response object
 * @param {string} defaultMessage - Default error message if no error is provided
 * @returns {Promise<Object>} The parsed JSON response
 * @throws {Error} Throws an error with the appropriate message
 */
export async function handleApiResponse(
	response,
	defaultMessage = "An error occurred"
) {
	if (!response.ok) {
		const error = await response.json().catch(() => ({}));
		throw new Error(error.error || error.message || defaultMessage);
	}
	return response.json();
}

/**
 * Standardized error handler for API responses that don't return JSON
 * @param {Response} response - The fetch response object
 * @param {string} defaultMessage - Default error message if no error is provided
 * @returns {Promise<Response>} The response object
 * @throws {Error} Throws an error with the appropriate message
 */
export async function handleApiResponseNoJson(
	response,
	defaultMessage = "An error occurred"
) {
	if (!response.ok) {
		const error = await response.json().catch(() => ({}));
		throw new Error(error.error || error.message || defaultMessage);
	}
	return response;
}

/**
 * Standardized error handler for API responses that return boolean
 * @param {Response} response - The fetch response object
 * @param {string} defaultMessage - Default error message if no error is provided
 * @returns {Promise<boolean>} True if successful
 * @throws {Error} Throws an error with the appropriate message
 */
export async function handleApiResponseBoolean(
	response,
	defaultMessage = "An error occurred"
) {
	if (!response.ok) {
		const error = await response.json().catch(() => ({}));
		throw new Error(error.error || error.message || defaultMessage);
	}
	return true;
}
