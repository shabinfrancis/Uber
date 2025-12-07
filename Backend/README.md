# /users/register Endpoint Documentation

This document provides details about the `/users/register` endpoint.

## Endpoint Overview

- **URL:** `POST /users/register`
- **Description:** This endpoint allows a new user to register by providing the required information. Before creating a new user account, it validates the email, the first name, and the password.

## Request Body

The endpoint expects a JSON payload with the following structure:

- **fullname:** (object)
  - **firstname:** (string, required) Minimum of 3 characters.
  - **lastname:** (string, optional) Minimum of 3 characters if provided.
- **email:** (string, required) Must be a valid email address and have a minimum length of 5 characters.
- **password:** (string, required) Must be at least 6 characters long.

## Responses

- **Success (201 Created):**
  - Returns a JSON object containing a `token` (JWT token) and the created `user` object.

- **Error (400 Bad Request):**
  - Returns validation error details if the input does not meet the requirements, e.g., invalid email, first name too short, or password too short.
  - Returns a message "User already exist" if the user is already registered.

## Example Request

```
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

## Example Response

**Success (201 Created):**

```
{
  "token": "<JWT Token>",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // other fields...
  }
}
```

**Error (400 Bad Request):**

```
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", ... }
  ]
}
```

## /users/login Endpoint Documentation

- **URL:** `POST /users/login`
- **Description:** This endpoint authenticates an existing user using their email and password. On successful authentication, it returns a JSON object containing a JWT token and user details, and sets a cookie with the token.

### Request Body

The endpoint expects a JSON payload with the following structure:

- **email:** (string, required) Must be a valid email address.
- **password:** (string, required) Must be at least 6 characters long.

### Responses

- **Success (200 OK):**
  - Returns a JSON object containing a `token` (JWT token) and the authenticated `user` object.
  - A cookie named `token` is set in the response.

- **Error (400 Bad Request):**
  - Returns validation error details if the input does not meet the requirements (e.g., invalid email, password too short).

- **Error (401 Unauthorized):**
  - Returns a message "Invalid email or password" if authentication fails due to incorrect credentials.

### Example Request

```
POST /users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Example Response

**Success (200 OK):**

```
{
  "token": "<JWT Token>",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // other fields...
  }
}
```

**Error (401 Unauthorized):**

```
{
  "message": "Invalid email or password"
}
```

## /users/profile Endpoint Documentation

- **URL:** `GET /users/profile`
- **Description:** This endpoint retrieves the profile of the currently authenticated user. It requires a valid authentication token. The authentication middleware (`authMiddleware.authUser`) verifies the token and attaches the user information to the request.

### Responses

- **Success (200 OK):**
  - Returns a JSON object representing the authenticated user.

- **Error (401 Unauthorized):**
  - Returned if the provided token is missing or invalid.

### Example Request

```
GET /users/profile
Authorization: Bearer <JWT Token>
```

### Example Response

```
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
  // other fields...
}
```

---

## /users/logout Endpoint Documentation

- **URL:** `GET /users/logout`
- **Description:** This endpoint logs out the authenticated user. It clears the authentication cookie and blacklists the current token, preventing its further use.

### Requirements

- Requires authentication via `authMiddleware.authUser`.

### Responses

- **Success (200 OK):**
  - Returns a JSON message confirming that the user has been logged out.

### Example Request

```
GET /users/logout
```

### Example Response

```
{
  "message": "Logged out"
}
```

---

# /captains Endpoint Documentation

This document provides details about the endpoints available for captains. These endpoints allow captains to register, login, retrieve their profile, and logout.

## /captains/register Endpoint Documentation

- **URL:** `POST /captains/register`
- **Description:** This endpoint allows a new captain to register by providing the required personal, authentication, and vehicle details. It validates the email, first name, password, and vehicle information (color, plate, capacity, and vehicle type).

### Request Body

The endpoint expects a JSON payload with the following structure:

- **fullname:** (object)
  - **firstname:** (string, required) Minimum of 3 characters.
  - **lastname:** (string, optional) Minimum of 3 characters if provided.
- **email:** (string, required) Must be a valid email address.
- **password:** (string, required) Must be at least 6 characters long.
- **vehicle:** (object)
  - **color:** (string, required) Minimum of 3 characters.
  - **plate:** (string, required) Minimum of 3 characters.
  - **capacity:** (number, required) Must be at least 1.
  - **vehicleType:** (string, required) Must be one of `car`, `motorcycle`, or `auto`.

### Responses

- **Success (201 Created):**
  - Returns a JSON object containing a `token` (JWT token) and the created `captain` object.

- **Error (400 Bad Request):**
  - Returns validation error details if input data does not meet requirements.
  - Returns a message "Captain already exist" if a captain with the provided email is already registered.

### Example Request

