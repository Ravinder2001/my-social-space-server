/**
 * @swagger
 * tags:
 * - name: Promotion
 *   description: API's related to Promotion
 */

/**
 * @swagger
 * /guestAdmin/api/promotion:
 *  get:
 *      tags:
 *      - Promotion
 *      summary: "Get Promotion List"
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
 *                          promotion_id:
 *                              type: integer
 *                          image:
 *                              type: string
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          validity:
 *                              type: string
 *                          item_id:
 *                              type: integer
 *                          amount:
 *                              type: integer
 *                          percentage:
 *                              type: integer
 *                          coupon_code:
 *                              type: integer
 *                          in_room_qr:
 *                              type: boolean
 *                          in_room_tv:
 *                              type: boolean
 *                          brand_app:
 *                              type: boolean
 *                          white_label_app:
 *                              type: boolean
 *                          brand_website:
 *                              type: boolean
 *                          facebook:
 *                              type: boolean
 *                          instagram:
 *                              type: boolean
 *                          linkedin:
 *                              type: boolean
 *                          twitter:
 *                              type: boolean
 *                          tiktok:
 *                              type: boolean
 *                          youtube:
 *                              type: boolean
 *                          email:
 *                              type: boolean
 *                          makemytrip:
 *                              type: boolean
 *                          booking:
 *                              type: boolean
 *                          expedia:
 *                              type: boolean
 *                          agoda:
 *                              type: boolean
 *                          airbnb:
 *                              type: boolean
 *                          amadeus:
 *                              type: boolean
 *                          sabre:
 *                              type: boolean
 *                          galileo:
 *                              type: boolean
 *                          travelport:
 *                              type: boolean
 *                          worldspan:
 *                              type: boolean
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Promotion
 *      summary: "Add Promotion API"
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
 *                          description:
 *                              type: string
 *                          validity:
 *                              type: string
 *                          item_id:
 *                              type: integer
 *                          amount:
 *                              type: integer
 *                          percentage:
 *                              type: integer
 *                          coupon_code:
 *                              type: integer
 *                          in_room_qr:
 *                              type: boolean
 *                          in_room_tv:
 *                              type: boolean
 *                          brand_app:
 *                              type: boolean
 *                          white_label_app:
 *                              type: boolean
 *                          brand_website:
 *                              type: boolean
 *                          facebook:
 *                              type: boolean
 *                          instagram:
 *                              type: boolean
 *                          linkedin:
 *                              type: boolean
 *                          twitter:
 *                              type: boolean
 *                          tiktok:
 *                              type: boolean
 *                          youtube:
 *                              type: boolean
 *                          email:
 *                              type: boolean
 *                          makemytrip:
 *                              type: boolean
 *                          booking:
 *                              type: boolean
 *                          expedia:
 *                              type: boolean
 *                          agoda:
 *                              type: boolean
 *                          airbnb:
 *                              type: boolean
 *                          amadeus:
 *                              type: boolean
 *                          sabre:
 *                              type: boolean
 *                          galileo:
 *                              type: boolean
 *                          travelport:
 *                              type: boolean
 *                          worldspan:
 *                              type: boolean
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Promotion added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/promotion/{promotion_id}:
 *  put:
 *      tags:
 *      - Promotion
 *      summary: "Update the item"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: promotion_id
 *         schema:
 *           type: number
 *         required:
 *           - promotion_id
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
 *                          description:
 *                              type: string
 *                          validity:
 *                              type: string
 *                          item_id:
 *                              type: integer
 *                          amount:
 *                              type: integer
 *                          percentage:
 *                              type: integer
 *                          coupon_code:
 *                              type: integer
 *                          in_room_qr:
 *                              type: boolean
 *                          in_room_tv:
 *                              type: boolean
 *                          brand_app:
 *                              type: boolean
 *                          white_label_app:
 *                              type: boolean
 *                          brand_website:
 *                              type: boolean
 *                          facebook:
 *                              type: boolean
 *                          instagram:
 *                              type: boolean
 *                          linkedin:
 *                              type: boolean
 *                          twitter:
 *                              type: boolean
 *                          tiktok:
 *                              type: boolean
 *                          youtube:
 *                              type: boolean
 *                          email:
 *                              type: boolean
 *                          makemytrip:
 *                              type: boolean
 *                          booking:
 *                              type: boolean
 *                          expedia:
 *                              type: boolean
 *                          agoda:
 *                              type: boolean
 *                          airbnb:
 *                              type: boolean
 *                          amadeus:
 *                              type: boolean
 *                          sabre:
 *                              type: boolean
 *                          galileo:
 *                              type: boolean
 *                          travelport:
 *                              type: boolean
 *                          worldspan:
 *                              type: boolean
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
 *      - Promotion
 *      summary: "Update the promotion status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: promotion_id
 *         schema:
 *           type: number
 *         required:
 *           - promotion_id
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
 *      - Promotion
 *      summary: "delete the promotion"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: promotion_id
 *         schema:
 *           type: number
 *         required:
 *           - promotion_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
