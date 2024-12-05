/**
 * @swagger
 * tags:
 * - name: Item
 *   description: API's related to Item
 */

/**
 * @swagger
 * /guestAdmin/api/item:
 *  get:
 *      tags:
 *      - Item
 *      summary: "Get Item List"
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
 *                          item_id:
 *                              type: integer
 *                          name:
 *                              type: string
 *                          category_id:
 *                              type: integer
 *                          sub_category_id:
 *                              type: integer
 *                          price:
 *                              type: integer
 *                          filter_group_id:
 *                              type: integer
 *                          filter_id:
 *                              type: integer
 *                          hsn_code:
 *                              type: integer
 *                          image:
 *                              type: string
 *                          taxs:
 *                              type: array
 *                              items:
 *                                type: string
 *                          service_charge:
 *                              type: array
 *                              items:
 *                                type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Item
 *      summary: "Add Item API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: buffer
 *                          name:
 *                              type: string
 *                          category_id:
 *                              type: string
 *                          sub_category_id:
 *                              type: string
 *                          price:
 *                              type: string
 *                          tax:
 *                              type: string
 *                              description: "'1,2,3,....' (the id of the tax for which it is being accessed )"
 *                          service_charge:
 *                              type: string
 *                              description: "'1,2,3,....' (the id of the service_charge for which it is being accessed )"
 *                          filter_group_id:
 *                              type: string
 *                          filter_id:
 *                              type: string
 *                          hsn_code:
 *                              type: string
 *                      required:
 *                          - section_name
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Item added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/item/{item_id}:
 *  put:
 *      tags:
 *      - Item
 *      summary: "Update the item"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: number
 *         required:
 *           - item_id
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: buffer
 *                              description: "this is optional when user haven't changed the image"
 *                          name:
 *                              type: string
 *                          category_id:
 *                              type: string
 *                          sub_category_id:
 *                              type: string
 *                          price:
 *                              type: string
 *                          tax:
 *                              type: string
 *                              description: "'1,2,3,....' (the id of the tax for which it is being accessed )"
 *                          service_charge:
 *                              type: string
 *                              description: "'1,2,3,....' (the id of the service_charge for which it is being accessed )"
 *                          filter_group_id:
 *                              type: string
 *                          filter_id:
 *                              type: string
 *                          hsn_code:
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
 *      - Item
 *      summary: "Update the item status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: number
 *         required:
 *           - item_id
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
 *      - Item
 *      summary: "delete the item"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: item_id
 *         schema:
 *           type: number
 *         required:
 *           - item_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
