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
