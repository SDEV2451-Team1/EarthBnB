# Backend Documentation.

## Backend API Endpoints

All endpoints are prefixed with `/api/v1/`. Protected endpoints require a JWT access token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

---

### Auth Endpoints (`/api/v1/auth/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register/` | Register a new user (guest or host) | No |
| POST | `/api/v1/auth/login/` | Login and receive JWT tokens | No |
| POST | `/api/v1/auth/token/refresh/` | Refresh an expired access token | No |
| GET | `/api/v1/auth/me/` | Get the authenticated user's profile | Yes |

#### Register — Request Body
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "guest | host"
}
```

#### Login — Request Body
```json
{
  "username": "string",
  "password": "string"
}
```

#### Login — Response Body
```json
{
  "access": "<jwt_access_token>",
  "refresh": "<jwt_refresh_token>"
}
```

#### Me — Response Body
```json
{
  "id": 1,
  "username": "string",
  "email": "string",
  "role": "guest | host"
}
```

---

### Properties (`/api/v1/properties/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/properties/` | List all published properties | No |
| POST | `/api/v1/properties/` | Create a new property listing | Yes — Host only |
| GET | `/api/v1/properties/{id}/` | Get details of a specific property | Yes |
| PATCH | `/api/v1/properties/{id}/` | Partially update a property | Yes — Owner Host |
| DELETE | `/api/v1/properties/{id}/` | Delete a property | Yes — Owner Host |
| GET | `/api/v1/properties/host_properties/` | List all of the authenticated host's properties | Yes — Host only |
| GET | `/api/v1/properties/host_stats/` | Get stats for the authenticated host | Yes — Host only |

#### Filtering — GET `/api/v1/properties/`

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search across title, description, city, country |
| `city` | string | Filter by city (partial match) |
| `country` | string | Filter by country (partial match) |
| `property_type` | string | `apartment`, `house`, `villa`, `condo`, `townhouse`, `cottage`, `studio`, `room`, `other` |
| `min_price` | decimal | Minimum price per night |
| `max_price` | decimal | Maximum price per night |
| `bedrooms` | integer | Minimum number of bedrooms |
| `max_guests` | integer | Minimum guest capacity |
| `amenities` | integer | Filter by amenity ID (repeatable for AND logic) |
| `host` | integer | Filter by host user ID |
| `check_in` | date (`YYYY-MM-DD`) | Exclude properties with overlapping bookings |
| `check_out` | date (`YYYY-MM-DD`) | Exclude properties with overlapping bookings |
| `page` | integer | Page number for pagination (10 results per page) |

#### Filtering — GET `/api/v1/properties/host_properties/`

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status: `published`, `draft`, `paused`, `archived` |
| `page` | integer | Page number for pagination (10 results per page) |

#### Create / Update Property — Request Body
```json
{
  "title": "string",
  "description": "string",
  "property_type": "apartment | house | villa | condo | townhouse | cottage | studio | room | other",
  "address": "string",
  "city": "string",
  "state_province": "string",
  "postal_code": "string",
  "country": "string",
  "bedrooms": 1,
  "bathrooms": 1.0,
  "max_guests": 2,
  "price_per_night": "99.99",
  "status": "draft | published | paused | archived"
}
```

#### Host Stats — Response Body
```json
{
  "total_listings": 5,
  "bookings_last_30_days": 3,
  "earnings_last_30_days": "749.97"
}
```

---

### Bookings (`/api/v1/bookings/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/bookings/` | List the authenticated user's bookings | Yes |
| POST | `/api/v1/bookings/` | Create a new booking | Yes |

#### Create Booking — Request Body
```json
{
  "property": 1,
  "check_in_date": "YYYY-MM-DD",
  "check_out_date": "YYYY-MM-DD",
  "num_guests": 2
}
```

#### Booking — Response Body
```json
{
  "id": 1,
  "property": 1,
  "guest": 1,
  "check_in_date": "YYYY-MM-DD",
  "check_out_date": "YYYY-MM-DD",
  "num_guests": 2,
  "status": "pending | confirmed | cancelled | completed",
  "nightly_rate": "99.99",
  "num_nights": 3,
  "subtotal": "299.97",
  "total_price": "299.97",
  "created_at": "ISO 8601 datetime"
}
