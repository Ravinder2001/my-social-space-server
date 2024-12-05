/**
 * @swagger
 * tags:
 * - name: Property Users
 *   description: API's related to Property Users
 */

/**
 * @swagger
 * /guestAdmin/api/propertyUser:
 *  get:
 *      tags:
 *      - Property Users
 *      summary: "Get Property Users List"
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
 *                          user_id:
 *                              type: integer
 *                          profile_image:
 *                              type: string
 *                          salutation_id:
 *                              type: integer
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          country_id:
 *                              type: integer
 *                          mobile_no:
 *                              type: string
 *                          email:
 *                              type: string
 *                          designation:
 *                              type: string
 *                          aadhar_number:
 *                              type: string
 *                          aadhar_image:
 *                              type: string
 *                          department_id:
 *                              type: integer
 *                          sub_department_id:
 *                              type: integer
 *                          section_id:
 *                              type: integer
 *                          user_level_id:
 *                              type: integer
 *                          zone_id:
 *                              type: integer
 *                          reporting_to:
 *                              type: integer
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                          device_id:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 *
 *  post:
 *      tags:
 *      - Property Users
 *      summary: "Add Property Users API"
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          profile_image:
 *                              type: buffer
 *                          salutation_id:
 *                              type: integer
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          country_id:
 *                              type: integer
 *                          mobile_no:
 *                              type: string
 *                          email:
 *                              type: string
 *                          designation:
 *                              type: string
 *                          aadhar_number:
 *                              type: string
 *                          aadhar_image:
 *                              type: buffer
 *                          department:
 *                              type: integer
 *                          sub_department:
 *                              type: integer
 *                          section:
 *                              type: integer
 *                          user_level:
 *                              type: integer
 *                          zone:
 *                              type: integer
 *                          reporting_to:
 *                              type: integer
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                          device_id:
 *                              type: string
 *                          modules:
 *                              type: string
 *                              description: "'1,2,3,....' (the id of the modules for which it is being accessed )"
 *                          special_access:
 *                              type: string
 *                              description: "'1,2,3,4,....' (the id of the special access for which it is being accessed )"
 *                      required:
 *                          - section_name
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Section added Sucessfully!"
 *          400:
 *              description: "Error Message"
 *
 * /guestAdmin/api/propertyUser/getFilteredPropertyUsers/{department_id}/{user_level_id}:
 *  get:
 *      tags:
 *      - Property Users
 *      summary: "Get the list according to the deparment and user level"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: department_id
 *         schema:
 *           type: number
 *         required:
 *           - department_id
 *         description: "if nothing selected then send the -1 in the params or if only department_id is selected then send the user_level_id as -1"
 *       - in: path
 *         name: user_level_id
 *         schema:
 *           type: number
 *         required:
 *           - user_level_id
 *         description: "if nothing selected then send the -1 in the params or if only user_level_id is selected then send the department_id as -1"
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
 *                          user_id:
 *                              type: integer
 *                          profile_image:
 *                              type: string
 *                          salutation_id:
 *                              type: integer
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          country_id:
 *                              type: integer
 *                          mobile_no:
 *                              type: string
 *                          email:
 *                              type: string
 *                          designation:
 *                              type: string
 *                          aadhar_number:
 *                              type: string
 *                          aadhar_image:
 *                              type: string
 *                          department_id:
 *                              type: integer
 *                          sub_department_id:
 *                              type: integer
 *                          section_id:
 *                              type: integer
 *                          user_level_id:
 *                              type: integer
 *                          zone_id:
 *                              type: integer
 *                          reporting_to:
 *                              type: integer
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                          device_id:
 *                              type: string
 *                          is_active:
 *                              type: boolean
 *            400:
 *              description: "Error Message"
 * 
 * /guestAdmin/api/propertyUser/{property_user_id}:
 *  put:
 *      tags:
 *      - Property Users
 *      summary: "Update the Property User"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: property_user_id
 *         schema:
 *           type: number
 *         required:
 *           - property_user_id
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          profile_image:
 *                              type: buffer
 *                          salutation_id:
 *                              type: integer
 *                          first_name:
 *                              type: string
 *                          last_name:
 *                              type: string
 *                          country_id:
 *                              type: integer
 *                          mobile_no:
 *                              type: string
 *                          email:
 *                              type: string
 *                          designation:
 *                              type: string
 *                          aadhar_number:
 *                              type: string
 *                          aadhar_image:
 *                              type: buffer
 *                              description: "this field is optional untill the image is not changed" 
 *                          department:
 *                              type: integer
 *                          sub_department:
 *                              type: integer
 *                          section:
 *                              type: integer
 *                          user_level:
 *                              type: integer
 *                          zone:
 *                              type: integer
 *                          reporting_to:
 *                              type: integer
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                          device_id:
 *                              type: string
 *                          modules:
 *                              type: string
 *                              description: "1,2,3,.... (the id of the modules for which it is being accessed )"
 *                          special_access:
 *                              type: string
 *                              description: "1,2,3,4,.... (the id of the special access for which it is being accessed )"
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
 *      - Property Users
 *      summary: "Update the Property User status"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: property_user_id
 *         schema:
 *           type: number
 *         required:
 *           - property_user_id
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
 *      - Property Users
 *      summary: "delete the section"
 *      security:
 *       - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: property_user_id
 *         schema:
 *           type: number
 *         required:
 *           - property_user_id
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "successfully deleted data"
 *          400:
 *              description: "Error Message"
 *
 */
