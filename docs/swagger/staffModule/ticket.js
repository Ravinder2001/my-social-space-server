/**
 * @swagger
 * tags:
 * - name: Staff Ticket
 *   description: API's related to ticket
 */

/**
 * @swagger
 * /staffModule/api/calendar/ticket_details:
 *  get:
 *      tags:
 *      - Ticket
 *      summary: "Get Ticket Details calendar"
 *      security:
 *       - bearerAuth: []
 *      produces:
 *          - application/json
 *      responses:
 *            200:
 *              description: "Data fetched successfully"
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                        success:
 *                            type: integer
 *                        message:
 *                            type: string
 *                        data:
 *                            type: object
 *                            additionalProperties:
 *                                type: array
 *                                items:
 *                                    type: object
 *                                    properties:
 *                                        ticket_id:
 *                                            type: integer
 *                                        public_area_flag:
 *                                            type: boolean
 *                                        room_id:
 *                                            type: string
 *                                            nullable: true
 *                                        ?column?:
 *                                            type: string
 *                                        coalesce:
 *                                            type: string
 *                                        ticket_status_id:
 *                                            type: integer
 *                                        task_complete_time:
 *                                            type: string
 *                                            nullable: true
 *                                            format: date-time
 *                                        created_at:
 *                                            type: string
 *                                            format: date-time
 *            400:
 *              description: "Error Message"
 *  /staffModule/api/task/{taskId}/agent:
 *  put:
 *      tags:
 *      - Ticket
 *      summary: "Update Task Agent"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the task
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          agentId:
 *                              type: integer
 *                              description: ID of the agent to be assigned
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Data updated Successfully!"
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
 * /staffModule/api/task/filter:
 *  post:
 *      tags:
 *      - Ticket
 *      summary: "Filter Tasks"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          uid:
 *                              type: string
 *                              description: "User ID to filter tasks"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "List is fetched successfully"
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                        success:
 *                            type: integer
 *                        message:
 *                            type: string
 *                        data:
 *                            type: array
 *                            items:
 *                                type: object
 *                                properties:
 *                                    source:
 *                                        type: string
 *                                    room_id:
 *                                        type: string
 *                                        nullable: true
 *                                    date:
 *                                        type: string
 *                                        format: date
 *                                    time:
 *                                        type: string
 *                                        format: time
 *                                    location:
 *                                        type: string
 *                                    guest_name:
 *                                        type: string
 *                                    timer:
 *                                        type: integer
 *                                    agent:
 *                                        type: string
 *                        count:
 *                            type: integer
 *          400:
 *              description: "Error Message"
 * /staffModule/api/task/{taskId}/status:
 *  put:
 *      tags:
 *      - Ticket
 *      summary: "Update Task Status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the task
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          statusId:
 *                              type: integer
 *                              description: ID of the status to be assigned
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Data updated Successfully!"
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
 * /staffModule/api/task/counts:
 *  get:
 *      tags:
 *      - Ticket
 *      summary: "Get Task Counts by Status"
 *      security:
 *       - bearerAuth: []
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "List is fetched successfully"
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                        success:
 *                            type: integer
 *                        message:
 *                            type: string
 *                        data:
 *                            type: array
 *                            items:
 *                                type: object
 *                                properties:
 *                                    status_id:
 *                                        type: integer
 *                                    status_name:
 *                                        type: string
 *                                    status_count:
 *                                        type: string
 *                        count:
 *                            type: integer
 *          400:
 *              description: "Error Message"
 * /staffModule/api/task:
 *  get:
 *      tags:
 *      - Ticket
 *      summary: "Get Task List"
 *      security:
 *       - bearerAuth: []
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "List is fetched successfully"
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                        success:
 *                            type: integer
 *                        message:
 *                            type: string
 *                        data:
 *                            type: array
 *                            items:
 *                                type: object
 *                                properties:
 *                                    source:
 *                                        type: string
 *                                    room_id:
 *                                        type: string
 *                                        nullable: true
 *                                    uid:
 *                                        type: integer
 *                                    date:
 *                                        type: string
 *                                        format: date
 *                                    time:
 *                                        type: string
 *                                        format: time
 *                                    location:
 *                                        type: string
 *                                    guest_name:
 *                                        type: string
 *                                    task:
 *                                        type: string
 *                                    timer:
 *                                        type: integer
 *                                    agent:
 *                                        type: string
 *                                    status_id:
 *                                        type: integer
 *                                        nullable: true
 *                        count:
 *                            type: integer
 *          400:
 *              description: "Error Message"
 * /staffModule/acceptTicket:
 *  post:
 *      tags:
 *      - Ticket
 *      summary: "Accept Ticket"
 *      security:
 *       - bearerAuth: []
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Status changed successfully."
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
 * /staffModule/api/task/add:
 *  post:
 *      tags:
 *      - Ticket
 *      summary: "Automatic Ticket creation and assigning"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          guest_flag:
 *                              type: boolean
 *                              description: Flag indicating if guest is involved
 *                          public_area:
 *                              type: boolean
 *                              description: Flag indicating if task is related to public zone
 *                          source:
 *                              type: string
 *                              description: Source of the task
 *                          room_id:
 *                              type: string
 *                              nullable: true
 *                              description: Room number (if applicable)
 *                          location:
 *                              type: string
 *                              description: Location of the task
 *                          task_id:
 *                              type: integer
 *                              description: ID of the task
 *                          schedule_time:
 *                              type: string
 *                              format: date-time
 *                              description: Scheduled time of the task
 *                          email:
 *                              type: string
 *                              description: Email of the guest or contact person
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Ticket created successfully."
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
