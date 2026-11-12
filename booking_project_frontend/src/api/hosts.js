// Imports needed: apiClient (default) from './client'

// Host API functions
// These functions call host-specific endpoints that require authentication.

// TODO: Export an async function `fetchHostDetails()` that
// sends a GET request to /auth/me/.
// Throw an Error if the response is not ok.
// Return the parsed JSON (contains id, username, email, role).

// TODO: Export an async function `fetchHostProperties({ page, status } = {})` that
// builds a URLSearchParams object from page and status (only append each if truthy),
// sends a GET request to /properties/host_properties/ with those query params,
// throws an Error if the response is not ok,
// and returns the parsed JSON (paginated list: { count, next, previous, results }).

// TODO: Export an async function `fetchHostStats()` that
// sends a GET request to /properties/host_stats/.
// Throw an Error if the response is not ok.
// Return the parsed JSON (contains total_listings, bookings_last_30_days, earnings_last_30_days).
