/**
 * @swagger
 * tags:
 * - name: Sub Department
 *   description: API's related to Sub Department
 */

/**
 * @swagger
 * /guestAdmin/api/subDepartment:
 *  get:
 *      tags:
 *      - Sub Department
 *      summary: "Get Sub Department"
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
 *                          sub_department_id:
 *                              type: integer
 *                          sub_department_name:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Sub Department
 *      summary: "Add Sub Department API"
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
 *                          department_id:
 *                              type: number
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Sub Department added Sucessfully!"
 *          400:
 *              description: "Error Message"
 * 
 * /guestAdmin/api/subDepartment/{department_id}:
 *  get:
 *      tags:
 *      - Sub Department
 *      summary: "Get SubDepartment List by Department ID"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: department_id
 *         schema:
 *           type: number
 *         required:
 *           - department_id
 *      produces:
 *          - application/json
 *      responses:
 *            200:
 *              description: "success"
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                        success:
 *                            type: integer
 *                        message:
 *                            type: string
 *                        data:
 *                            type: array
 *                            items:
 *                                type: object
 *                                properties:
 *                                    sub_department_id:
 *                                        type: integer
 *                                    sub_department_name:
 *                                        type: string
 *                                    is_active:
 *                                        type: boolean
 *                                    section_count:
 *                                        type: string
 *                        count:
 *                            type: integer
 *            400:
 *              description: "Error Message"
 * /guestAdmin/api/subDepartment/{sub_department_id}:
 *  put:
 *      tags:
 *      - Sub Department
 *      summary: "Update the department"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: sub_department_id
 *         schema:
 *           type: number
 *         required:
 *           - sub_department_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          department_id:
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
 *      - Sub Department
 *      summary: "Update the sub department status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: sub_department_id
 *         schema:
 *           type: number
 *         required:
 *           - sub_department_id
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
 *      - Sub Department
 *      summary: "delete the sub department"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: sub_department_id
 *         schema:
 *           type: number
 *         required:
 *           - sub_department_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
