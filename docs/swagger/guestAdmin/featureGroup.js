/**
 * @swagger
 * tags:
 * - name: Feature Group
 *   description: API's related to Feature Group
 */

/**
 * @swagger
 * /guestAdmin/api/featureGroup:
 *  get:
 *      tags:
 *      - Feature Group
 *      summary: "Get Feature Group"
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
 *                          feature_group_id:
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
 *      - Feature Group
 *      summary: "Add Feature Group API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string=
 *                      required:
 *                          - name
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Feature Group added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/featureGroup/{feature_group_id}:
 *  put:
 *      tags:
 *      - Feature Group
 *      summary: "Update the Feature Group"
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
 *      - Feature Group
 *      summary: "Update the Feature Group status"
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
 *      - Feature Group
 *      summary: "delete the Feature Group"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: section_id
 *         schema:
 *           type: number
 *         required:
 *           - section_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"

 */
