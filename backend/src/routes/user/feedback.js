const { Router } = require("express");
const { feedback } = require("../../controllers/feedback");
const feedbackValidate = require("../../validators/feedbackValidator");

const routes = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Feedback:
 *      type: object
 *      required:
 *        - description
 *      properties:
 *        description:
 *          type: string
 */

/**
 * @swagger
 * /user/feedback:
 *  post:
 *    summary: Send feedback
 *    description: This can only be done by authenticated users
 *    tags: [Feedback]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Feedback'
 *    responses:
 *      201:
 *        description: Feedback has been sent successfully
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */
routes.post("/", feedbackValidate, feedback);

module.exports = routes;
