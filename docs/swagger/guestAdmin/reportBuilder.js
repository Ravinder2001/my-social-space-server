/**
 * @swagger
 * tags:
 * - name: Report Builder
 *   description: API's related to Report Builder
 */

/**
 * @swagger
 * /guestAdmin/api/reportBuilder/columnWithFilters:
 *  get:
 *      tags:
 *      - Report Builder
 *      summary: "Get Report Column and filters List API"
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
 *                          report_column_id:
 *                              type: integer
 *                          label:
 *                              type: string
 *                          filter_json:
 *                              type: object
 *                              example: "{'key':'value'} for filters"
 *
 *            400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/reportBuilder/columnValues/{report_column_id}:
 *  get:
 *      tags:
 *      - Report Builder
 *      summary: "Get Report column values API"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: report_column_id
 *         schema:
 *           type: number
 *         required:
 *           - report_column_id
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
 *                      type: string
 *                      example: "['value1','value2']"
 *
 *            400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/reportBuilder/createReport:
 *  post:
 *      tags:
 *      - Report Builder
 *      summary: "Create/Save Report API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          report_name:
 *                              type: string
 *                          report_module_id:
 *                              type: integer
 *                          report_column_id:
 *                              type: integer
 *                          filter_json:
 *                              type: object
 *                              example: "pass the whole filter json with selected filters as true othwerwise false"
 *                          values:
 *                              type: array
 *                              items:
 *                                type: string
 *                                example: value1,value2
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "success"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/reportBuilder/editReport/{report_id}:
 *  put:
 *      tags:
 *      - Report Builder
 *      summary: "Edit Report API"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: report_id
 *         schema:
 *           type: number
 *         required:
 *           - report_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          report_name:
 *                              type: string
 *                          report_module_id:
 *                              type: integer
 *                          report_column_id:
 *                              type: integer
 *                          filter_json:
 *                              type: object
 *                              example: "pass the whole filter json with selected filters as true othwerwise false"
 *                          values:
 *                              type: array
 *                              items:
 *                                type: string
 *                                example: value1,value2
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "success"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/reportBuilder/deleteReport/{report_id}:
 *  delete:
 *      tags:
 *      - Report Builder
 *      summary: "Delete Report API"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: report_id
 *         schema:
 *           type: number
 *         required:
 *           - report_id
 *      responses:
 *          200:
 *              description: "success"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/reportBuilder/singleReport/{report_id}:
 *  get:
 *      tags:
 *      - Report Builder
 *      summary: "Get Report API"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: report_id
 *         schema:
 *           type: number
 *         required:
 *           - report_id
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
 *                          report_id:
 *                              type: integer
 *                          report_column_id:
 *                              type: integer
 *                          report_name:
 *                              type: string
 *                          report_module_id:
 *                              type: integer
 *                          filter_json:
 *                              type: object
 *                              example: "{'key':'value'} for filters"
 *                          values:
 *                              type: array
 *                              example: "array of selected values"
 *                          data:
 *                              type: array
 *                              example: "array of data generate for selected filters"
 *
 *            400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/reportBuilder/generateReport:
 *  post:
 *      tags:
 *      - Report Builder
 *      summary: "Generate Report API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          report_column_id:
 *                              type: integer
 *                          filter_json:
 *                              type: object
 *                              example: "pass the whole filter json with selected filters as true othwerwise false"
 *                          values:
 *                              type: array
 *                              items:
 *                                type: string
 *                                example: value1,value2
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "in reponse you will get data for selected filters inside array"
 *          400:
 *              description: "Error Message"
 *
 */
