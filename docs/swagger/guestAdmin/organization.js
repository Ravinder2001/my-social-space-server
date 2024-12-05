/**
 * @swagger
 * tags:
 * - name: Organization
 *   description: API's related to Organization
 */

/**
 * @swagger
 * /guestAdmin/api/organization:
 *  post:
 *      tags:
 *      - Organization
 *      summary: "Add Organization API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          enterprise_name:
 *                              type: string
 *                          brand_name:
 *                              type: string
 *                          address_line_1:
 *                              type: string
 *                          address_line_2:
 *                              type: string
 *                          postal_code:
 *                              type: string
 *                          city:
 *                              type: string
 *                          country_id:
 *                              type: string
 *                          location:
 *                              type: string
 *                          telephone:
 *                              type: string
 *                          email:
 *                              type: string
 *                          gstn_number:
 *                              type: string
 *                          pan_number:
 *                              type: string
 *                          fssai_number:
 *                              type: string
 *                          check_in_time:
 *                              type: string
 *                          check_out_time:
 *                              type: string
 *                          total_rooms:
 *                              type: string
 *                          total_tables:
 *                              type: string
 *                          currency:
 *                              type: string
 *                          brand_logo:
 *                              type: buffer
 *                          welcome_image:
 *                              type: buffer
 *                          gstn_image:
 *                              type: buffer
 *                          pan_image:
 *                              type: buffer
 *                          fssai_image:
 *                              type: buffer
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Organization added Sucessfully!"
 *          400:
 *              description: "Error Message"
 */
