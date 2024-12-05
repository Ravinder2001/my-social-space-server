/**
 * @swagger
 * tags:
 * - name: HSN Code
 *   description: API's related to HSN Code
 */

/**
 * @swagger
 * /guestAdmin/api/hsnCode:
 *  get:
 *      tags:
 *      - HSN Code
 *      summary: "Get HSN Code"
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
 *                          code_id:
 *                              type: integer
 *                          code:
 *                              type: string
 *                          description:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - HSN Code
 *      summary: "Add HSN Code API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          code:
 *                              type: string
 *                          description:
 *                              type: string
 *                      required:
 *                          - name
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "HSN Code added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/hsnCode/{code_id}:
 *  put:
 *      tags:
 *      - HSN Code
 *      summary: "Update the hsnCode"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: code_id
 *         schema:
 *           type: number
 *         required:
 *           - code_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          code:
 *                              type: string
 *                          description:
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
 *      - HSN Code
 *      summary: "Update the hsnCode status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: code_id
 *         schema:
 *           type: number
 *         required:
 *           - code_id
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
 *      - HSN Code
 *      summary: "delete the hsnCode"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: code_id
 *         schema:
 *           type: number
 *         required:
 *           - code_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 * 
 */
