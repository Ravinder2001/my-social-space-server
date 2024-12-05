/**
 * @swagger
 * tags:
 * - name: Staff Chat Groups
 *   description: API's related to Staff Chat Groups
 */

/**
 * @swagger
 * /guestAdmin/api/staffChatGroups:
 *  get:
 *      tags:
 *      - Staff Chat Groups
 *      summary: "Get Staff Chat Groups"
 *      security:
 *       - bearerAuth: []
 *      produces:
 *          -application/json
 *      responses:
 *            200:
 *              description: "success"
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          channel_id:
 *                              type: integer
 *                          name:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *                          group_members_count:
 *                              type: integer
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Staff Chat Groups
 *      summary: "Add Staff Chat Groups API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          description: "group_members will be the array of user_id which are in that group"
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          group_name:
 *                              type: string
 *                          group_members:
 *                              type: array
 *                              items:
 *                                type: number
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Staff Chat Groups added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/staffChatGroups/{channel_id}:
 *  put:
 *      tags:
 *      - Staff Chat Groups
 *      summary: "Update the Staff Chat Groups"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: channel_id
 *         schema:
 *           type: number
 *         required:
 *           - channel_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          group_name:
 *                              type: string
 *                          group_members:
 *                              type: array
 *                              items:
 *                                type: number
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully updated data"
 *          400:
 *              description: "Error Message"
 *
 *  patch:
 *      tags:
 *      - Staff Chat Groups
 *      summary: "Update the Staff Chat Groups status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: channel_id
 *         schema:
 *           type: number
 *         required:
 *           - channel_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          is_active:
 *                              type: boolean
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully updated data"
 *          400:
 *              description: "Error Message"
 
 *  delete:
 *      tags:
 *      - Staff Chat Groups
 *      summary: "delete the Staff Chat Groups"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: channel_id
 *         schema:
 *           type: number
 *         required:
 *           - channel_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
