/**
 * @swagger
 * tags:
 * - name: Service Charge
 *   description: API's related to Service Charge
 */

/**
 * @swagger
 * /guestAdmin/api/serviceCharge:
 *  get:
 *      tags:
 *      - Service Charge
 *      summary: "Get Service Charge List"
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
 *                          service_charge_id:
 *                              type: integer
 *                          name:
 *                              type: string
 *                          service_charge_rate:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *                          tax_ids:
 *                              type: array
 *                              description: "array of Ids of special access"
 *                              items:
 *                                type: integer
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Service Charge
 *      summary: "Add Service Charge API"
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
 *                          service_charge_rate:
 *                              type: string
 *                          tax_ids:
 *                              type: array
 *                              description: "array of Ids of special access"
 *                              items:
 *                                type: integer
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Service Charge added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/serviceCharge/{service_charge_id}:
 *  put:
 *      tags:
 *      - Service Charge
 *      summary: "Update the serviceCharge"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: service_charge_id
 *         schema:
 *           type: number
 *         required:
 *           - service_charge_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:name:
 *                              type: string
 *                          service_charge_rate:
 *                              type: string
 *                          tax_ids:
 *                              type: array
 *                              description: "array of Ids of special access"
 *                              items:
 *                                type: integer
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
 *      - Service Charge
 *      summary: "Update the serviceCharge status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: service_charge_id
 *         schema:
 *           type: number
 *         required:
 *           - service_charge_id
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
 *      - Service Charge
 *      summary: "delete the serviceCharge"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: service_charge_id
 *         schema:
 *           type: number
 *         required:
 *           - service_charge_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
