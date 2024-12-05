/**
 * @swagger
 * tags:
 * - name: Bill
 *   description: API's related to Bill
 */

/**
 * @swagger
 * /guestAdmin/api/bill/fetchBill/{room_id}:
 *  get:
 *     tags:
 *     - Bill
 *     summary: "Fetch the Bill for a specific room no"
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: room_id
 *         schema:
 *           type: number
 *         required: true
 *         description: The room id to fetch the bill for
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "success"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bill_id:
 *                   type: integer
 *                   example: 5
 *                 available_windows_count:
 *                   type: integer
 *                   example: 1
 *                 bill_windows:
 *                   type: object
 *                   properties:
 *                     bill_window_number:
 *                       type: object
 *                       properties:
 *                         bill_details:
 *                           type: object
 *                           properties:
 *                             bill_window_id:
 *                               type: integer
 *                               example: 6
 *                             total_amount:
 *                               type: string
 *                               example: "44"
 *                             total_discount:
 *                               type: string
 *                               example: "0"
 *                             total_tip:
 *                               type: string
 *                               example: "0"
 *                             balance:
 *                               type: string
 *                               example: "49.126000000000005"
 *                             sgst:
 *                               type: string
 *                               example: "1.87"
 *                             cgst:
 *                               type: string
 *                               example: "1.87"
 *                             vat:
 *                               type: string
 *                               example: "0"
 *                             cess:
 *                               type: string
 *                               example: "0"
 *                             other_taxs:
 *                               type: string
 *                               example: "0.22"
 *                             service_charge:
 *                               type: string
 *                               example: "1.1"
 *                             sgst_on_service_charge:
 *                               type: string
 *                               example: "0.0275"
 *                             cgst_on_service_charge:
 *                               type: string
 *                               example: "0.0275"
 *                             vat_on_service_charge:
 *                               type: string
 *                               example: "0"
 *                             cess_on_service_charge:
 *                               type: string
 *                               example: "0"
 *                             other_taxs_on_service_charge:
 *                               type: string
 *                               example: "0.011000000000000001"
 *                             is_settled:
 *                               type: boolean
 *                               example: true
 *                             discount_type:
 *                               type: string
 *                               nullable: true
 *                               example: null
 *                             discount_reason:
 *                               type: string
 *                               nullable: true
 *                               example: null
 *                             discount_value:
 *                               type: string
 *                               nullable: true
 *                               example: null
 *                             settlement_amount:
 *                               type: string
 *                               example: "49.126000000000005"
 *                             settlement_area:
 *                               type: string
 *                               example: "To Room"
 *                         transactions:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               transaction_id:
 *                                 type: integer
 *                                 example: 9
 *                               description:
 *                                 type: string
 *                                 example: "Amex"
 *                               amount:
 *                                 type: string
 *                                 example: "22"
 *                               qty:
 *                                 type: string
 *                                 example: "1"
 *                               discount:
 *                                 type: string
 *                                 example: "0"
 *                               service_charge:
 *                                 type: string
 *                                 example: "0"
 *                               discount_type:
 *                                 type: string
 *                                 nullable: true
 *                                 example: null
 *                               service_charge_type:
 *                                 type: string
 *                                 nullable: true
 *                                 example: null
 *                               discount_reason:
 *                                 type: string
 *                                 nullable: true
 *                                 example: null
 *                               discount_value:
 *                                 type: string
 *                                 nullable: true
 *                                 example: null
 *                               service_charge_value:
 *                                 type: string
 *                                 nullable: true
 *                                 example: null
 *                         payments:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               bill_payment_id:
 *                                 type: integer
 *                                 example: 9
 *                               payment_type:
 *                                 type: string
 *                                 example: "refund,paid_out,payment"
 *                               amount:
 *                                 type: number
 *                                 example: "22"
 *                               payment_mode:
 *                                 type: string
 *                                 example: "VISA,UPI"
 *
 *       400:
 *         description: "Error Message"
 * /guestAdmin/api/bill/create:
 *  post:
 *      tags:
 *      - Bill
 *      summary: "Add Bill API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          room_id:
 *                              type: integer
 *      produces:
 *          -application/json
 *      responses:
 *       200:
 *         description: "success"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 billWindowId:
 *                   type: integer
 *                   example: 5
 *                 totalAmount:
 *                   type: integer
 *                   example: 1
 *                 balance:
 *                   type: integer
 *                   example: 1
 *
 * /guestAdmin/api/bill/toogleTip/{bill_window_id}:
 *  post:
 *      tags:
 *      - Bill
 *      summary: "Toggle Tip"
 *      description: "From this single api you can add, edit and remove. for removing just send 0"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: bill_window_id
 *         schema:
 *           type: number
 *         required:
 *           - bill_window_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          amount:
 *                              type: integer
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully updated data"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/bill/toogleServiceCharge/{bill_window_id}:
 *  post:
 *      tags:
 *      - Bill
 *      summary: "Toggle Service Charge"
 *      description: "From this single api you can add, edit and remove. for removing just send value as 0 and type should be remove"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: bill_window_id
 *         schema:
 *           type: number
 *         required:
 *           - bill_window_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          value:
 *                              type: integer
 *                          type:
 *                              type: string
 *                              example: "(percentage, amount, remove) any one from these"
 *                          transaction_id:
 *                              type: integer
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully updated data"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/bill/toogleTransactionDiscount/{bill_window_id}:
 *  post:
 *      tags:
 *      - Bill
 *      summary: "Toggle Transaction Discount"
 *      description: "From this single API you can add, edit, and remove. For removing, just send value as 0 and type should be 'remove'."
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: bill_window_id
 *         schema:
 *           type: number
 *         required: true
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          value:
 *                              type: integer
 *                          type:
 *                              type: string
 *                              example: "(percentage, amount, remove) any one from these"
 *                          transaction_ids:
 *                              type: array
 *                              items:
 *                                  type: integer
 *                              example: [7, 8]
 *                          reason:
 *                              type: string
 *                              example: "asasd"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Successfully updated data"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/bill/toogleBillDiscount/{bill_window_id}:
 *  post:
 *      tags:
 *      - Bill
 *      summary: "Toggle Bill Discount"
 *      description: "From this single api you can add, edit and remove. for removing just send 0"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: bill_window_id
 *         schema:
 *           type: number
 *         required:
 *           - bill_window_id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          value:
 *                              type: integer
 *                          type:
 *                              type: string
 *                              example: "(percentage, amount, remove) any one from these"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully updated data"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/bill/settle/to_room:
 *  post:
 *      tags:
 *      - Bill
 *      summary: "Bill settle for to room"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          bill_window_id:
 *                              type: integer
 *                          payment_mode:
 *                              type: integer
 *                              example: "this will be the id of payment mode"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully updated data"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/bill/settle/to_staff:
 *  post:
 *      tags:
 *      - Bill
 *      summary: "Bill settle for to Staff user"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          bill_window_id:
 *                              type: integer
 *                          user_id:
 *                              type: integer
 *                              example: "Id of staff user"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully updated data"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/bill/settle/complimentary:
 *  post:
 *      tags:
 *      - Bill
 *      summary: "Bill settle for to complimentary"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          bill_window_id:
 *                              type: integer
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully updated data"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/bill/settle/to_city_ledger:
 *  post:
 *      tags:
 *      - Bill
 *      summary: "Bill settle for to city ledger"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          bill_window_id:
 *                              type: integer
 *                          city_ledger_id:
 *                              type: integer
 *                              example: "this city_ledger id will be the id of company,agent,vendor. you will get this in the search api list"
 *                          city_ledger_type:
 *                              type: string
 *                              example: "(company,agent,vendor) any one from these. you will get this in the search api list"
 *                          payment_type:
 *                              type: string
 *                              example: "(credit,paid) if guest is not paying then credit otherwise paid"
 *                          payment_mode:
 *                              type: integer
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully updated data"
 *          400:
 *              description: "Error Message"
 *
 * /staffModule/api/bill/getCityLedgerList/{city_ledger_name}:
 *  get:
 *      tags:
 *      - Bill
 *      summary: "Get City ledger list"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: city_ledger_name
 *         schema:
 *           type: number
 *         required:
 *           - city_ledger_name
 *      produces:
 *          - application/json
 *      responses:
 *            200:
 *              description: "Data fetched successfully"
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          city_ledger_id:
 *                              type: integer
 *                          city_ledger_name:
 *                              type: string
 *                          city_ledger_type:
 *                              type: string
 *
 *
 *            400:
 *              description: "Error Message"
 *
 * /staffModule/api/bill/gstn/add:
 *  post:
 *      tags:
 *      - Bill
 *      summary: "Add or Save GSTN details"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                gstn_number:
 *                  type: string
 *                  example: "264153125555555"
 *                company_name:
 *                  type: string
 *                  example: "WeDevelop4u pvt ltd"
 *      responses:
 *          200:
 *              description: "success"
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                        success:
 *                            type: integer
 *                            example: 1
 *                        message:
 *                            type: string
 *                            example: "success"
 *                        data:
 *                          type: object
 *                          properties:
 *                            gstn:
 *                              type: string
 *                              example: "264153125555555"
 *                            company_name:
 *                              type: string
 *                              example: "WeDevelop4u pvt ltd"
 *          400:
 *              description: "Error Message"
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                        success:
 *                            type: integer
 *                            example: 0
 *                        message:
 *                            type: string
 *  /staffModule/api/bill/gstn/{bill_window_id}:
 *  delete:
 *    tags:
 *    - Bill
 *    summary: "Remove GSTN"
 *    security:
 *    - bearerAuth: []
 *    parameters:
 *    - in: path
 *      name: bill_window_id
 *      schema:
 *        type: string
 *      required: true
 *      description: "ID of the bill window to delete"
 *    responses:
 *      200:
 *        description: "GSTN removed successfully"
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
 *                  example: "GSTN removed successfully"
 *      400:
 *        description: "Error Message"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: integer
 *                  example: 0
 *                message:
 *                  type: string
 *                  example: "Error deleting GSTN"
 * /staffModule/api/bill/addMembership/{bill_window_id}:
 *  post:
 *      tags:
 *      - Bill
 *      summary: "Add membership to bill"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: bill_window_id
 *         schema:
 *           type: number
 *         required:
 *           - bill_window_id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                membership_level_id:
 *                  type: integer
 *                membership_no:
 *                  type: string
 *      responses:
 *          200:
 *              description: "success"
 *
 *          400:
 *              description: "Error Message"
 *
 * /staffModule/api/bill/editMembership/{bill_window_id}:
 *  put:
 *      tags:
 *      - Bill
 *      summary: "Edit membership"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: bill_window_id
 *         schema:
 *           type: number
 *         required:
 *           - bill_window_id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                membership_level_id:
 *                  type: integer
 *                membership_no:
 *                  type: string
 *      responses:
 *          200:
 *              description: "success"
 *
 *          400:
 *              description: "Error Message"
 *
 * /staffModule/api/bill/deleteMembership/{bill_window_id}:
 *  delete:
 *      tags:
 *      - Bill
 *      summary: "Edit membership"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: bill_window_id
 *         schema:
 *           type: number
 *         required:
 *           - bill_window_id
 *
 *      responses:
 *          200:
 *              description: "Deleted successfully"
 *
 *          400:
 *              description: "Error Message"
 *
 * /staffModule/api/bill/addPayment/{bill_window_id}:
 *  post:
 *      tags:
 *      - Bill
 *      summary: "Add Payment"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: bill_window_id
 *         schema:
 *           type: number
 *         required:
 *           - bill_window_id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                payment_type:
 *                  type: string
 *                  example: "refund,paid_out,payment"
 *                payment_mode:
 *                  type: integer
 *                amount:
 *                  type: integer
 *      responses:
 *          200:
 *              description: "success"
 *
 *          400:
 *              description: "Error Message"
 *
 * /staffModule/api/bill/editPayment/{bill_payment_id}:
 *  put:
 *      tags:
 *      - Bill
 *      summary: "Edit Payment"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: bill_payment_id
 *         schema:
 *           type: number
 *         required:
 *           - bill_payment_id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                payment_type:
 *                  type: string
 *                  example: "refund,paid_out,payment"
 *                payment_mode:
 *                  type: integer
 *                amount:
 *                  type: integer
 *      responses:
 *          200:
 *              description: "success"
 *
 *          400:
 *              description: "Error Message"
 *
 * /staffModule/api/bill/deletePayment/{bill_payment_id}:
 *  delete:
 *      tags:
 *      - Bill
 *      summary: "Delete Payment"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: bill_payment_id
 *         schema:
 *           type: number
 *         required:
 *           - bill_payment_id
 *      responses:
 *          200:
 *              description: "success"
 *
 *          400:
 *              description: "Error Message"
 *
 *
 */
