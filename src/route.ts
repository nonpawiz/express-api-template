import express from "express";
export const router = express.Router();
import { authenticate, hasRole } from "./middleware";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";

router.use("/auth", authRoute);
router.use("/user", authenticate, hasRole(["me", "Admin"]), userRoute);

router.use("/test", (req, res) => {
  res.status(200).json({ msg: "xxx" });
});
export default router;
