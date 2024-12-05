/**
 * @swagger
 * tags:
 * - name: Section
 *   description: API's related to Section
 */

/**
 * @swagger
 * /guestAdmin/api/section:
 *  get:
 *      tags:
 *      - Section
 *      summary: "Get Section"
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
 *                          section_id:
 *                              type: integer
 *                          section_name:
 *                              type: string
 *                          sub_department_id:
 *                              type: integer
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Section
 *      summary: "Add Section API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          section_name:
 *                              type: string
 *                          sub_department_id:
 *                              type: integer
 *                      required:
 *                          - section_name
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Section added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/section/{section_id}:
 *  put:
 *      tags:
 *      - Section
 *      summary: "Update the section"
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
 *                          section_name:
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
 *      - Section
 *      summary: "Update the section status"
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
 *      - Section
 *      summary: "delete the section"
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
 * /guestAdmin/api/section/{sub_department_id}:
*  get:
*    tags:
*    - Section
*    summary: "Get Sections by Sub Department ID"
*    security:
*     - bearerAuth: []
*    parameters:
*     - in: path
*       name: sub_department_id
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
*                      section_id:
*                        type: integer
*                        example: 5
*                      section_name:
*                        type: string
*                        example: "front desk"
*                      is_active:
*                        type: boolean
*                        example: true
*                      section_count:
*                        type: string
*                        example: "1"
*                count:
*                  type: integer
*                  example: 1
*      400:
*        description: "Bad Request"
*      401:
*        description: "Unauthorized"
 *
 */
