/**
 * @swagger
 * tags:
 * - name: Departement
 *   description: API's related to Departement
 */

/**
 * @swagger
 * /guestAdmin/api/department:
 *  get:
 *      tags:
 *      - Departement
 *      summary: "Get Departement"
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
 *                          department_id:
 *                              type: integer
 *                          department_name:
 *                              type: string
 *                          sub_department_count:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Departement
 *      summary: "Add Departement API"
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
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Departement added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/department/{department_id}:
 *  put:
 *      tags:
 *      - Departement
 *      summary: "Update the department"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: department_id
 *         schema:
 *           type: number
 *         required:
 *           - department_id
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
 *      - Departement
 *      summary: "Update the department status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: department_id
 *         schema:
 *           type: number
 *         required:
 *           - department_id
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
 *      - Departement
 *      summary: "delete the department"
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
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
