import express from "express";
import {
  login,
  register,
  getAllUsers,
  logOut,
} from "../controllers/userController";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/logout/:id", logOut);

export default router;
