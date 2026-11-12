# Assignment 4 - EarthBnB Todo

Legend: [x] Done · [ ] Not done

---

## Backend

### Setup & Configuration
- [ ] Fix `UserProfile` admin error (`'UserProfile' object has no attribute 'user'`)
- [ ] Add `django-cors-headers` and allow all origins for development
- [ ] Add `djangorestframework-simplejwt` to `requirements.txt` (was accidentally reverted by linter)

### Authentication
- [ ] Install and configure Simple JWT (`REST_FRAMEWORK` settings, `SIMPLE_JWT` settings)
- [ ] `POST /api/v1/auth/register/` - user registration (username, email, password, role)
- [ ] `POST /api/v1/auth/login/` - JWT token obtain (returns access + refresh tokens)
- [ ] `POST /api/v1/auth/token/refresh/` - silent token refresh
- [ ] `GET /api/v1/auth/me/` - returns authenticated user's id, username, email, role (`MeView`)

### Permissions
- [ ] `IsHostUser` custom permission class moved to `core/permissions.py` - reusable across any viewset

### Data & Fixtures
- [ ] `data/properties.csv` - 50 sample properties (varied types, locations, prices, amenities)
- [ ] `booking_app` management command `load_properties` - loads properties from CSV
- [ ] `data/bookings.csv` - sample bookings with varied statuses
- [ ] `booking_app` management command `load_bookings` - loads bookings from CSV, associates with a guest username

### Admin Site
- [ ] All `booking_app` models registered in `admin.py` (Property, Amenity, PropertyAmenity, Booking, etc.)

### Properties API
- [ ] `ReadOnlyPropertySerializer` - full property representation including nested photos, amenities, host info
- [ ] `CreateUpdatePropertySerializer` - write serializer for host create/edit
- [ ] `PropertyViewSet` with per-action serializer and permission selection
- [ ] Filtering via `django-filter`: city, country, property_type, status, min_price, max_price, bedrooms, max_guests, amenities (AND logic), host (by id)
- [ ] `PropertyPagination` - 10 results per page
- [ ] Availability filter - excludes properties with overlapping `pending`/`confirmed` bookings for requested check-in/check-out dates
- [ ] Search filter - title, description, city, country (case-insensitive)
- [ ] `retrieve` action requires authentication (returns 403 for unauthenticated users)
- [ ] `host_properties` action - `GET /api/v1/properties/host_properties/` - returns all statuses for authenticated host, paginated, filterable by status; requires `IsAuthenticated` + `IsHostUser`
- [ ] `host_stats` action - `GET /api/v1/properties/host_stats/` - returns total listings, bookings last 30 days, earnings last 30 days; requires `IsAuthenticated` + `IsHostUser`

### Bookings API
- [ ] `BookingSerializer` - validates dates, guest count vs. `max_guests`, no overlapping bookings; computes `nightly_rate`, `num_nights`, `subtotal`, `total_price`
- [ ] `BookingViewSet` - `POST /api/v1/bookings/` (create), `GET /api/v1/bookings/` (list own bookings); requires authentication; scoped to `guest=request.user`

### Testing
- [ ] `test_property_viewset.py` - list (no filters), all filter types, retrieve, create, update, partial update, delete
- [ ] Search filter tests - title, description, city, country (match, no-match, case-insensitive, multi-match)
- [ ] `test_booking_viewset.py` - tests for BookingViewSet and BookingSerializer (create with valid data, invalid dates, guest count over limit, overlapping bookings, unauthenticated access)
- [ ] `test_auth.py` - tests for registration, login, token refresh, and `/me/` endpoints
- [ ] `test_host_viewset.py` - tests for `host_properties` and `host_stats` actions (authenticated host, non-host, unauthenticated)

---

## Frontend

### Project Setup
- [ ] React Router, TanStack Query, Daisy UI installed and configured
- [ ] `QueryClientProvider`, `AuthProvider`, `NotificationProvider`, `PropertySearchFiltersProvider` wrapping the app in `App.jsx`

### API Layer (`src/api/`)
- [ ] `client.js` - `apiClient` with request interceptor (injects Bearer token from localStorage), automatic 401 token refresh retry with deduplication (`_refreshPromise`), logout on refresh failure, module-level callback bridge (`setAuthCallbacks`)
- [ ] `auth.js` - `registerUser`, `loginUser`, `refreshToken`, `fetchMe`
- [ ] `properties.js` - `fetchProperties` (with all filter params including host + pagination), `fetchPropertyDetails`, `createProperty`, `updateProperty` (PATCH)
- [ ] `bookings.js` - `createBooking`
- [ ] `hosts.js` - `fetchHostDetails` (calls `/auth/me/`), `fetchHostStats` (calls `/properties/host_stats/`), `fetchHostProperties` (calls `/properties/host_properties/` with page + status params)

