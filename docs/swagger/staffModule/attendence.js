/**
 * @swagger
 * tags:
 * - name: Attendance
 *   description: Staff dashboard Attendance[In/Out]
 */

/**
 * @swagger
 * /staffModule/api/attendence/log-in:
 *  get:
 *      tags:
 *      - Attendance
 *      summary: "Staff Login"
 *      security:
 *       - bearerAuth: []
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Successfully Login for today."
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                        success:
 *                            type: integer
 *                        message:
 *                            type: string
 *          400:
 *              description: "Error Message"
 * /staffModule/api/attendence/log-out:
 *  get:
 *      tags:
 *      - Attendance
 *      summary: "Staff Logout"
 *      security:
 *       - bearerAuth: []
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Successfully Logout."
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                        success:
 *                            type: integer
 *                        message:
 *                            type: string
 *          400:
 *              description: "Error Message"
 */
