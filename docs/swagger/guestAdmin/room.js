/**
 * @swagger
 * tags:
 * - name: Room
 *   description: API's related to Room
 */

/**
 * @swagger
 * /guestAdmin/api/room:
 *  get:
 *      tags:
 *      - Room
 *      summary: "Get Room List"
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
 *                          room_id:
 *                              type: integer
 *                          zone_id:
 *                              type: integer
 *                          room_type_id:
 *                              type: integer
 *                          feature_group_id:
 *                              type: integer
 *                          feature_id:
 *                              type: integer
 *                          room_name:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Room
 *      summary: "Add Room API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          room_type_id:
 *                              type: integer
 *                          zone_id:
 *                              type: integer
 *                          feature_group_id:
 *                              type: integer
 *                          feature_id:
 *                              type: integer
 *                          room_name:
 *                              type: string
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Room added Sucessfully!"
 *          400:
 *              description: "Error Message"
 * 
 * /guestAdmin/api/room/getFilteredRooms/{room_type_id}/{zone_id}:
 *  get:
 *      tags:
 *      - Room
 *      summary: "Get Room List"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: room_type_id
 *         schema:
 *           type: number
 *         required:
 *           - room_type_id
 *         description: "if nothing selected then send the -1 in the params or if only room_type_id is selected then send the zone_id as -1"
 *       - in: path
 *         name: zone_id
 *         schema:
 *           type: number
 *         required:
 *           - zone_id
 *         description: "if nothing selected then send the -1 in the params or if only zone_id is selected then send the room_type_id as -1"
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
 *                          room_id:
 *                              type: integer
 *                          zone_id:
 *                              type: integer
 *                          room_type_id:
 *                              type: integer
 *                          feature_group_id:
 *                              type: integer
 *                          feature_id:
 *                              type: integer
 *                          room_name:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/room/{room_id}:
 *  put:
 *      tags:
 *      - Room
 *      summary: "Update the Room"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: room_id
 *         schema:
 *           type: number
 *         required:
 *           - room_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          room_type_id:
 *                              type: integer
 *                          room_id:
 *                              type: integer
 *                          feature_group_id:
 *                              type: integer
 *                          feature_id:
 *                              type: integer
 *                          room_name:
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
 *      - Room
 *      summary: "Update the Room status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: room_id
 *         schema:
 *           type: number
 *         required:
 *           - room_id
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
 *      - Room
 *      summary: "delete the Room"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: room_id
 *         schema:
 *           type: number
 *         required:
 *           - room_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
