/**
 * @swagger
 * tags:
 * - name: Reason Type
 *   description: API's related to Reason Type
 */

/**
 * @swagger
 * /guestAdmin/api/reasonType:
 *  get:
 *      tags:
 *      - Reason Type
 *      summary: "Get Reason Type"
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
 *                          reason_id:
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
 *      - Reason Type
 *      summary: "Add Reason Type API"
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
 *                      required:
 *                          - name
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Reason Type added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/reasonType/{reason_id}:
 *  put:
 *      tags:
 *      - Reason Type
 *      summary: "Update the reasonType"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: reason_id
 *         schema:
 *           type: number
 *         required:
 *           - reason_id
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
 *      - Reason Type
 *      summary: "Update the reasonType status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: reason_id
 *         schema:
 *           type: number
 *         required:
 *           - reason_id
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
 *      - Reason Type
 *      summary: "delete the reasonType"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: reason_id
 *         schema:
 *           type: number
 *         required:
 *           - reason_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 * 
 */
