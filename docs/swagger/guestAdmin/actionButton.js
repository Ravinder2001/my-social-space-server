/**
 * @swagger
 * tags:
 * - name: Action Button
 *   description: API's related to Action Button
 */

/**
 * @swagger
 * /guestAdmin/api/actionButton:
 *  get:
 *      tags:
 *      - Action Button
 *      summary: "Get Action Button"
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
 *                          action_button_id:
 *                              type: integer
 *                          snooze_type:
 *                              type: string
 *                          snooze_time:
 *                              type: ineger
 *                          double_snooze_type:
 *                              type: string
 *                          double_snooze_time:
 *                              type: ineger
 *                          decline_type:
 *                              type: string
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Action Button
 *      summary: "Add Action Button API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          snooze_type:
 *                              type: string
 *                          snooze_time:
 *                              type: ineger
 *                          double_snooze_type:
 *                              type: string
 *                          double_snooze_time:
 *                              type: ineger
 *                          decline_type:
 *                              type: string
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Action Button added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/sound/{action_button_id}:
 *  put:
 *      tags:
 *      - Action Button
 *      summary: "Update the source"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: action_button_id
 *         schema:
 *           type: number
 *         required:
 *           - action_button_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          snooze_type:
 *                              type: string
 *                          snooze_time:
 *                              type: ineger
 *                          double_snooze_type:
 *                              type: string
 *                          double_snooze_time:
 *                              type: ineger
 *                          decline_type:
 *                              type: string
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully updated data"
 *          400:
 *              description: "Error Message"
 *
 *
 */
