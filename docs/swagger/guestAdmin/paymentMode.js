/**
 * @swagger
 * tags:
 * - name: Payment Mode
 *   description: API's related to Payment Mode
 */

/**
 * @swagger
 * /guestAdmin/api/paymentMode:
 *  get:
 *      tags:
 *      - Payment Mode
 *      summary: "Get Payment Mode"
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
 *                          payment_mode_id:
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
 *      - Payment Mode
 *      summary: "Add Payment Mode API"
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
 *              description: "Payment Mode added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/paymentMode/{payment_mode_id}:
 *  put:
 *      tags:
 *      - Payment Mode
 *      summary: "Update the paymentMode"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: payment_mode_id
 *         schema:
 *           type: number
 *         required:
 *           - payment_mode_id
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
 *      - Payment Mode
 *      summary: "Update the paymentMode status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: payment_mode_id
 *         schema:
 *           type: number
 *         required:
 *           - payment_mode_id
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
 *      - Payment Mode
 *      summary: "delete the paymentMode"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: payment_mode_id
 *         schema:
 *           type: number
 *         required:
 *           - payment_mode_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 * 
 */
