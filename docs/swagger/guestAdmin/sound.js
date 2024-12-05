/**
 * @swagger
 * tags:
 * - name: Sound
 *   description: API's related to Sound
 */

/**
 * @swagger
 * /guestAdmin/api/sound/getAlarmSoundList:
 *  get:
 *      tags:
 *      - Sound
 *      summary: "Get Alarm Sound List"
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
 *                          alarm_sound_id:
 *                              type: integer
 *                          sound_name:
 *                              type: string
 *                          sound_url:
 *                              type: string
 *            400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/sound:
 *  post:
 *      tags:
 *      - Sound
 *      summary: "Add Sound API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          new_ticket:
 *                              type: integer
 *                          reminder:
 *                              type: integer
 *                          escalation:
 *                              type: integer
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Sound added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/sound/{sound_id}:
 *  put:
 *      tags:
 *      - Sound
 *      summary: "Update the source"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: sound_id
 *         schema:
 *           type: number
 *         required:
 *           - sound_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          new_ticket:
 *                              type: integer
 *                          reminder:
 *                              type: integer
 *                          escalation:
 *                              type: integer
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
