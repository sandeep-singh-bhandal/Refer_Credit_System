import { Router } from "express";
import {
  checkAuth,
  getDashboard,
  login,
  logout,
  register,
} from "../controllers/userController";
import { protectRoute } from "../middlewares/authUser";

const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/check-auth", protectRoute, checkAuth);
userRouter.get("/get-dashboard", protectRoute, getDashboard);

export default userRouter;
