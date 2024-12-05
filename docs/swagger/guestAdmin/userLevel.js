/**
 * @swagger
 * tags:
 * - name: User Level
 *   description: API's related to User Level
 */

/**
 * @swagger
 * /guestAdmin/api/userLevel:
 *  get:
 *      tags:
 *      - User Level
 *      summary: "Get User Level"
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
 *                          user_level_id:
 *                              type: integer
 *                          name:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *                          special_access:
 *                              type: array
 *                              items:
 *                                type: integer
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - User Level
 *      summary: "Add User Level API"
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
 *                          special_access:
 *                              type: array
 *                              description: "array of Ids of special access"
 *                              items:
 *                                type: integer
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "User Level added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/userLevel/{user_level_id}:
 *  put:
 *      tags:
 *      - User Level
 *      summary: "Update the User Level"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: user_level_id
 *         schema:
 *           type: number
 *         required:
 *           - user_level_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          special_access:
 *                              type: array
 *                              description: "array of Ids of special access"
 *                              items:
 *                                type: integer
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
 *      - User Level
 *      summary: "Update the User Level status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: user_level_id
 *         schema:
 *           type: number
 *         required:
 *           - user_level_id
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
 *      - User Level
 *      summary: "delete the User Level"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: user_level_id
 *         schema:
 *           type: number
 *         required:
 *           - user_level_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
