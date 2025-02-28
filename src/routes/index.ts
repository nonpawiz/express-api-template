import express from "express";
export const router = express.Router();
import userRoute from "./users";
import { authenticate } from "../middleware";

router.use("/users", authenticate, userRoute);
router.use("/test", (req, res) => {
  res.status(200).json("sssss");
});

export default router;
