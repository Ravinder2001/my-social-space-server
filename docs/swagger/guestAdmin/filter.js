/**
 * @swagger
 * tags:
 * - name: Filter
 *   description: API's related to Filter
 */

/**
 * @swagger
 * /guestAdmin/api/filter:
 *  get:
 *      tags:
 *      - Filter
 *      summary: "Get Filter"
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
 *                          filter_id:
 *                              type: integer
 *                          name:
 *                              type: string
 *                          filter_group_id:
 *                              type: number
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Filter
 *      summary: "Add Filter API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          filter_group_id:
 *                              type: number
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Filter added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/filter/{filter_id}:
 *  put:
 *      tags:
 *      - Filter
 *      summary: "Update the Filter"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: filter_id
 *         schema:
 *           type: number
 *         required:
 *           - filter_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          filter_group_id:
 *                              type: number
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
 *      - Filter
 *      summary: "Update the Filter status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: filter_id
 *         schema:
 *           type: number
 *         required:
 *           - filter_id
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
 *      - Filter
 *      summary: "delete the Filter"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: filter_id
 *         schema:
 *           type: number
 *         required:
 *           - filter_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
