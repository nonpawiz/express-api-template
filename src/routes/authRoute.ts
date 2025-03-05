import { router as authRoute } from "../route";
import authController from "../controller/authController";
import useRes from "../service/useRes";
import { authenticate } from "../middleware";

// login
authRoute.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const language: string = req.headers["accept-language"] || "en";
    const data = await authController().login({
      username,
      password,
      language,
    });
    useRes().okHandler(res, data);
  } catch (error) {
    useRes().errorHandler(res, error, "");
  }
});

// checkAuthorized
authRoute.post("/checkAuthorized", async (req, res, next) => {
  try {
    const token: string = req.headers["authorization"] || "";
    const checked = await authController().checkAuthorized(token, res);
    res.status(checked == undefined ? 401 : 200).json(
      checked == undefined
        ? {
            code: 401,
            message: `Unauthorized`,
          }
        : {
            code: 200,
            message: `Authorized`,
            info: checked,
          }
    );
  } catch (error) {
    useRes().errorHandler(res, error, "");
  }
});

export default authRoute;
