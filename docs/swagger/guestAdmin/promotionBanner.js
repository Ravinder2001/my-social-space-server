/**
 * @swagger
 * tags:
 * - name: Promotion Banner
 *   description: API's related to Promotion Banner
 */

/**
 * @swagger
 * /guestAdmin/api/banner:
 *  get:
 *      tags:
 *      - Promotion Banner
 *      summary: "Get Promotion Banner List"
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
 *                          banner_id:
 *                              type: integer
 *                          banner_name:
 *                              type: string
 *                          banner_image:
 *                              type: string
 *                          valid_till:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Promotion Banner
 *      summary: "Add Promotion Banner API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          banner_name:
 *                              type: string
 *                          banner_image:
 *                              type: buffer
 *                          valid_till:
 *                              type: string
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Promotion Banner added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/banner/{banner_id}:
 *  put:
 *      tags:
 *      - Promotion Banner
 *      summary: "Update the Promotion Banner"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: banner_id
 *         schema:
 *           type: number
 *         required:
 *           - banner_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          banner_name:
 *                              type: string
 *                          banner_image:
 *                              type: buffer
 *                          valid_till:
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
 *      - Promotion Banner
 *      summary: "Update the Promotion Banner status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: banner_id
 *         schema:
 *           type: number
 *         required:
 *           - banner_id
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
 *      - Promotion Banner
 *      summary: "delete the Promotion Banner"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: banner_id
 *         schema:
 *           type: number
 *         required:
 *           - banner_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
