const { Router } = require("express");
const {
  getStories,
  getStoriesSearch,
  getNotifications,
  getStoryDetail,
} = require("../controllers/mainPage");
const storyDetailValidate = require("../validators/storyDetailValidation");

const routes = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Stories:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        title:
 *          type: string
 */

/** @swagger
 * /home:
 *  get:
 *    summary: Get all stories
 *    description: This can only be done by authenticated users
 *    tags: [Stories]
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: The page number
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /home/story/:id:
 *  get:
 *    summary: Get a specific story
 *    description: This can only be done by authenticated users
 *    tags: [Stories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: The story id
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found or story not found
 *      500:
 *        description: Internal server error
 */

/** @swagger
 * /home/search:
 *  get:
 *    summary: Get all stories by their name
 *    description: This can only be done by authenticated users
 *    tags: [Stories]
 *    parameters:
 *      - in: query
 *        name: query
 *        schema:
 *          type: string
 *        description: The search query
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */

/** @swagger
 * /home/notifications:
 *  get:
 *    summary: Get all notifications
 *    description: This can only be done by authenticated users
 *    tags: [Stories]
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */
routes.get("/", getStories);
routes.get("/story/:id", storyDetailValidate, getStoryDetail);
routes.get("/search", getStoriesSearch);
routes.get("/notifications", getNotifications);

module.exports = routes;
