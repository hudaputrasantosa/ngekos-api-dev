import express from "express";
import {
  countByCity,
  countByType,
  createKos,
  deleteKos,
  getAllKos,
  getKos,
  updateKos,
} from "../controllers/kos.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/", verifyAdmin, createKos);
router.put("/:id", verifyAdmin, updateKos);
router.delete("/:id", verifyAdmin, deleteKos);
router.get("/find/:id", getKos);
router.get("/", getAllKos);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
