/**
 * @swagger
 * tags:
 * - name: Bank
 *   description: API's related to Bank
 */

/**
 * @swagger
 * /guestAdmin/api/bank/add_bank_details:
 *  post:
 *      tags:
 *      - Bank
 *      summary: "Add Bank API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          uploadQr:
 *                              type: buffer
 *                          accountName:
 *                              type: string
 *                          accountNumber:
 *                              type: string
 *                          bankName:
 *                              type: string
 *                          branchName:
 *                              type: string
 *                          ifcsCode:
 *                              type: string
 *                          swiftCode:
 *                              type: string
 *                          upiId:
 *                              type: string
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Bank added Sucessfully!"
 *          400:
 *              description: "Error Message"
 */
