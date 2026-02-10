# Users — POST /users/register

Create a new user account.

## HTTP
- Method: POST  
- URL: /users/register  
- Content-Type: application/json

## Request body (JSON) — required fields
- fullname.firstname (string) — required, minimum 3 characters  
- fullname.lastname (string) — optional, minimum 3 characters if provided  
- email (string) — required, must be a valid email, must be unique  
- password (string) — required, minimum 6 characters

Example request:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "P@ssw0rd!"
}
```

Notes about validation and server behavior
- Validation rules used in routes:
  - body('email').isEmail()
  - body('fullname.firstname').isLength({ min: 3 })
  - body('password').isLength({ min: 6 })
- The service layer requires firstname, email and password; missing required fields will throw an error.
- Passwords are hashed before storage (userModel.hashPassword).
- A JWT is generated and returned on successful registration (user.generateAuthToken).
- Passwords are never returned in plain text (password field in model has select: false).

## Responses / Status codes
- 201 Created  
  - Description: User created successfully.  
  - Body: { "token": "<jwt>", "user": { ...userFields... } }

- 400 Bad Request  
  - Description: Request validation failed (missing/invalid fields) OR user with the same email already exists.  
  - Body for validation errors: { "errors": [ ... ] }  
  - Body for duplicate user: { "message": "User already exist" }

- 500 Internal Server Error  
  - Description: Unexpected server error.

## Example curl
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Jane","lastname":"Doe"},"email":"jane.doe@example.com","password":"P@ssw0rd!"}'
```


# Users — POST /users/register

...existing code...

# Users — POST /users/login

Create a user session (login).

## HTTP
- Method: POST  
- URL: /users/login  
- Content-Type: application/json

## Request body (JSON) — required fields
- email (string) — required, must be a valid email  
- password (string) — required

Example request:
```json
{
  "email": "jane.doe@example.com",
  "password": "P@ssw0rd!"
}
```

## Validation (routes/users.routes.js)
- body('email').isEmail().withMessage('Invalid email format')  
- body('password').notEmpty().withMessage('Password is required')

## Behavior notes
- Server finds the user by email and explicitly includes the password for comparison: userModel.findOne({ email }).select('+password')  
- Passwords are compared with bcrypt using user.comparePassword(password)  
- On success a JWT is generated via user.generateAuthToken() and returned with the user object  
- The stored password is not returned in responses (password field in model has select: false)

## Responses / Status codes
- 200 OK  
  - Description: Login successful.  
  - Body: { "token": "<jwt>", "user": { ...userFields... } }

- 400 Bad Request  
  - Description: Request validation failed (missing/invalid fields).  
  - Body: { "errors": [ ... ] }

- 401 Unauthorized  
  - Description: Invalid email or password.  
  - Body: { "message": "Invalid email or password" }

- 500 Internal Server Error  
  - Description: Unexpected server error.

## Example curl
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane.doe@example.com","password":"P@ssw0rd!"}'
```

# Users — GET /users/profile

...existing code...

# Users — GET /users/profile

Get the authenticated user's profile.

## HTTP
- Method: GET  
- URL: /users/profile  
- Auth: Required (cookie "token" or Authorization: Bearer <token>)  
- Content-Type: application/json

## Request
- No body required.

## Behavior
- Auth middleware verifies JWT and ensures token is not blacklisted.
- On success, returns the user object attached to req.user (password is excluded by schema).

## Responses / Status codes
- 200 OK  
  - Description: Profile fetched successfully.  
  - Body: { ...userFields... } (no password)

- 401 Unauthorized  
  - Description: Missing, invalid or blacklisted token.  
  - Body: { "message": "Unauthorized" }

- 500 Internal Server Error  
  - Description: Unexpected server error.

## Example curl (using Authorization header)
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Example curl (using cookie)
```bash
curl -X GET http://localhost:3000/users/profile \
  -b "token=<JWT_TOKEN>"
```

# Users — GET /users/logout

Log out the authenticated user (invalidate token).

## HTTP
- Method: GET  
- URL: /users/logout  
- Auth: Required (cookie "token" or Authorization: Bearer <token>)  
- Content-Type: application/json

## Request
- No body required.

## Behavior
- Clears the "token" cookie.
- Stores the token in a blacklist collection so it cannot be reused.
- Returns a confirmation message.

## Responses / Status codes
- 200 OK  
  - Description: Successfully logged out.  
  - Body: { "message": "Logged out" }

- 401 Unauthorized  
  - Description: Missing, invalid or blacklisted token.  
  - Body: { "message": "Unauthorized" }

- 500 Internal Server Error  
  - Description: Unexpected server error.

## Example curl (using Authorization header)
```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Example curl (using cookie)
```bash
curl -X GET http://localhost:3000/users/logout \
  -b "token=<JWT_TOKEN>"
```

# Captains — POST /captain/register

Register a new captain (driver) with vehicle details.

## HTTP
- Method: POST  
- URL: /captain/register  
- Content-Type: application/json

## Request body (JSON) — required fields
- fullname.firstname (string) — required, min length 3  
- fullname.lastname (string) — optional, min length 3 if provided  
- email (string) — required, must be a valid email, must be unique  
- password (string) — required, min length 6  
- vehicle.color (string) — required, min length 3  
- vehicle.plate (string) — required, min length 3  
- vehicle.capacity (integer) — required, min value 1  
- vehicle.vehicleType (string) — required, one of: "car", "motorcycle", "auto"

Example request:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "StrongP@ss1",
  "vehicle": {
    "color": "Blue",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Validation (from routes/captain.routes.js)
- body('email').isEmail().withMessage('Invalid Email')  
- body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long')  
- body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')  
- body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long')  
- body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long')  
- body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1')  
- body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')

## Responses / Status codes
- 201 Created  
  - Description: Captain created successfully.  
  - Body: created captain object (password must not be returned).

- 400 Bad Request  
  - Description: Validation failed or missing required fields.  
  - Body: { "errors": [ ... ] } or { "message": "All fields are required" }

- 500 Internal Server Error  
  - Description: Unexpected server error.

## Notes
- Passwords should be hashed before storage (do not return raw password).  
- Ensure email uniqueness at the model/database level.  
- vehicleType must match one of the allowed values; otherwise validation rejects the request.

## Example curl
```bash
curl -X POST http://localhost:3000/captain/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john.doe@example.com","password":"StrongP@ss1","vehicle":{"color":"Blue","plate":"ABC123","capacity":4,"vehicleType":"car"}}'
```