import userController from "../controller/userController";
import { router as userRoute } from "../route";
import useRes from "../service/useRes";
import { AddUserType, EditUserType } from "../service/type";
// @GET
userRoute.get("/getUser", async (req, res, next) => {
  try {
    const users = await userController().getUser(req);
    useRes().okHandler(res, users);
  } catch (error) {
    useRes().errorHandler(res, error, "");
  }
});

// @POST
userRoute.post("/addUser", async (req, res, next) => {
  try {
    const { body } = req;
    const users = await userController().addUser(body as AddUserType);
    useRes().okHandler(res, users);
  } catch (error) {
    useRes().errorHandler(res, error, "");
  }
});

// @POST
userRoute.post("/editUser", async (req, res, next) => {
  try {
    const { body } = req;
    const users = await userController().editUser(body as EditUserType);
    useRes().okHandler(res, users);
  } catch (error) {
    useRes().errorHandler(res, error, "");
  }
});

export default userRoute;
