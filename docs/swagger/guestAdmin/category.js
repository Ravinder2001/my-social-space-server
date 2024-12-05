/**
 * @swagger
 * tags:
 * - name: Category
 *   description: API's related to Category
 */

/**
 * @swagger
 * /guestAdmin/api/category:
 *  get:
 *      tags:
 *      - Category
 *      summary: "Get Category"
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
 *                          category_id:
 *                              type: integer
 *                          minibar_id:
 *                              type: string
 *                          name:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Category
 *      summary: "Add Category API"
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
 *                          minibar_id:
 *                              type: string
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Category added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/category/{category_id}:
 *  put:
 *      tags:
 *      - Category
 *      summary: "Update the category"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: category_id
 *         schema:
 *           type: number
 *         required:
 *           - category_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          minibar_id:
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
 *      - Category
 *      summary: "Update the category status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: category_id
 *         schema:
 *           type: number
 *         required:
 *           - category_id
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
 *      - Category
 *      summary: "delete the category"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: category_id
 *         schema:
 *           type: number
 *         required:
 *           - category_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 * /guestAdmin/api/category/{minibar_id}:
*  get:
*    tags:
*    - Category
*    summary: "Get Categories by Super Category ID"
*    security:
*     - bearerAuth: []
*    parameters:
*     - in: path
*       name: minibar_id
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
*                      category_id:
*                        type: integer
*                        example: 11
*                      name:
*                        type: string
*                        example: "test1"
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
