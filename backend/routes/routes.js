import express from "express";
import { login, logout, refresh } from "../controllers/auth.js";
import { createUser } from "../controllers/createUser.js";
import { refCode } from "../controllers/refCode.js";
import { verifyManager, verifyUserforRefCode } from "../middlewares/verify.js";
import { deleteUser } from "../controllers/deleteUser.js";

const router = express.Router();

//Authentication
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refresh);

//User
router.post("/create-user", createUser);

//Referral Code
router.post("/generate-ref-code", refCode);
router.get("/verify-user-for-refcode", verifyUserforRefCode, (req, res) => {
  res.status(200).json({ message: "Access granted!" });
});

//Manager
router.delete("/users/:userId", verifyManager, deleteUser);
router.get("/manager-route", verifyManager, (req, res) => {
  res.status(200).json({ message: "Access granted!" });
});

export default router;