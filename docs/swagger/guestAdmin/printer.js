/**
 * @swagger
 * tags:
 * - name: Printer
 *   description: API's related to Printer
 */

/**
 * @swagger
 * /guestAdmin/api/printer:
 *  get:
 *      tags:
 *      - Printer
 *      summary: "Get Printer"
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
 *                          printer_id:
 *                              type: integer
 *                          department_id:
 *                              type: integer
 *                          sub_department_id:
 *                              type: integer
 *                          section_id:
 *                              type: integer
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Printer
 *      summary: "Add Printer API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          department_id:
 *                              type: integer
 *                          sub_department_id:
 *                              type: integer
 *                          section_id:
 *                              type: integer
 *                      required:
 *                          - name
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Printer added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/printer/{printer_id}:
 *  put:
 *      tags:
 *      - Printer
 *      summary: "Update the printer"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: printer_id
 *         schema:
 *           type: number
 *         required:
 *           - printer_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          department_id:
 *                              type: integer
 *                          sub_department_id:
 *                              type: integer
 *                          section_id:
 *                              type: integer
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
 *      - Printer
 *      summary: "Update the printer status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: printer_id
 *         schema:
 *           type: number
 *         required:
 *           - printer_id
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
 *      - Printer
 *      summary: "delete the printer"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: printer_id
 *         schema:
 *           type: number
 *         required:
 *           - printer_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 * 
 */
