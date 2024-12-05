/**
 * @swagger
 * tags:
 * - name: Salutation
 *   description: API's related to Salutation
 */

/**
 * @swagger
 * /guestAdmin/api/salutation:
 *  get:
 *      tags:
 *      - Salutation
 *      summary: "Get Salutation"
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
 *                          salutation_id:
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
 *      - Salutation
 *      summary: "Add Salutation API"
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
 *              description: "Salutation added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/salutation/{salutation_id}:
 *  put:
 *      tags:
 *      - Salutation
 *      summary: "Update the salutation"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: salutation_id
 *         schema:
 *           type: number
 *         required:
 *           - salutation_id
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
 *      - Salutation
 *      summary: "Update the salutation status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: section_id
 *         schema:
 *           type: number
 *         required:
 *           - section_id
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
 *      - Salutation
 *      summary: "delete the salutation"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: salutation_id
 *         schema:
 *           type: number
 *         required:
 *           - salutation_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
