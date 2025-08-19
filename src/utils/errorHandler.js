/**
 * Utility function to handle API error responses and extract user-friendly error messages
 * @param {Error} err - The error object from axios or fetch
 * @param {string} fallbackMessage - Fallback message if no specific error is found
 * @returns {string[]} Array of error messages to display
 */
export const extractErrorMessages = (err, fallbackMessage = "An error occurred") => {
    const errorMessages = [];

    if (err?.response?.data) {
        const { success, message, errors } = err.response.data;

        if (!success && errors) {
            // Handle validation errors
            if (typeof errors === 'string') {
                // Single error message
                errorMessages.push(errors);
            } else if (typeof errors === 'object') {
                // Multiple field errors - extract all error messages
                Object.values(errors).forEach(errorMsg => {
                    if (errorMsg && typeof errorMsg === 'string') {
                        errorMessages.push(errorMsg);
                    }
                });
            }

            // If no specific errors found, use the general message
            if (errorMessages.length === 0) {
                errorMessages.push(message || "Validation failed");
            }
        } else if (message) {
            // Handle other error messages
            errorMessages.push(message);
        }
    } else if (err?.message) {
        // Handle network or other errors
        errorMessages.push(err.message);
    }

    // If no error messages were extracted, use fallback
    if (errorMessages.length === 0) {
        errorMessages.push(fallbackMessage);
    }

    return errorMessages;
};

/**
 * Display error messages using toast notifications
 * @param {Error} err - The error object
 * @param {string} fallbackMessage - Fallback message if no specific error is found
 * @param {Function} toastError - Toast error function (e.g., toast.error from react-hot-toast)
 */
export const displayErrorMessages = (err, fallbackMessage, toastError) => {
    const errorMessages = extractErrorMessages(err, fallbackMessage);

    // Display each error message
    errorMessages.forEach(errorMsg => {
        toastError(errorMsg);
    });
};

/**
 * Format validation error messages to be more user-friendly
 * @param {string} errorMessage - Raw error message from backend
 * @returns {string} Formatted error message
 */
export const formatValidationError = (errorMessage) => {
    if (!errorMessage) return errorMessage;

    // Remove quotes and improve readability
    let formatted = errorMessage.replace(/"/g, '');

    // Capitalize first letter
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

    // Replace underscores with spaces
    formatted = formatted.replace(/_/g, ' ');

    // Handle common validation messages
    if (formatted.includes('is not allowed to be empty')) {
        formatted = formatted.replace('is not allowed to be empty', 'is required');
    }

    if (formatted.includes('must be a valid')) {
        formatted = formatted.replace('must be a valid', 'must be a valid');
    }

    return formatted;
};
