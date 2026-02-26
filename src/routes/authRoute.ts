import { router as authRoute } from "../route";
import AuthController from "../controller/AuthController";
import useRes from "../service/useRes";
import { authenticate } from "../middleware";
import { Request, Response } from "express";
import useJwt from "../service/useJwt";

const auth = AuthController()
const jwt = useJwt()
// login
authRoute.post("/login", async (req: Request, res: Response, next) => {
  try {
    const { username, password } = req.body;
    const language = useRes().language(req);
    const data = await auth.login({
      username,
      password,
      language,
    });
    useRes().okHandler(res, data);
  } catch (error) {
    useRes().errorHandler(res, error, "");
  }
});

// me
authRoute.post("/me", async (req: Request, res: Response, next) => {
  try {
    const token: string = req.headers["authorization"] || "";
    const checked = await auth.me(token);
    res.status(200).json(
      checked == undefined
        ? {
          code: 401,
          message: `Unauthorized`,
        }
        : {
          code: 200,
          message: `Authorized`,
        }
    );
  } catch (error) {
    useRes().errorHandler(res, error, "");
  }
});

// refresh token
authRoute.post("/refreshToken", async (req: Request, res: Response, next) => {
  try {
    const refreshToken: string = req.headers["authorization"] || "";
    const checked = await auth.me(refreshToken);
    res.status(200).json(
      checked == undefined
        ? {
          code: 401,
          message: `Unauthorized`,
        }
        : {
          access_token: jwt.newAccessToken({ refresh: true }),
          refresh_token: jwt.newRefreshToken({ refresh: true }),
        }
    );
  } catch (error) {
    useRes().errorHandler(res, error, "");
  }
});

export default authRoute;
