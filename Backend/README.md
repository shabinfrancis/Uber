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
