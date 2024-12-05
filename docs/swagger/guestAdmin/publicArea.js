/**
 * @swagger
 * tags:
 * - name: Public Area
 *   description: API's related to Public Area
 */

/**
 * @swagger
 * /guestAdmin/api/publicArea:
 *  get:
 *      tags:
 *      - Public Area
 *      summary: "Get Public Area"
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
 *                          public_area_id:
 *                              type: integer
 *                          name:
 *                              type: string
 *                          zone_id:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Public Area
 *      summary: "Add Public Area API"
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
 *                          zone_id:
 *                              type: number
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Public Area added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/publicArea/{public_area_id}:
 *  put:
 *      tags:
 *      - Public Area
 *      summary: "Update the Public Area"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: public_area_id
 *         schema:
 *           type: number
 *         required:
 *           - public_area_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          zone_id:
 *                              type: number
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
 *      - Public Area
 *      summary: "Update the Public Area status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: public_area_id
 *         schema:
 *           type: number
 *         required:
 *           - public_area_id
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
 *      - Public Area
 *      summary: "delete the Public Area"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: public_area_id
 *         schema:
 *           type: number
 *         required:
 *           - public_area_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 * /guestAdmin/api/publicArea/{zone_id}:
*  get:
*    tags:
*    - Public Area
*    summary: "Get Public Area by Area ID"
*    security:
*     - bearerAuth: []
*    parameters:
*     - in: path
*       name: zone_id
*       required: true
*       schema:
*         type: string
*    responses:
*      200:
*        description: "Successful response"
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: integer
*                  example: 1
*                message:
*                  type: string
*                  example: "success"
*                data:
*                  type: array
*                  items:
*                    type: object
*                    properties:
*                      public_area_id:
*                        type: integer
*                        example: 2
*                      name:
*                        type: string
*                        example: "Lobby"
*                      is_active:
*                        type: boolean
*                        example: true
*                count:
*                  type: integer
*                  example: 1
*      400:
*        description: "Bad Request"
*      401:
*        description: "Unauthorized"
 */
