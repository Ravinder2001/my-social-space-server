/**
 * @swagger
 * tags:
 * - name: Guest Staff Chat
 *   description: APIs related to Guest Staff Chat
 */

/**
 * @swagger
 * /checkConvValidity/{room_id}:
 *  get:
 *      tags:
 *      - Guest Staff Chat
 *      summary: Check the validity of a conversation, helpful if the user refreshes the page.
 *      parameters:
 *       - in: path
 *         name: room_id
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
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              example: "active or expired"
 *            400:
 *              description: Error Message
 *
 * /startConv/{room_id}:
 *  get:
 *      tags:
 *      - Guest Staff Chat
 *      summary: Start the conversation from the guest end, find agents, and send conversation invite to them.
 *      parameters:
 *       - in: path
 *         name: room_id
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
 *                      type: object
 *                      properties:
 *                          start_conv:
 *                              type: string
 *                              example: "Please wait while we assign the next available agent"
 *                          end_conv:
 *                              type: string
 *                              example: "Conversation ended. To start a new conversation"
 *                          end_after:
 *                              type: string
 *                              example: "2 min"
 *                          no_response_text:
 *                              type: string
 *                              example: "All agents are busy right now"
 *                          token:
 *                              type: string
 *                              example: "Authentication token that need to pass for socket connection"
 *                          channel_id:
 *                              type: number
 *                              example: 2
 *            400:
 *              description: Error Message
 *
 * /endConv/{channel_id}:
 *  get:
 *      tags:
 *      - Guest Staff Chat
 *      summary: End the conversation from the guest or staff end.
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
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: "Conversation ended!"
 *            400:
 *              description: Error Message
 *
 * /getMessageForGuest/{room_id}:
 *  get:
 *      tags:
 *      - Guest Staff Chat
 *      summary: Return messages for guest if conversation is not expired or ended.
 *      parameters:
 *       - in: path
 *         name: room_id
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
 *                          role:
 *                              type: string
 *                          content:
 *                              type: string
 *                          content_type:
 *                              type: string
 *            400:
 *              description: Error Message
 *
 * /getMessageChannelList:
 *  get:
 *      tags:
 *      - Guest Staff Chat
 *      summary: Get a list of all conversations that have happened or are happening with the guest. All users can see the list but only assigned agents can send messages.
 *      security:
 *       - bearerAuth: []
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
 *                          room_id:
 *                              type: integer
 *                          channel_status:
 *                              type: boolean
 *                          send_message_access:
 *                              type: boolean
 *                          latest_msg_details:
 *                              type: object
 *                              properties:
 *                                  message_id:
 *                                      type: integer
 *                                  role:
 *                                      type: string
 *                                  content:
 *                                      type: string
 *                                  content_type:
 *                                      type: string
 *                                  created_at:
 *                                      type: string
 *            400:
 *              description: Error Message
 *
 * /getMessageForStaff/{channel_id}:
 *  get:
 *      tags:
 *      - Guest Staff Chat
 *      summary: Get messages of a specific channel.
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
 *                          role:
 *                              type: string
 *                          content:
 *                              type: string
 *                          content_type:
 *                              type: string
 *            400:
 *              description: Error Message
 *
 * /accept:
 *  post:
 *      tags:
 *      - Guest Staff Chat
 *      summary: Accept the invite to chat with the guest.
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          channel_id:
 *                              type: integer
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Guest Staff Chat accepted successfully!
 *          400:
 *              description: Error Message
 *
 * /reject:
 *  post:
 *      tags:
 *      - Guest Staff Chat
 *      summary: Reject the invite to chat with the guest.
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          channel_id:
 *                              type: integer
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Guest Staff Chat rejected successfully!
 *          400:
 *              description: Error Message
 *
 * /snooze:
 *  post:
 *      tags:
 *      - Guest Staff Chat
 *      summary: Snooze the invite to chat with the guest.
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          channel_id:
 *                              type: integer
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Guest Staff Chat snoozed successfully!
 *          400:
 *              description: Error Message
 *
 * /re-snooze:
 *  post:
 *      tags:
 *      - Guest Staff Chat
 *      summary: Re-snooze the invite to chat with the guest.
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          channel_id:
 *                              type: integer
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Guest Staff Chat re-snoozed successfully!
 *          400:
 *              description: Error Message
 *
 * /guest-chat-invitation:
 *  get:
 *      tags:
 *      - Guest Staff Chat
 *      summary: (ON) This is a socket endpoint, not an API endpoint. Receive notifications for chat requests with guests.
 *      description: The response will contain the notification details.
 */
