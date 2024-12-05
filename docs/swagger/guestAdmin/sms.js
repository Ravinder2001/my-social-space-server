/**
 * @swagger
 * tags:
 * - name: SMS
 *   description: API's related to SMS
 */

/**
 * @swagger
 * /guestAdmin/api/sms/send-otp:
 *  post:
 *      tags:
 *      - SMS
 *      summary: "Send OTP Api"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phoneNumber:
 *                              type: string
 *                              example: "+911234567890 pass the phone number with country code"
 *
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "OTP sent successfully"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/sms/verify-otp:
 *  post:
 *      tags:
 *      - SMS
 *      summary: "Verify OTP Api"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          phoneNumber:
 *                              type: string
 *                              example: "+911234567890 pass the phone number with country code"
 *                          otp:
 *                              type: number
 *
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "OTP verified successfully"
 *          400:
 *              description: "Error Message"
 */
