/**
 * @swagger
 * tags:
 * - name: Default Options
 *   description: API's related to Default Options
 */

/**
 * @swagger
 * /guestAdmin/api/defaultOptions:
 *  get:
 *      tags:
 *      - Default Options
 *      summary: "Get Default Options"
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
 *                          default_options_id:
 *                              type: integer
 *                          lang:
 *                              type: string
 *                          font:
 *                              type: string
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Default Options
 *      summary: "Add Default Options API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          lang:
 *                              type: string
 *                          font:
 *                              type: string
 *
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Default Options added Sucessfully!"
 *          400:
 *              description: "Error Message"
 * /guestAdmin/api/defaultOptions/{default_options_id}:
 *  put:
 *      tags:
 *      - Default Options
 *      summary: "Update the Default Options"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: default_options_id
 *         schema:
 *           type: number
 *         required:
 *           - default_options_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          lang:
 *                              type: string
 *                          font:
 *                              type: string
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully updated data"
 *          400:
 *              description: "Error Message"
 *
 */
