const { Router } = require("express");
const {
  showSavedStories,
  saveStory,
  deleteStory,
} = require("../../controllers/savedArticles");
const client = require("../../databases/redis");
const User = require("../../databases/schemas/User");
const patchUserValidate = require("../../validators/patchUserValidator");

const routes = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        full_name:
 *          type: string
 *        subscribed:
 *          type: array
 *          items:
 *            type: string
 *        preferred_topics:
 *          type: array
 *          items:
 *            type: string
 */

/**
 * @swagger
 * /user/profile:
 *  get:
 *    summary: Get user profile
 *    description: This can only be done by authenticated users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: The user profile
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /user/profile:
 *  patch:
 *    summary: Update user profile
 *    description: This can only be done by authenticated users
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *              full_name:
 *                type: string
 *              preferred_topics:
 *                type: array
 *                items: string
 *    responses:
 *      200:
 *        description: Updated user's profile
 *      400:
 *        description: Bad request or invalid updates
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /user/delete-account:
 *  delete:
 *    summary: Delete user account
 *    description: This can only be done by authenticated users
 *    tags: [User]
 *    responses:
 *      202:
 *        description: User has been deleted
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /user/searches:
 *  get:
 *    summary: Get user searches
 *    description: This can only be done by authenticated users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: The user searches
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */
routes.get("/profile", (req, res) => {
  res.status(200).send(req.user);
});

routes.patch("/profile", patchUserValidate, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "full_name", "preferred_topics"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

routes.delete("/delete-account", async (req, res) => {
  await client.del(req.user._id.toString());
  await client.del(req.user._id.toString() + "_breaking_news");
  await User.findByIdAndDelete(req.user._id);
  req.user = null;
  res.status(202).send("User has been deleted");
});

routes.get("/searches", async (req, res) => {
  const searches = await client.hGet(req.user._id.toString(), "searches");
  res.status(200).send(searches);
});

// Saved Articles

/**
 * @swagger
 * /user/saved-articles:
 *  get:
 *    summary: Get saved articles
 *    description: This can only be done by authenticated users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: The saved articles
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /user/save-article:
 *  post:
 *    summary: Save an article
 *    description: This can only be done by authenticated users
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              storyId:
 *                type: string
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Story not found or user not found
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /user/delete-article:
 *  delete:
 *    summary: Delete an article
 *    description: This can only be done by authenticated users
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              storyId:
 *                type: string
 *    responses:
 *      202:
 *        description: Accepted
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Story not found or user not found
 *      500:
 *        description: Internal server error
 */
routes.get("/saved-articles", showSavedStories);
routes.post("/save-article", saveStory);
routes.delete("/delete-article", deleteStory);

module.exports = routes;
