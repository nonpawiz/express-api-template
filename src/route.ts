import express from "express";
export const router = express.Router();
import { authenticate, hasRole } from "./middleware";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";

router.use("/auth", authRoute);
router.use("/user", authenticate, hasRole([`admin`]), userRoute);

router.use("/test", (req, res) => {
  res.status(200).json({
    code: 200,
    msg: "system running!",
  });
});
export default router;
