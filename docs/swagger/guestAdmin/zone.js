/**
 * @swagger
 * tags:
 * - name: Zone
 *   description: API's related to Zone
 */

/**
 * @swagger
 * /guestAdmin/api/zone:
 *  get:
 *      tags:
 *      - Zone
 *      summary: "Get Zone List"
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
 *                          zone_id:
 *                              type: integer
 *                          zone_name:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Zone
 *      summary: "Add Zone API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          zone_name:
 *                              type: string
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Zone added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/zone/{zone_id}:
 *  put:
 *      tags:
 *      - Zone
 *      summary: "Update the Zone"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: zone_id
 *         schema:
 *           type: number
 *         required:
 *           - zone_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
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
 *      - Zone
 *      summary: "Update the Zone status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: zone_id
 *         schema:
 *           type: number
 *         required:
 *           - zone_id
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
 *      - Zone
 *      summary: "delete the Zone"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: zone_id
 *         schema:
 *           type: number
 *         required:
 *           - zone_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
