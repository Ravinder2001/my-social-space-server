/**
 * @swagger
 * tags:
 * - name: Guest Service
 *   description: API's related to Guest Service
 */

/**
 * @swagger
 * /guestAdmin/api/guestService:
 *  get:
 *      tags:
 *      - Guest Service
 *      summary: "Get Guest Service"
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
 *                          guest_service_id:
 *                              type: integer
 *                          in_room_qr:
 *                              type: string
 *                          in_room_qr_is_active:
 *                              type: boolean
 *                          in_room_tv:
 *                              type: string
 *                          in_room_tv_is_active:
 *                              type: boolean
 *                          brand_app:
 *                              type: string
 *                          brand_app_is_active:
 *                              type: boolean
 *                          brand_website:
 *                              type: string
 *                          brand_website_is_active:
 *                              type: boolean
 *                          white_label_app:
 *                              type: string
 *                          white_label_app_is_active:
 *                              type: boolean
 *                          facebook:
 *                              type: string
 *                          facebook_is_active:
 *                              type: boolean
 *                          instagram:
 *                              type: string
 *                          instagram_is_active:
 *                              type: boolean
 *                          linkedin:
 *                              type: string
 *                          linkedin_is_active:
 *                              type: boolean
 *                          youtube:
 *                              type: string
 *                          youtube_is_active:
 *                              type: boolean
 *                          twitter:
 *                              type: string
 *                          twitter_is_active:
 *                              type: boolean
 *                          tiktok:
 *                              type: string
 *                          tiktok_is_active:
 *                              type: boolean
 *                          email:
 *                              type: string
 *                          email_is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Guest Service
 *      summary: "Add Guest Service API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          in_room_qr:
 *                              type: string
 *                          in_room_qr_is_active:
 *                              type: boolean
 *                          in_room_tv:
 *                              type: string
 *                          in_room_tv_is_active:
 *                              type: boolean
 *                          brand_app:
 *                              type: string
 *                          brand_app_is_active:
 *                              type: boolean
 *                          brand_website:
 *                              type: string
 *                          brand_website_is_active:
 *                              type: boolean
 *                          white_label_app:
 *                              type: string
 *                          white_label_app_is_active:
 *                              type: boolean
 *                          facebook:
 *                              type: string
 *                          facebook_is_active:
 *                              type: boolean
 *                          instagram:
 *                              type: string
 *                          instagram_is_active:
 *                              type: boolean
 *                          linkedin:
 *                              type: string
 *                          linkedin_is_active:
 *                              type: boolean
 *                          youtube:
 *                              type: string
 *                          youtube_is_active:
 *                              type: boolean
 *                          twitter:
 *                              type: string
 *                          twitter_is_active:
 *                              type: boolean
 *                          tiktok:
 *                              type: string
 *                          tiktok_is_active:
 *                              type: boolean
 *                          email:
 *                              type: string
 *                          email_is_active:
 *                              type: boolean
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Guest Service added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/guestService/{guest_service_id}:
 *  put:
 *      tags:
 *      - Guest Service
 *      summary: "Update the guest service"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: guest_service_id
 *         schema:
 *           type: number
 *         required:
 *           - guest_service_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          in_room_qr:
 *                              type: string
 *                          in_room_qr_is_active:
 *                              type: boolean
 *                          in_room_tv:
 *                              type: string
 *                          in_room_tv_is_active:
 *                              type: boolean
 *                          brand_app:
 *                              type: string
 *                          brand_app_is_active:
 *                              type: boolean
 *                          brand_website:
 *                              type: string
 *                          brand_website_is_active:
 *                              type: boolean
 *                          white_label_app:
 *                              type: string
 *                          white_label_app_is_active:
 *                              type: boolean
 *                          facebook:
 *                              type: string
 *                          facebook_is_active:
 *                              type: boolean
 *                          instagram:
 *                              type: string
 *                          instagram_is_active:
 *                              type: boolean
 *                          linkedin:
 *                              type: string
 *                          linkedin_is_active:
 *                              type: boolean
 *                          youtube:
 *                              type: string
 *                          youtube_is_active:
 *                              type: boolean
 *                          twitter:
 *                              type: string
 *                          twitter_is_active:
 *                              type: boolean
 *                          tiktok:
 *                              type: string
 *                          tiktok_is_active:
 *                              type: boolean
 *                          email:
 *                              type: string
 *                          email_is_active:
 *                              type: boolean
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully updated data"
 *          400:
 *              description: "Error Message"
 *
 */
