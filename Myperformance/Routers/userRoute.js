import express from "express";
import { userRegController, userForgetPass, userLoginController, userManyUpdateControll } from "../Controllers/userController.js";

let userRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user collection
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           description: User's email address
 *         mobilenumber:
 *           type: string
 *           description: User's mobile number
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         id: GHKHHJKKLJKJ
 *         name: Arman
 *         email: Arman@gmail.com
 *         mobilenumber: "9960860125"
 *         password: Aman@123
 */

/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: Authentication operations
 */

/**
 * @swagger
 * /apiv1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */

userRoute.post("/register", userRegController); // Endpoint for user registration

/**
 * @swagger
 * /apiv1/auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Something went wrong
 */

userRoute.post("/login", userLoginController); // Endpoint for user login

/**
 * @swagger
 * /apiv1/auth/forget:
 *   post:
 *     summary: Reset user password
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Password reset successful
 *       500:
 *         description: Internal server error
 */

userRoute.post("/forget", userForgetPass); // Endpoint for user password reset

/**
 * @swagger
 * /apiv1/auth/manydata:
 *   post:
 *     summary: Batch update user data
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User data updated successfully
 *       500:
 *         description: Internal server error
 */

userRoute.post("/manydata", userManyUpdateControll); // Endpoint for batch user update

export default userRoute;
