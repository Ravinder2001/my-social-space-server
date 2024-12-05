/**
 * @swagger
 * tags:
 * - name: Tax
 *   description: API's related to Tax
 */

/**
 * @swagger
 * /guestAdmin/api/tax:
 *  get:
 *      tags:
 *      - Tax
 *      summary: "Get Tax"
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
 *                          tax_id:
 *                              type: integer
 *                          name:
 *                              type: string
 *                          tax_rate:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Tax
 *      summary: "Add Tax API"
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
 *                          tax_rate:
 *                              type: string
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Tax added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/tax/{tax_id}:
 *  put:
 *      tags:
 *      - Tax
 *      summary: "Update the tax"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: tax_id
 *         schema:
 *           type: number
 *         required:
 *           - tax_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:name:
 *                              type: string
 *                          tax_rate:
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
 *      - Tax
 *      summary: "Update the tax status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: tax_id
 *         schema:
 *           type: number
 *         required:
 *           - tax_id
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
 *      - Tax
 *      summary: "delete the tax"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: tax_id
 *         schema:
 *           type: number
 *         required:
 *           - tax_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
