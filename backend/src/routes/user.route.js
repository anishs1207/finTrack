import { Router } from "express";
import { loginUser, registerUser, logoutUser, refreshAccessToken, getUserSession } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

//all work & tested: 02/02/2025
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/session').get(verifyJWT, getUserSession)

export default router; 