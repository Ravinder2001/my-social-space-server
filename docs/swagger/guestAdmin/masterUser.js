/**
 * @swagger
 * tags:
 * - name: Master User
 *   description: API's related to Master User
 */

/**
 * @swagger
 * /guestAdmin/api/masterUser:
 *  post:
 *      tags:
 *      - Master User
 *      summary: "Add Master User API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          salutation:
 *                              type: string
 *                          firstname:
 *                              type: string
 *                          lastname:
 *                              type: string
 *                          countryCode:
 *                              type: string
 *                          mobile:
 *                              type: string
 *                          email:
 *                              type: string
 *                          designation:
 *                              type: string
 *                          aadhar:
 *                              type: string
 *                          profile_pic:
 *                              type: buffer
 *                          aadhar_pic:
 *                              type: buffer
 *
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Master User added Sucessfully!"
 *          400:
 *              description: "Error Message"
 */
