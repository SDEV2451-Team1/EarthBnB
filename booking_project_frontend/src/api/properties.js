// Imports needed: apiClient (default) from './client'

// Properties API functions

// TODO: Export an async function `fetchProperties(filters = {})` that
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

// TODO: Export an async function `fetchPropertyDetails(id)` that
// sends a GET request to /properties/<id>/.
// Throw an Error if the response is not ok.
// Return the parsed JSON (full property object with nested photos and amenities).

// TODO: Export an async function `updateProperty(id, data)` that
// sends a PATCH request to /properties/<id>/ with `data` as a JSON body.
// If the response is not ok, parse the error JSON, flatten its values into a
// single string, and throw an Error with that message.
// Return the parsed JSON on success.

// TODO: Export an async function `createProperty(data)` that
// sends a POST request to /properties/ with `data` as a JSON body.
// If the response is not ok, parse the error JSON, flatten its values into a
// single string, and throw an Error with that message.
// Return the parsed JSON on success.
