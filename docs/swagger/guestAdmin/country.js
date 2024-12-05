/**
 * @swagger
 * tags:
 * - name: Country
 *   description: API's related to Country List
 */

/**
 * @swagger
 * /guestAdmin/api/country/get_country_list:
 *   post:
 *     tags:
 *       - Country
 *     summary: "Get Country List with name, currency, and dial code"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: >
 *         Send a payload without specific keys to retrieve a list of all countries with their names, codes, and dial codes. For instance, sending { "country_name": 1 } will return a list of all country names only. Providing any other value instead of 1 will perform a search query for matching country names(it works same for all the keys). Include specific field names with a value of 1 in the payload to get only those fields in the response. Fields not included in the payload will be excluded from the response.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country_name:
 *                 type: string
 *               country_code:
 *                 type: string
 *               currency_code:
 *                 type: string
 *               currency_name:
 *                 type: string
 *               country_dial_code:
 *                 type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "Success"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   country_id:
 *                     type: integer
 *                   country_name:
 *                     type: string
 *                   country_code:
 *                     type: string
 *                   currency_code:
 *                     type: string
 *                   currency_name:
 *                     type: string
 *                   country_dial_code:
 *                     type: string
 *       400:
 *         description: "Error Message"
 */
