import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import generateToken from "../config/generateToken";
import { createUniqueReferralCode } from "../config/uniqueCodeGenerator";
import { AuthRequest } from "../middlewares/authUser";
import Referral from "../models/Referral";

interface LoginRequestBody {
  email: string;
  password: string;
}
interface RegisterRequestBody extends LoginRequestBody {
  name: string;
  referralCode?: string;
}

// api/user/register - Register the new user
export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    // Checking if data missing
    if (!email || !password || !name)
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique referral code for new user
    const referralCode = await createUniqueReferralCode(); // Generate a referral code for the user
    // create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      referralCode,
    });

    // Generate token and set in cookies
    generateToken(user._id.toString(), res);

    // Check if referral code was used
    if (req.body.referralCode) {
      const referrer = await User.findOne({
        referralCode: req.body.referralCode,
      });
      if (!referrer) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid Referral Code" });
      }

      // Create referral record
      await Referral.create({
        referrerId: referrer._id,
        referredId: user._id,
        status: "pending",
        creditAwarded: false,
      });
    }

    // delete password
    const userObj = user.toObject() as any;
    delete userObj.password;

    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      user: userObj,
    });
  } catch (error: any) {
    console.log("Error", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};

// api/user/login - Login the  user
export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    // Checking if data missing
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // hash the password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password" });

    // Generate token and set in cookies
    generateToken(existingUser._id.toString(), res);

    // delete password
    const userObj = existingUser.toObject() as any;
    delete userObj.password;

    res
      .status(200)
      .json({ success: true, message: "Login Successfully", user: userObj });
  } catch (error: any) {
    console.log("Error", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};

// Logout User - /api/user/logout
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out Successfully" });
  } catch (err: any) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

export const checkAuth = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user!;
    if (!userId)
      return res.status(401).json({ succes: false, message: "Unauthorized" });

    const user = await User.findById(userId);
    // delete password
    const userObj = user!.toObject() as any;
    delete userObj.password;
    return res.status(201).json({ succes: false, user: userObj });
  } catch (err: any) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user!;

    // Fetch user info
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Fetch referral stats from Referral model with referred user details
    const referrals = await Referral.find({ referrerId: userId })
      .populate("referredId", "name email")
      .lean();

    const totalReferred = referrals.length;
    const totalConverted = referrals.filter(
      (r) => r.status === "converted"
    ).length;

    // Map referrals for frontend
    const referredUsers = referrals.map((r) => ({
      name: (r.referredId as any).name,
      email: (r.referredId as any).email,
      status: r.status,
    }));

    res.status(200).json({
      success: true,
      dashboard: {
        totalReferred,
        totalConverted,
        totalCredits: user.credits || 0,
        referralCode: user.referralCode,
        referredUsers,
      },
    });
  } catch (error: any) {
    console.log("Dashboard Error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
};
