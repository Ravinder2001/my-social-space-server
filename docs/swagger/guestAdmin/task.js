/**
 * @swagger
 * tags:
 * - name: Task
 *   description: API's related to Tasks
 */

/**
 * @swagger
 * /guestAdmin/api/task:
 *  get:
 *      tags:
 *      - Task
 *      summary: "Get Task List"
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
 *                          task_id:
 *                              type: integer
 *                          description:
 *                              type: string
 *                          department:
 *                              type: integer
 *                          sub_department:
 *                              type: integer
 *                          section:
 *                              type: integer
 *                          user_level:
 *                              type: integer
 *                          completion_time:
 *                              type: integer
 *                          remind_before:
 *                              type: integer
 *                          escalation:
 *                              type: integer
 *                          escalation_after:
 *                              type: integer
 *                          guest_enable:
 *                              type: boolean
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Task
 *      summary: "Add Task API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          description:
 *                              type: string
 *                          department:
 *                              type: integer
 *                          sub_department:
 *                              type: integer
 *                          section:
 *                              type: integer
 *                          user_level:
 *                              type: integer
 *                          completion_time:
 *                              type: integer
 *                          remind_before:
 *                              type: integer
 *                          escalation:
 *                              type: integer
 *                          escalation_after:
 *                              type: integer
 *                          guest_enable:
 *                              type: boolean
 * 
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Task added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/task/{task_id}:
 *  put:
 *      tags:
 *      - Task
 *      summary: "Update the Task"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: task_id
 *         schema:
 *           type: number
 *         required:
 *           - task_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          description:
 *                              type: string
 *                          department:
 *                              type: integer
 *                          sub_department:
 *                              type: integer
 *                          section:
 *                              type: integer
 *                          user_level:
 *                              type: integer
 *                          completion_time:
 *                              type: integer
 *                          remind_before:
 *                              type: integer
 *                          escalation:
 *                              type: integer
 *                          escalation_after:
 *                              type: integer
 *                          guest_enable:
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
 *      - Task
 *      summary: "Update the Task status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: task_id
 *         schema:
 *           type: number
 *         required:
 *           - task_id
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
 *      - Task
 *      summary: "delete the task"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: task_id
 *         schema:
 *           type: number
 *         required:
 *           - task_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 * /guestAdmin/api/task/{department_id}:
*  get:
*    tags:
*    - Task
*    summary: "Get Tasks by Department ID"
*    security:
*     - bearerAuth: []
*    parameters:
*     - in: path
*       name: department_id
*       required: true
*       schema:
*         type: string
*    responses:
*      200:
*        description: "Successful response"
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: integer
*                  example: 1
*                message:
*                  type: string
*                  example: "success"
*                data:
*                  type: array
*                  items:
*                    type: object
*                    properties:
*                      task_id:
*                        type: integer
*                        example: 5
*                      description:
*                        type: string
*                        example: "Water is not coming"
*                      is_active:
*                        type: boolean
*                        example: true
*                count:
*                  type: integer
*                  example: 1
*      400:
*        description: "Bad Request"
*      401:
*        description: "Unauthorized"
 *
 */
