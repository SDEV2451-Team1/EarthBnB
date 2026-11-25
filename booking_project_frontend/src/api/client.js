// API Client
// This module exports a single `apiClient` function used by all API modules.
// It also exports `setAuthCallbacks` so AuthContext can register token-refresh
// and logout handlers that the client calls automatically on 401 responses.

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

// Module-level state for the auth callback bridge.
// These are set once by AuthContext via setAuthCallbacks().
let _onTokenRefresh = null;
let _onLogout = null;
let _refreshPromise = null; // deduplicates concurrent 401 refresh attempts

// Export a function `setAuthCallbacks({ onTokenRefresh, onLogout })` that stores
// the two callbacks in the module-level variables above so apiClient can call them.

export function setAuthCallbacks({ onTokenRefresh, onLogout }) {
  _onTokenRefresh = onTokenRefresh;
  _onLogout = onLogout;
}

// Export a default async function `apiClient(endpoint, options = {})` that:
//   1. Builds the full URL: BASE_URL + endpoint
//   2. Reads 'earthbnb_access' from localStorage and, if present, adds an
//      Authorization: Bearer <token> header to the request options
//   3. Makes a fetch() call with the merged headers and options
//   4. If the response status is 401 AND _onTokenRefresh is registered AND
//      'earthbnb_access' exists in localStorage:
//        a. Deduplicate: if _refreshPromise is null, set it to _onTokenRefresh()
//           chained with .finally(() => { _refreshPromise = null })
//        b. Await _refreshPromise to get the new access token
//        c. Retry the original fetch with the new token in the Authorization header
//        d. If the refresh throws, call _onLogout?.() to clear auth state
//   5. Return the (possibly retried) response

async function apiClient(endpoint, options = {}) {
  const accessToken = localStorage.getItem("earthbnb_access");

  const headers = {
    "Content-Type": "application/json",
    // spread existing headers by caller, adds access token if present
    ...options.headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  let res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (res.status === 401 && _onTokenRefresh && accessToken) {
    try {
      if (!_refreshPromise) {
        // If multiple API calls fail at once, only the first triggers a token refresh,
        // the rest wait for that single refresh to finish before retrying
        // i.e., only one POST /auth/token/refresh/ is ever sent
        _refreshPromise = _onTokenRefresh().finally(() => {
          // Reset when done so future expired tokens can refresh again
          _refreshPromise = null;
        });
      }

      const newAccessToken = await _refreshPromise;

      res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: { ...headers, Authorization: `Bearer ${newAccessToken}` },
      });
    } catch {
      _onLogout?.();
    }
  }

  return res;
}

export default apiClient;
