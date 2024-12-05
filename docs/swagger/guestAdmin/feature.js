/**
 * @swagger
 * tags:
 * - name: Feature
 *   description: API's related to Feature
 */

/**
 * @swagger
 * /guestAdmin/api/feature:
 *  get:
 *      tags:
 *      - Feature
 *      summary: "Get Feature List"
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
 *                          feature_id:
 *                              type: integer
 *                          feature_name:
 *                              type: string
 *                          feature_group_id:
 *                              type: integer
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Feature
 *      summary: "Add Feature API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          feature_name:
 *                              type: string
 *                          feature_group_id:
 *                              type: integer
 *                      required:
 *                          - feature_name
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Feature added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/feature/{feature_id}:
 *  put:
 *      tags:
 *      - Feature
 *      summary: "Update the Feature"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: feature_id
 *         schema:
 *           type: number
 *         required:
 *           - feature_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          feature_name:
 *                              type: string
 *                          feature_group_id:
 *                              type: integer
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
 *      - Feature
 *      summary: "Update the Feature status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: feature_id
 *         schema:
 *           type: number
 *         required:
 *           - feature_id
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
 *      - Feature
 *      summary: "delete the Feature"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: feature_id
 *         schema:
 *           type: number
 *         required:
 *           - feature_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 * 
 * /guestAdmin/api/feature/{feature_group_id}:
 *  get:
 *    tags:
 *    - Feature
 *    summary: "Get Features by Feature Category id"
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: feature_group_id
 *       required: true
 *       schema:
 *         type: string
 *    responses:
 *      200:
 *        description: "Successful response"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: integer
 *                  example: 1
 *                message:
 *                  type: string
 *                  example: "success"
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      feature_id:
 *                        type: integer
 *                        example: 3
 *                      feature_name:
 *                        type: string
 *                        example: "Bed View"
 *                      is_active:
 *                        type: boolean
 *                        example: true
 *                      feature_group_id:
 *                              type: integer
 *                count:
 *                  type: integer
 *                  example: 1
 *      400:
 *        description: "Bad Request"
 *      401:
 *        description: "Unauthorized"
 */