### Hooks (`src/hooks/`)
- [ ] `useAuth.js` - access `AuthContext` (user, tokens, login, logout, refresh)
- [ ] `usePropertySearchFilters.js` - access `PropertySearchFiltersContext`
- [ ] `useNotification.js` - access `NotificationContext`
- [ ] `useProperties.js` - TanStack Query fetch with filter-driven invalidation; `submitCreateProperty` mutation with cache invalidation on success
- [ ] `usePropertyDetails.js` - TanStack Query fetch for a single property by id
- [ ] `useCreateBooking.js` - TanStack `useMutation` for booking creation with parsed DRF error messages
- [ ] `useHostProperties.js` - fetches host's own properties via `host_properties` action; reads `page` from filters context; accepts `status` param for sidebar tab filtering; returns `hasNext`, `hasPrevious`
- [ ] `useHostDetails.js` - fetches authenticated host's profile via `/auth/me/`
- [ ] `useHostStats.js` - fetches host stats via `/properties/host_stats/`

### Contexts (`src/contexts/`)
- [ ] `PropertySearchFiltersContext.jsx` - search, min_price, max_price, property_type, check_in_date, check_out_date, guests, page
- [ ] `AuthContext.jsx` - user (id, username, role), token, accessToken; login/logout/refresh mutations; localStorage persistence (5 keys: access, refresh, user_id, username, role); calls `fetchMe` post-login to get role; registers `setAuthCallbacks` for the apiClient
- [ ] `NotificationContext.jsx` - message, type, isOpen; auto-dismiss toast (3500ms) rendered inside provider

### Components
- [ ] `layout/Navbar.jsx` - EarthBnB logo; Sign In button or user avatar with logout dropdown; "My Host Profile" link visible only to authenticated hosts
- [ ] `layout/DrawerLayout.jsx` - collapsible sidebar layout, mobile friendly
- [ ] `auth/ProtectedRoute.jsx` - redirects unauthenticated users to `/login`; optional `requiredRole` prop shows "Unauthorized" card for wrong-role users
- [ ] `forms/SearchPropertiesForm.jsx` - location, check-in, check-out, guests; wired to `usePropertySearchFilters`
- [ ] `forms/filters/PropertyPriceFilter.jsx` - dual-handle range slider (0-10000, step 50); wired to context
- [ ] `forms/filters/PropertyTypeFilter.jsx` - select input; wired to context
- [ ] `forms/BookingForm.jsx` - pre-populated from search filters; submits via `useCreateBooking`; inline success/error states + toast notification
- [ ] `forms/AddListingForm.jsx` - full create-listing form (title, description, property type, address, city, state, postal code, country, bedrooms, bathrooms, max guests, price per night, status); uses `submitCreateProperty` from `useProperties`; loading spinner on submit button; inline error alert
- [ ] `property/PropertyCard.jsx` - photo, title, rating, location, price, type, bedrooms, bathrooms, View button
- [ ] `property/SearchResults.jsx` - fetches via `useProperties`; loading/error states; list of `PropertyCard`; renders `SearchResultsPagination`
- [ ] `property/SearchResultsPagination.jsx` - Previous/Next; updates page in context; Previous disabled on page 1
- [ ] `host/HostStatsCard.jsx` - single stat display (title, value, description) with green color scheme
- [ ] `host/HostStatsSection.jsx` - owns `useHostStats` call; renders three `HostStatsCard` components; handles loading spinner and error alert internally
- [ ] `host/HostPropertyTable.jsx` - table of host's properties (name, location, price/night, guests, bedrooms, bathrooms, manage status); loading/error states via props; empty state row; uses `PropertyStatusDropdown`
- [ ] `host/PropertyStatusDropdown.jsx` - inline status badge that opens a DaisyUI dropdown to change property status via PATCH; shows spinner while mutation is in flight; invalidates `['host-properties']` cache on success

### Pages
- [ ] `HomePage.jsx` - `DrawerLayout` with filters in sidebar, `SearchPropertiesForm` + `SearchResults` in main
- [ ] `LoginPage.jsx` - username/password form; `useAuth` login mutation; redirects to `location.state.from` on success
- [ ] `PropertyDetailsPage.jsx` - fetches property via `usePropertyDetails`; displays title, location, type, beds, baths, rating, host, description, amenities; `BookingForm` alongside; loading/error states
- [ ] `HostDetailsPage.jsx` - `DrawerLayout` with Listings sidebar (All/Published/Draft/Paused/Archived tabs that filter table by status and reset page; All tab passes no status filter to return all properties); host avatar and name with "Add New Listing" button; `HostStatsSection`; `HostPropertyTable` with Previous/Next pagination using filters context page
- [ ] `AddListingPage.jsx` - host-only protected route; uses `AddListingForm`; success/error toasts via `useNotification`


### Routing
- [ ] `/` - `HomePage`
- [ ] `/login` - `LoginPage`
- [ ] `/properties/:id` - `PropertyDetailsPage` (protected)
- [ ] `/hosts/:id` - `HostDetailsPage` (protected)
- [ ] `/listings/add` - `AddListingPage` (protected, host role only)
---
---

## Documentation & Code Quality

- [ ] `DOCUMENTATION.md` - instructions for running the backend (venv, pip install, migrate, runserver) and frontend (npm install, npm run dev); environment variables (`VITE_API_URL`)
- [ ] Backend test coverage report - run `coverage run manage.py test` and ensure 80% or higher coverage
- [ ] Frontend tests - Vitest + React Testing Library setup; tests for key components and hooks
