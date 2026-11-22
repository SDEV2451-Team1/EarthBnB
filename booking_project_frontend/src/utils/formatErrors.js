export function formatApiErrors(errors) {
  // Errors are already type string, early return of errors
  if (typeof errors === "string") return errors;

  // Errors is an array, flatten using .join(" ")
  if (Array.isArray(errors)) {
    return errors.join(" ");
  }

  // Errors are an object type with key and value
  // E.g., Field validation objects ({ title: ["May not be blank."], price_per_night: ["Value must be greater than 0."]})
  if (errors && typeof errors === "object") {
    return Object.entries(errors)
      .map(([field, messages]) => {
        // Object value (messages) can be an array, if so, flatten with join(" ")
        // if not, already a string
        const text = Array.isArray(messages) ? messages.join(" ") : messages;
        // Include the field name to know which input failed
        return `${field}: ${text}`;
      })
      .join(" ");
  }

  // Fallback return
  return String(errors ?? "An unknown error occurred.");
}
