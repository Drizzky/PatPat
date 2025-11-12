# Copilot Instructions for PatPat Node.js API

## Project Overview
- This is a Node.js + Express REST API for user management, authentication, and password reset workflows.
- The backend uses a MySQL database (see `server/src/db/`).
- Main entry point: `server/app.js` (configures middleware, static files, routes, and error handling).

## Key Directories & Files
- `server/src/controllers/`: Route handlers (e.g., `users/loginUser.js`, `users/resetPassUser.js`).
- `server/src/models/`: Database access and business logic (e.g., `users/findUserByEmail.js`, `users/resetPassword.js`).
- `server/src/routes/`: Route definitions (e.g., `userRoutes.js`).
- `server/src/utils/`: Utilities (e.g., `sendMail.js`, `throwError.js`).
- `server/src/db/`: Database pool, schema, and init scripts.

## Patterns & Conventions
- Errors are thrown using `throwError(message, statusCode)`; only these are shown to users. Unhandled errors return a generic 500 message.
- Password reset is a two-step process:
  1. `resetPassword(user)` generates a token, logs it, and emails the user.
  2. (Not yet implemented) A model like `updatePasswordWithToken(token, newPassword)` should handle the actual password update.
- Login attempts and account lockouts are tracked in the database (`insertLoginAttempt`, `getLoginAttemptsByIdUser`).
- All responses use JSON with a `status` and `message` field.

## Developer Workflows
- Start the server: `node server/app.js` (ensure environment variables are set, e.g., `PORT`, `UPLOADS_DIR`, `SECRET`, `CLIENT_URL`).
- Database: MySQL, initialized via scripts in `server/src/db/scriptDB.sql`.
- No explicit test framework or scripts detected—add tests in a `tests/` directory if needed.
- Linting: Configured via `server/eslint.config.js`.

## Integration Points
- Email: Outgoing emails sent via `sendMail.js` (uses environment variables for config).
- Static files: Served from the directory specified by `UPLOADS_DIR`.
- Environment variables: Managed via `.env` and `dotenv/config`.

## Examples
- To add a new user-related route, update `server/src/routes/userRoutes.js` and implement the handler in `server/src/controllers/users/`.
- To add a new DB query, create a model in `server/src/models/` and use it in the relevant controller.

---

For questions or unclear patterns, ask for clarification or check recent controller/model implementations for examples.
