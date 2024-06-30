const { Router } = require("express");
const {
  getSources,
  follow,
  unfollow,
  getFollowing,
  getSourcesNews,
} = require("../../controllers/sources");

const routes = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Sources:
 *      type: object
 *      properties:
 *        sourceId:
 *          type: string
 *
 */

/** @swagger
 * /sources:
 *  get:
 *    summary: Get all sources
 *    description: This can only be done by authenticated users
 *    tags: [Sources]
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
 * /sources/sources-news/:source
 *  get:
 *    summary: Get all news filtered by sources
 *    description: This can only be done by authenticated users
 *    tags: [Sources]
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
 * /sources/my-following:
 *  get:
 *    summary: Get all followed sources
 *    description: This can only be done by authenticated users
 *    tags: [Sources]
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
 * /sources/follow:
 *  post:
 *    summary: Follow a source
 *    description: This can only be done by authenticated users
 *    tags: [Sources]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           required:
 *           - sourceId
 *           properties:
 *              sourceId:
 *                type: string
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found or source not found
 *      500:
 *        description: Internal server error
 */

/** @swagger
 * /sources/unfollow:
 *  delete:
 *    summary: Unfollow a source
 *    description: This can only be done by authenticated users
 *    tags: [Sources]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           required:
 *           - sourceId
 *           properties:
 *              sourceId:
 *                type: string
 *    responses:
 *      202:
 *        description: Accepted
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found or source not found
 *      500:
 *        description: Internal server error
 */
routes.get("/", getSources);
routes.get("/sources-news/:source/", getSourcesNews);

routes.get("/my-following", getFollowing);
routes.post("/follow", follow);
routes.delete("/unfollow", unfollow);

module.exports = routes;
