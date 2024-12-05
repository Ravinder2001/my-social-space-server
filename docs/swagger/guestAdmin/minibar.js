/**
 * @swagger
 * tags:
 * - name: Minibar
 *   description: API's related to Minibar
 */

/**
 * @swagger
 * /guestAdmin/api/minibar:
 *  get:
 *      tags:
 *      - Minibar
 *      summary: "Get Minibar"
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
 *                          minibar_id:
 *                              type: integer
 *                          super_category_name:
 *                              type: string
 *                          start_time:
 *                              type: string
 *                          end_time:
 *                              type: string
 *                          categories_count:
 *                              type: string
 *                          sub_categories_count:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Minibar
 *      summary: "Add Minibar API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:name:
 *                              type: string
 *                          start_time:
 *                              type: string
 *                          end_time:
 *                              type: string
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Minibar added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/minibar/{minibar_id}:
 *  put:
 *      tags:
 *      - Minibar
 *      summary: "Update the minibar"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: minibar_id
 *         schema:
 *           type: number
 *         required:
 *           - minibar_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:name:
 *                              type: string
 *                          start_time:
 *                              type: string
 *                          end_time:
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
 *      - Minibar
 *      summary: "Update the minibar status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: minibar_id
 *         schema:
 *           type: number
 *         required:
 *           - minibar_id
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
 *      - Minibar
 *      summary: "delete the minibar"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: minibar_id
 *         schema:
 *           type: number
 *         required:
 *           - minibar_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