```
POST /captains/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "securePass123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ 1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Example Response

```
{
  "token": "<JWT Token>",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ 1234",
      "capacity": 4,
      "vehicleType": "car"
    }
    // other fields...
  }
}
```

---

## /captains/login Endpoint Documentation

- **URL:** `POST /captains/login`
- **Description:** This endpoint authenticates an existing captain using their email and password. On successful authentication, it returns a JSON object containing a JWT token and captain details, and sets a cookie with the token.

### Request Body

The endpoint expects a JSON payload with the following structure:

- **email:** (string, required) Must be a valid email address.
- **password:** (string, required) Must be at least 6 characters long.

### Responses

- **Success (200 OK):**
  - Returns a JSON object containing a `token` (JWT token) and the authenticated `captain` object.
  - A cookie named `token` is set in the response.

- **Error (400 Bad Request):**
  - Returns validation error details if the input data does not meet requirements.

- **Error (401 Unauthorized):**
  - Returns a message "Invalid email or password" if authentication fails.

### Example Request

```
POST /captains/login
Content-Type: application/json

{
  "email": "jane.doe@example.com",
  "password": "securePass123"
}
```

### Example Response

```
{
  "token": "<JWT Token>",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com"
    // other fields...
  }
}
```

---

## /captains/profile Endpoint Documentation

- **URL:** `GET /captains/profile`
- **Description:** This endpoint retrieves the profile of the currently authenticated captain. It requires a valid authentication token verified by the `authMiddleware.authCaptain` middleware.

### Responses

- **Success (200 OK):**
  - Returns a JSON object with the captain's profile information.

- **Error (401 Unauthorized):**
  - Returned if the token is missing or invalid.

### Example Request

```
GET /captains/profile
Authorization: Bearer <JWT Token>
```

### Example Response

```
{
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ 1234",
      "capacity": 4,
      "vehicleType": "car"
    }
    // other fields...
  }
}
```

---

## /captains/logout Endpoint Documentation

- **URL:** `GET /captains/logout`
- **Description:** This endpoint logs out the authenticated captain. It clears the authentication cookie and blacklists the current token, preventing further use.

### Requirements

- Requires authentication via `authMiddleware.authCaptain`.

### Responses

- **Success (200 OK):**
  - Returns a JSON message confirming that the captain has been logged out.

### Example Request

```
GET /captains/logout
Authorization: Bearer <JWT Token>
```

### Example Response

```
{
  "message": "Logout successfully"
}
```


---

# /rides Endpoint Documentation

This section documents the `/rides` endpoints, including descriptions, required data, and status codes.

## POST /rides/create

- **Description:** Create a new ride request for a user.
- **Authentication:** Requires user authentication (`authMiddleware.authUser`).
- **Request Body:**
  - `pickup` (string, required): Pickup address, min 3 characters.
  - `destination` (string, required): Destination address, min 3 characters.
  - `vehicleType` (string, required): Vehicle type, min 3 characters.
- **Response:**
  - **201 Created:** Returns the created ride object.
  - **400 Bad Request:** Validation errors (invalid/missing fields).
  - **500 Internal Server Error:** Server or map API errors.

**Example Request:**
```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

## GET /rides/get-fare

- **Description:** Get fare estimates for a ride between two addresses.
- **Authentication:** Requires user authentication (`authMiddleware.authUser`).
- **Query Parameters:**
  - `pickup` (string, required): Pickup address, min 3 characters.
  - `destination` (string, required): Destination address, min 3 characters.
- **Response:**
  - **200 OK:** Returns fare estimates for each vehicle type.
  - **400 Bad Request:** Validation errors.
  - **500 Internal Server Error:** Map API or calculation errors.

**Example Request:**
```
GET /rides/get-fare?pickup=123+Main+St&destination=456+Elm+St
```

## POST /rides/confirm

- **Description:** Captain confirms a ride assignment.
- **Authentication:** Requires captain authentication (`authMiddleware.authCaptain`).
- **Request Body:**
  - `rideId` (string, required): MongoDB ride ID.
- **Response:**
  - **200 OK:** Returns the updated ride object.
  - **400 Bad Request:** Validation errors.
  - **500 Internal Server Error:** Server errors.

**Example Request:**
```json
{
  "rideId": "656f1c2e8b3c2a0012345678"
}
```

## GET /rides/start-ride

- **Description:** Captain starts a ride after OTP verification.
- **Authentication:** Requires captain authentication (`authMiddleware.authCaptain`).
- **Query Parameters:**
  - `rideId` (string, required): MongoDB ride ID.
  - `otp` (string, required): 6-character OTP.
- **Response:**
  - **200 OK:** Returns the ride object if OTP is valid.
  - **400 Bad Request:** Validation errors (invalid ride ID or OTP).
  - **500 Internal Server Error:** Server errors.

**Example Request:**
```
GET /rides/start-ride?rideId=656f1c2e8b3c2a0012345678&otp=123456
```

## POST /rides/end-ride

- **Description:** Captain ends a ride.
- **Authentication:** Requires captain authentication (`authMiddleware.authCaptain`).
- **Request Body:**
  - `rideId` (string, required): MongoDB ride ID.
- **Response:**
  - **200 OK:** Returns the completed ride object.
  - **400 Bad Request:** Validation errors.
  - **500 Internal Server Error:** Server errors.

**Example Request:**
```json
{
  "rideId": "656f1c2e8b3c2a0012345678"
}
```
