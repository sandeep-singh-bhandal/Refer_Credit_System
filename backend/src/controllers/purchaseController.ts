import { Request, Response } from "express";
import Purchase from "../models/Purchase";
import Referral from "../models/Referral";
import User from "../models/User";

interface PurchaseRequestBody {
  amount: number;
}

export const createPurchase = async (
  req: Request<{}, {}, PurchaseRequestBody>,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;
    const { amount } = req.body;

    if (!amount) {
      return res
        .status(400)
        .json({ success: false, message: "Amount is required" });
    }

    // Check if first purchase
    const existingPurchase = await Purchase.findOne({ userId });
    const isFirstPurchase = !existingPurchase;

    // Create purchase record
    const purchase = await Purchase.create({
      userId,
      amount,
      isFirstPurchase,
    });

    // Handle referral credits on first purchase
    if (isFirstPurchase) {
      const referral = await Referral.findOne({
        referredId: userId,
        status: "pending",
        creditAwarded: false,
      });

      if (referral) {
        // Update referral record
        referral.status = "converted";
        referral.creditAwarded = true;
        referral.convertedAt = new Date();
        await referral.save();

        // Update User credits
        await User.findByIdAndUpdate(referral.referrerId, {
          $inc: { credits: 2 },
        });
        await User.findByIdAndUpdate(userId, { $inc: { credits: 2 } });
      }
    }

    res.status(201).json({
      success: true,
      purchase,
      message: "Purchase completed",
    });
  } catch (error: any) {
    console.log("Purchase Error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};

export const getAllPurchase = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const purchases = await Purchase.find({
      userId,
    });
    
    res.status(201).json({
      success: true,
      purchases,
    });
  } catch (error: any) {
    console.log("Purchase Error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};
