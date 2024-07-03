const { Router } = require("express");
const { register, login, logout } = require("../../controllers/auth");
const passport = require("passport");
const registerValidate = require("../../validators/registerValidate");
const loginValidate = require("../../validators/loginValidation");
const { googleLogin } = require("../../middlewares/googleAuth");
const { authenticate } = require("../../middlewares/authentication");
const routes = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Register:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *        - full_name
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        full_name:
 *          type: string
 *    Login:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *        password:
 *          type: string
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Register a new user
 *    description: This is a local authentication route
 *    tags: [Register]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Register'
 *    responses:
 *      201:
 *        description: User has been registered
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Login a user
 *    description: This is a local authentication route
 *    tags: [Login]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: User has been logged
 *      400:
 *        description: Bad request or wrong credentials
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */
routes.post("/register", registerValidate, register);
routes.post("/login", loginValidate, login);

/**
 * @swagger
 * /auth/logout:
 *  get:
 *    summary: Logout a user
 *    description: This is a local authentication route
 *    tags: [Logout]
 *    responses:
 *      200:
 *        description: User has been logged out
 *      500:
 *        description: Internal server error
 */
routes.get("/logout", authenticate, logout);

// Discord Auth
/**
 * @swagger
 * /auth/discord:
 *  get:
 *    summary: Redirect to Discord login
 *    tags: [Login]
 *    responses:
 *      301:
 *        description: Redirected
 *      500:
 *        description: Internal server error
 */
routes.get(
  "/discord",
  passport.authenticate("discord", { session: false }),
  (req, res) => {
    res.status(301);
  }
);

/**
 * @swagger
 * /auth/discord/redirect:
 *  get:
 *    summary: Login a user via Discord
 *    tags: [Login]
 *    responses:
 *      200:
 *        description: User has been logged
 *      201:
 *        description: User has been registered
 *      400:
 *        description: Bad request or wrong credentials
 *      500:
 *        description: Internal server error
 */
routes.get(
  "/discord/redirect",
  passport.authenticate("discord", { session: false }),
  (req, res) => {
    if (req.authInfo.token && req.authInfo.userId) {
      req.session.token = req.authInfo.token;
      req.session.userId = req.authInfo.userId;
      res.cookie("jwt", req.authInfo.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res
        .status(200)
        .send(`User ${req.authInfo.userId} has logged through Discord`);
    } else {
      res.status(400).send("The user has failed to log with Discord");
    }
  }
);

// Google Auth
/**
 * @swagger
 * /auth/auth-google:
 *  post:
 *    summary: Google login
 *    tags: [Login]
 *    responses:
 *      200:
 *        description: User has been logged
 *      201:
 *        description: User has been registered
 *      500:
 *        description: Internal server error
 */

routes.post("/auth-google", googleLogin);

module.exports = routes;
