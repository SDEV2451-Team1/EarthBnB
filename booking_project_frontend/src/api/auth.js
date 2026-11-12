// Imports needed: apiClient (default) from './client'

// Authentication API functions
// All functions use apiClient so that the Authorization header and
// token-refresh logic are handled automatically.

// TODO: Export an async function `registerUser({ username, email, password, role })` that
// sends a POST request to /auth/register/ with the provided fields as a JSON body.
// Return the raw response so the caller can check .ok and parse .json().

// TODO: Export an async function `loginUser({ username, password })` that
// sends a POST request to /auth/login/ with the credentials as a JSON body.
// Return the raw response (contains access + refresh tokens on success).

// TODO: Export an async function `refreshToken({ refresh })` that
// sends a POST request to /auth/token/refresh/ with { refresh } as a JSON body.
// Return the raw response (contains a new access token on success).

// TODO: Export an async function `fetchMe()` that
// sends a GET request to /auth/me/.
// Return the raw response (contains id, username, email, role on success).
