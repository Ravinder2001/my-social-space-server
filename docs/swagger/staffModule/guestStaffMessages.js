/**
 * @swagger
 * tags:
 * - name: Guest Staff Messages
 *   description: WebSocket connection to the server. All endpoints are triggered via socket.
 */

/**
 * @swagger
 * guest-staff-chat-send-message (EMIT):
 *      post:
 *       tags:
 *       - Guest Staff Messages
 *       summary: (EMIT) Save the message to the database and send it to the receiver.
 *       description: "This endpoint is triggered from the frontend to send a message. The message will be saved to the database and sent to the receiver."
 *       requestBody:
 *          description: "This object needs to be sent to the socket endpoint."
 *          content:
 *           application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          token:
 *                              type: string
 *                          role:
 *                              type: string
 *                              example: "guest or staff"
 *                          channel_id:
 *                              type: number
 *                          content:
 *                              type: string
 *                              example: "Message content"
 *                          content_type:
 *                              type: string
 *                              example: "text"
 *
 * guest-staff-chat-send-message-with-file (EMIT):
 *      post:
 *       tags:
 *       - Guest Staff Messages
 *       summary: (EMIT) Save the message to the database and send it to the receiver.
 *       description: "This endpoint is triggered from the frontend to send a message with a file. The message will be saved to the database and sent to the receiver."
 *       requestBody:
 *          description: "This object needs to be sent to the socket endpoint."
 *          content:
 *           application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          token:
 *                              type: string
 *                          role:
 *                              type: string
 *                              example: "guest or staff"
 *                          channel_id:
 *                              type: number
 *                          content_type:
 *                              type: string
 *                              example: "image, audio, or file"
 *                          content:
 *                              type: object
 *                              properties:
 *                                  file_name:
 *                                      type: string
 *                                  mime_type:
 *                                      type: string
 *                                  file:
 *                                      type: binary
 *
 * guest-staff-chat-new-message (ON):
 *     get:
 *       tags:
 *       - Guest Staff Messages
 *       summary: (ON) Receive the new message.
 *       description: "The response will contain the new message received by the receiver."
 */
