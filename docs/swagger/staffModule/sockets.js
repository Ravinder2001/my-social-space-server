/**
 * @swagger
 * tags:
 * - name: Sockets
 *   description: WebSocket connection to the server. All endpoints are socket endpoints to be triggered.
 */

/**
 * @swagger
 * paths:
 *   Add-User (EMIT:
 *     get:
 *       tags:
 *       - Sockets
 *       summary: (EMIT) Establish a socket connection between the server and the staff login. This is an emit request from the frontend.
 *       description: "Send the token after login and at each initial render to establish the connection. Without this, the connection cannot be established."
 *   Add-Guest (EMIT):
 *     get:
 *       tags:
 *       - Sockets
 *       summary: (EMIT) Establish a socket connection between the server and the guest using room_id. This is an emit request from the frontend.
 *       description: "Send the token(Get in the start conv api) when the user accesses the portal and at each initial render to establish the connection. Without this, the connection cannot be established."
 *   error (ON):
 *     get:
 *       tags:
 *       - Sockets
 *       summary: (ON) Receive all error messages from the socket connection. This is an emit request from the server that you need to catch with an 'on' request in the frontend.
 *       description: "The response will contain the error message."
 */
