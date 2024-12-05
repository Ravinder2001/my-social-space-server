/**
 * @swagger
 * tags:
 * - name: Conversation
 *   description: API's related to Conversation
 */

/**
 * @swagger
 * /guestAdmin/api/convRouter:
 *  post:
 *      tags:
 *      - Conversation
 *      summary: "Add Conversation API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          start:
 *                              type: string
 *                          end:
 *                              type: string
 *                          end_after:
 *                              type: number
 *                          no_res_text:
 *                              type: string
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Conversation added Sucessfully!"
 *          400:
 *              description: "Error Message"
 */
