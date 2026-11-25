import apiClient from "./client";

// Added helper (not in starter spec) to flatten API error responses
import { formatApiErrors } from "../utils/formatErrors";

// Export an async function `fetchProperties(filters = {})` that
// builds a URLSearchParams object from the filters object using the following mapping:
//   filters.search        → 'search'
//   filters.min_price     → 'min_price'
//   filters.max_price     → 'max_price'
//   filters.property_type → 'property_type'
//   filters.check_in_date → 'check_in'
//   filters.check_out_date→ 'check_out'
//   filters.guests        → 'max_guests'
//   filters.host          → 'host'
//   filters.page          → 'page'

// Only append a param if the value is truthy.
// Send a GET request to /properties/?<params>.
// Throw an Error if the response is not ok.
// Return the parsed JSON (paginated list: { count, next, previous, results }).

const FILTER_MAP = {
  search: "search",
  min_price: "min_price",
  max_price: "max_price",
  property_type: "property_type",
  check_in_date: "check_in",
  check_out_date: "check_out",
  guests: "max_guests",
  host: "host",
  page: "page",
};

export async function fetchProperties(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).map(([filter, value]) => {
    if (value) params.set(FILTER_MAP[filter], value);
  });

  const queryString = params.toString();
  const url = queryString ? `/properties/?${queryString}` : "/properties/";
  const response = await apiClient(url); 

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return response.json();
}

// Export an async function `fetchPropertyDetails(id)` that
// sends a GET request to /properties/<id>/.
// Throw an Error if the response is not ok.
// Return the parsed JSON (full property object with nested photos and amenities).

export async function fetchPropertyDetails(id) {
  const response = await apiClient(`/properties/${id}/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch property details for property id: ${id}`);
  }

  return response.json();
}

// Export an async function `updateProperty(id, data)` that
// sends a PATCH request to /properties/<id>/ with `data` as a JSON body.
// If the response is not ok, parse the error JSON, flatten its values into a
// single string, and throw an Error with that message.
// Return the parsed JSON on success.

export async function updateProperty(id, data) {
  const response = await apiClient(`/properties/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errors = await response.json();
    throw new Error(formatApiErrors(errors));
  }

  return response.json();
}

// Export an async function `createProperty(data)` that
// sends a POST request to /properties/ with `data` as a JSON body.
// If the response is not ok, parse the error JSON, flatten its values into a
// single string, and throw an Error with that message.
// Return the parsed JSON on success.

export async function createProperty(data) {
  const response = await apiClient(`/properties/`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errors = await response.json();
    throw new Error(formatApiErrors(errors));
  }

  return response.json();
}
