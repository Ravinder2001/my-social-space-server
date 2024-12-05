/**
 * @swagger
 * tags:
 * - name: Filter Group
 *   description: API's related to Filter Group
 */

/**
 * @swagger
 * /guestAdmin/api/filterGroup:
 *  get:
 *      tags:
 *      - Filter Group
 *      summary: "Get Filter Group"
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
 *                          filter_group_id:
 *                              type: integer
 *                          name:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Filter Group
 *      summary: "Add Filter Group API"
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
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Filter Group added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/filterGroup/{filter_group_id}:
 *  put:
 *      tags:
 *      - Filter Group
 *      summary: "Update the Filter Group"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: filter_group_id
 *         schema:
 *           type: number
 *         required:
 *           - filter_group_id
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
 *      - Filter Group
 *      summary: "Update the Filter Group status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: filter_group_id
 *         schema:
 *           type: number
 *         required:
 *           - filter_group_id
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
 *      - Filter Group
 *      summary: "delete the Filter Group"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: filter_group_id
 *         schema:
 *           type: number
 *         required:
 *           - filter_group_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
