/**
 * @swagger
 * tags:
 * - name: Sub Category
 *   description: API's related to Sub Category
 */

/**
 * @swagger
 * /guestAdmin/api/subCategory:
 *  get:
 *      tags:
 *      - Sub Category
 *      summary: "Get Sub Category"
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
 *                          sub_category_id:
 *                              type: integer
 *                          category_id:
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
 *      - Sub Category
 *      summary: "Add Sub Category API"
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
 *                          category_id:
 *                              type: string
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Sub Category added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/subCategory/{sub_category_id}:
 *  put:
 *      tags:
 *      - Sub Category
 *      summary: "Update the Sub category"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: sub_category_id
 *         schema:
 *           type: number
 *         required:
 *           - sub_category_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          category_id:
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
 *      - Sub Category
 *      summary: "Update the Sub category status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: sub_category_id
 *         schema:
 *           type: number
 *         required:
 *           - sub_category_id
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
 *      - Sub Category
 *      summary: "delete the Sub category"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: sub_category_id
 *         schema:
 *           type: number
 *         required:
 *           - sub_category_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 * /guestAdmin/api/subCategory/{category_id}:
*  get:
*    tags:
*    - Sub Category
*    summary: "Get SubCategories by Category ID"
*    security:
*     - bearerAuth: []
*    parameters:
*     - in: path
*       name: category_id
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
*                      sub_category_id:
*                        type: integer
*                        example: 7
*                      name:
*                        type: string
*                        example: "GST1"
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
