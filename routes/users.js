import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = Router();

router.get("/checkauth", verifyToken, (req, res) => {
  res.status(200).send("Welcome to page");
});
router.get("/checkuser/:id", verifyUser, (req, res) => {
  res.status(200).send("Hello user!, Welcome and you are logged in!");
});
router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
  res.status(200).send("Hello admin!, Welcome and you are logged in!");
});

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", getUser);
router.get("/", getAllUsers);

export default router;
