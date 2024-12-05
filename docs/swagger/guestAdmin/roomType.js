/**
 * @swagger
 * tags:
 * - name: Room Type
 *   description: API's related to Room Type
 */

/**
 * @swagger
 * /guestAdmin/api/roomType:
 *  get:
 *      tags:
 *      - Room Type
 *      summary: "Get Room Type"
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
 *                          room_type_id:
 *                              type: integer
 *                          room_type:
 *                              type: string
 *                          room_code:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Room Type
 *      summary: "Add Room Type API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          room_type:
 *                              type: string
 *                          room_code:
 *                              type: string
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Room Type added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/roomType/{room_type_id}:
 *  put:
 *      tags:
 *      - Room Type
 *      summary: "Update the room type"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: room_type_id
 *         schema:
 *           type: number
 *         required:
 *           - room_type_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          room_type:
 *                              type: string
 *                          room_code:
 *                              type: string
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
 *      - Room Type
 *      summary: "Update the room type status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: room_type_id
 *         schema:
 *           type: number
 *         required:
 *           - room_type_id
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
 *      - Room Type
 *      summary: "delete the room type"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: room_type_id
 *         schema:
 *           type: number
 *         required:
 *           - room_type_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
