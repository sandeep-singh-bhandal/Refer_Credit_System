import { Router } from "express";
import { createPurchase, getAllPurchase } from "../controllers/purchaseController";
import { protectRoute } from "../middlewares/authUser";

const purchaseRouter = Router();

purchaseRouter.post("/buy",protectRoute, createPurchase);
purchaseRouter.get("/get-all-purchases",protectRoute, getAllPurchase);

export default purchaseRouter;
