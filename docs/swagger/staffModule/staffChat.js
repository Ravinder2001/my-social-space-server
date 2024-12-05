/**
 * @swagger
 * tags:
 * - name: Staff Chat
 *   description: APIs related to Staff Chat
 */

/**
 * @swagger
 * /staffModule/api/staffChat/createChannel:
 *  get:
 *      tags:
 *      - Staff Chat
 *      summary: Create a channel between two users.
 *      security:
 *      - bearerAuth: []
 *      produces:
 *          - application/json
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          receiver_id:
 *                              type: integer
 *      responses:
 *            200:
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          channel_id:
 *                              type: number
 *            400:
 *              description: Error Message
 *
 * /staffModule/api/staffChat/getChannelList:
 *  get:
 *      tags:
 *      - Staff Chat
 *      summary: Return the channel list.
 *      security:
 *      - bearerAuth: []
 *      produces:
 *          - application/json
 *      responses:
 *            200:
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          channel_id:
 *                              type: integer
 *                          type:
 *                              type: integer
 *                          name:
 *                              type: string
 *                          created_at:
 *                              type: string
 *                          latest_msg_details:
 *                              type: object
 *                              properties:
 *                                  message_id:
 *                                      type: integer
 *                                  sender_id:
 *                                      type: integer
 *                                  content:
 *                                      type: string
 *                                  content_type:
 *                                      type: string
 *                                  created_at:
 *                                      type: string
 *            400:
 *              description: Error Message
 *
 * /staffModule/api/staffChat/messages/{channel_id}:
 *  get:
 *      tags:
 *      - Staff Chat
 *      summary: Return the message list.
 *      security:
 *      - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: channel_id
 *         schema:
 *           type: number
 *         required: true
 *      produces:
 *          - application/json
 *      responses:
 *            200:
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          message_id:
 *                              type: integer
 *                          content:
 *                              type: string
 *                          content_type:
 *                              type: string
 *                          status:
 *                              type: boolean
 *                          created_at:
 *                              type: string
 *                          own_message:
 *                              type: boolean
 *
 *            400:
 *              description: Error Message
 *
 * /staffModule/api/staffChat/deleteMessage/{message_id}:
 *  delete:
 *      tags:
 *      - Staff Chat
 *      summary: "delete the message"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: message_id
 *         schema:
 *           type: number
 *         required:
 *           - message_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 * staff-chat-send-message (EMIT):
 *      get:
 *       tags:
 *       - Staff Chat
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
 *                          channel_id:
 *                              type: number
 *                          content:
 *                              type: string
 *                              example: "Message content"
 *                          content_type:
 *                              type: string
 *                              example: "text"
 *
 * staff-chat-send-message-with-file (EMIT:
 *      post:
 *       tags:
 *       - Staff Chat
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
 * staff-chat-new-message (ON:
 *     get:
 *       tags:
 *       - Staff Chat
 *       summary: (ON) Receive the new message.
 *       description: "The response will contain the new message received by the receiver."
 *
 * call-user (EMIT):
 *      get:
 *       tags:
 *       - Staff Chat
 *       summary: (EMIT) send the video call notification to another user.
 *       description: "This endpoint is triggered from the frontend to send call notification to another user"
 *       requestBody:
 *          description: "This object needs to be sent to the socket endpoint."
 *          content:
 *           application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          token:
 *                              type: string
 *                          channel_id:
 *                              type: number
 *                          signal:
 *                              type: object
 *
 * call-user (ON):
 *      get:
 *       tags:
 *       - Staff Chat
 *       summary: (EMIT) Receive the video call notfication to another user.
 *       description: "This endpoint is triggered from the frontend to receive call notification from another user with channel_id and signal data"
 *       responses:
 *            200:
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          signal:
 *                              type: object
 *                          channel_id:
 *                              type: integer
 *            400:
 *              description: Error Message
 *
 * answer-call (EMIT):
 *      get:
 *       tags:
 *       - Staff Chat
 *       summary: (EMIT) To accept the video call invitation.
 *       description: "This endpoint is triggered from the frontend to start video call. This end-point requires receivers signalData and channel_id"
 *       requestBody:
 *          description: "This object needs to be sent to the socket endpoint."
 *          content:
 *           application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          token:
 *                              type: string
 *                          channel_id:
 *                              type: number
 *                          signal:
 *                              type: object
 * call-accepted (ON):
 *      get:
 *       tags:
 *       - Staff Chat
 *       summary: (EMIT) Inform first user that video call has been started.
 *       description: "This endpoint is triggered from the frontend to start the video call. This will provide the another user signal"
 *       responses:
 *            200:
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          signal:
 *                              type: object
 *            400:
 *              description: Error Message
 */
